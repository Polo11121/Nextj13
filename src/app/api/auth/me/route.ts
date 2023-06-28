import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value as string;

  const { email } = jwt.decode(token) as {
    email: string;
  };

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    },
    {
      status: 200,
    }
  );
};
