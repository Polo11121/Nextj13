import { NextResponse } from "next/server";
import { times } from "data";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "app/services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

export const POST = async (
  request: Request,
  {
    params,
  }: {
    params: {
      name: string;
    };
  }
) => {
  const { searchParams } = new URL(request.url);
  const { name } = params;
  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerRequest,
    bookerOccasion,
  } = await request.json();
  const day = searchParams.get("day");
  const time = searchParams.get("time");
  const partySize = searchParams.get("partySize");

  if (!day || !time || !partySize) {
    return NextResponse.json(
      {
        error: "Missing required parameters",
      },
      {
        status: 400,
      }
    );
  }
  console.log(name, params);
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: name,
    },
    select: {
      close_time: true,
      tables: true,
      open_time: true,
      id: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      {
        error: "Restaurant not found",
      },
      {
        status: 400,
      }
    );
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      {
        error: "Restaurant is closed at this time",
      },
      {
        status: 400,
      }
    );
  }

  const searchTimesWithTables = await findAvailableTables({
    restaurant,
    day,
    time,
  });

  if (!Array.isArray(searchTimesWithTables)) {
    return NextResponse.json(
      {
        error: "Invalid data provided",
      },
      {
        status: 400,
      }
    );
  }

  const searchTimeWithTables = searchTimesWithTables.find(
    ({ date }) =>
      date.toISOString() === new Date(`${day}T${time}`).toISOString()
  );

  if (!searchTimeWithTables) {
    return NextResponse.json(
      {
        error: "No availability found, cannot book",
      },
      {
        status: 400,
      }
    );
  }

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id);
    } else {
      tablesCount[4].push(table.id);
    }
  });

  const tablesToBooks: number[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_occasion: bookerOccasion,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id,
    },
  });

  const bookingsOnTablesData = tablesToBooks.map((table_id) => {
    return {
      table_id,
      booking_id: booking.id,
    };
  });

  await prisma.bookingsOnTables.createMany({
    data: bookingsOnTablesData,
  });

  return NextResponse.json(
    {
      booking,
    },
    {
      status: 200,
    }
  );
};
