import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

export const POST = async (request: Request) => {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      message: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      message: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      message: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      message: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
      }),
      message: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      message: "Password is not strong enough",
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

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    return NextResponse.json(
      {
        error: "Email is associated with another account",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      city,
      password: hashedPassword,
    },
  });

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
      status: 201,
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
