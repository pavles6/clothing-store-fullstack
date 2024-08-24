import prisma from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const skip = req.nextUrl.searchParams.get("skip");
  const take = req.nextUrl.searchParams.get("take");

  if (!skip || !take)
    return Response.json(
      { message: "Missing skip or take params" },
      { status: 400 },
    );
  return Response.json(
    await prisma.product.findMany({
      skip: Number(skip),
      take: Number(take),
    }),
  );
}
