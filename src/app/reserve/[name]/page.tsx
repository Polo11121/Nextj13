import { PrismaClient } from "@prisma/client";
import { Form, Header } from "@/reserverPage/components";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();
const fetchRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      main_image: true,
      name: true,
      images: true,
      description: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const ReservationPage = async ({
  params,
  searchParams,
}: {
  params: {
    name: string;
  };
  searchParams: {
    date: string;
    partySize: string;
  };
}) => {
  const { name: slug } = params;
  const { date, partySize } = searchParams;

  const { main_image, name } = await fetchRestaurant(slug);

  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header
            image={main_image}
            name={name}
            date={date}
            partySize={parseInt(partySize)}
          />
          <Form name={slug} date={date} partySize={parseInt(partySize)} />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
