import { refreshTokenName } from "@/utils/constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = cookies().get(refreshTokenName);

  if (!refreshToken) {
    return Response.json(
      { message: "No refresh token provided" },
      { status: 400 },
    );
  }

  try {
    const decoded = jwt.verify(
      refreshToken.value,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      return Response.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }

    const token = jwt.sign(
      {
        id: decoded.id,
        name: decoded.name as string,
        email: decoded.email,
        role: decoded.role,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    );

    return Response.json({ token });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
}
