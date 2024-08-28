import prisma from "@/db";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

const addRatingPayloadSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  productId: z.string().min(1),
});

// add rating for a product that user has ordered
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser(req);

  console.log(user.id);

  try {
    const { productId, rating, comment } =
      await addRatingPayloadSchema.parseAsync(await req.json());

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json(
        { message: "Cannot add a rating for a non-existing product" },
        { status: 400 },
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        User: { id: user.id },
        products: {
          some: {
            id: product.id,
          },
        },
        status: {
          equals: "COMPLETED",
        },
      },
    });

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        User: { id: user.id },
        product: { id: product.id },
      },
    });

    if (existingRating) {
      return Response.json(
        { message: "You have already rated this product" },
        { status: 400 },
      );
    }

    await prisma.rating.create({
      data: {
        User: { connect: { id: user.id } },
        product: { connect: { id: product.id } },
        rating,
        comment: comment ?? "",
      },
    });

    return Response.json({ message: "Rating added successfully" });
  } catch (e) {
    console.log(e);
    if (isZodErrorLike(e)) {
      return Response.json(
        { message: fromZodError(e).toString() },
        { status: 400 },
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// get all ratings for a product
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "Missing product id" }, { status: 400 });
  }

  const productExists = await prisma.product.findUnique({ where: { id } });

  if (!productExists) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  const ratings = await prisma.rating.findMany({
    where: {
      product: {
        id,
      },
    },
  });

  return Response.json(ratings);
}
