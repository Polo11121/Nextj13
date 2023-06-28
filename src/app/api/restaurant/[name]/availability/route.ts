import { NextResponse } from "next/server";
import { times } from "data";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "app/services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

export const GET = async (
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

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: name,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      {
        error: "Invalid data provided",
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

  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return NextResponse.json(availabilities, {
    status: 200,
  });
};
