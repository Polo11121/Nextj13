import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json(
    {},
    {
      status: 200,
    }
  );

  response.cookies.set({
    name: "jwt",
    value: "",
    httpOnly: true,
    maxAge: 60 * 6 * 24,
  });

  return response;
};
