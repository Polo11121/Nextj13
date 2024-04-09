import * as jose from "jose";

import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized request",
      },
      {
        status: 401,
      }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let payload;
  try {
    payload = (await jose.jwtVerify(token, secret)).payload;
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unauthorized request",
      },
      {
        status: 401,
      }
    );
  }

  const { email } = payload as {
    email: string;
  };

  if (!email) {
    return NextResponse.json(
      {
        error: "Unauthorized request",
      },
      {
        status: 401,
      }
    );
  }
};

export const config = {
  matcher: ["/api/auth/me", "/api/auth/logout"],
};
