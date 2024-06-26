import prisma from "@/db";
import { z } from "zod";
import { fromError, isZodErrorLike } from "zod-validation-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = loginPayloadSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!existingUser) {
      return Response.json(
        { message: "Email or password are incorrect." },
        { status: 400 },
      );
    }

    if (!(await bcrypt.compare(payload.password, existingUser.password))) {
      return Response.json(
        { message: "Email or password are incorrect." },
        { status: 400 },
      );
    }

    const token = jwt.sign(
      { name: existingUser.name, email: existingUser.email },
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10m" },
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" },
    );

    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    });

    return Response.json({ token });
  } catch (error) {
    if (isZodErrorLike(error)) {
      return Response.json(fromError(error).toString(), { status: 400 });
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
