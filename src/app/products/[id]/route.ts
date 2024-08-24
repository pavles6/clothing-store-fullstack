import prisma from "@/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  if (!id) {
    return new Response("Missing product id", { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(product, { status: 200 });
}
