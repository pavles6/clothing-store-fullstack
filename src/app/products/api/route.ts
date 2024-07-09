import prisma from "@/db";

export async function GET() {
  return Response.json(await prisma.product.findMany());
}
