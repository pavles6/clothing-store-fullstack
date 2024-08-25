import prisma from "@/db";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "@/utils/constants";

const registerPayloadSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = registerPayloadSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      return Response.json(
        { message: "User with a same email address already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role, id: user.id },
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    );

    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
    });

    return Response.json({ token });
  } catch (error) {
    console.log(fromError(error));

    return Response.json(
      { message: fromError(error).toString() },
      { status: 400 },
    );
  }
}
