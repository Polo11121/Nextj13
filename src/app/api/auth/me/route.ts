import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value as string;
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const { payload } = await jwtVerify(token, secretKey);

  const { email } = payload as { email: string };

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
