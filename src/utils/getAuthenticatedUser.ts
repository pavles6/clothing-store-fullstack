import prisma from "@/db";
import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

// should be called only on protected routes and where it is expect to have authenticated user
export async function getAuthenticatedUser(req: Request): Promise<User> {
  try {
    const headers = new Headers(req.headers);

    const token = headers.get("Authorization")!.split(" ")[1]; // Bearer <token>

    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      throw new Error("This should really not happen");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new Error("This should really not happen as well");
    }

    return user;
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong");
  }
}
