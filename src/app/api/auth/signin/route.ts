import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  const errorMessage = "Email or password is invalid";

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      message: errorMessage,
    },

    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      message: errorMessage,
    },
  ];

  const errors = validationSchema.filter((item) => !item.valid);

  if (errors.length > 0) {
    return NextResponse.json(
      {
        error: errors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 401,
      }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 401,
      }
    );
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({
    id: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  const response = NextResponse.json(
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

  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    maxAge: 60 * 6 * 24,
  });

  return response;
};
