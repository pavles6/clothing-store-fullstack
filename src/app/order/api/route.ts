import prisma from "@/db";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
import { z } from "zod";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

const orderPayloadSchema = z.object({
  products: z.array(z.string().min(1)).min(1), // array of product ids
});

// Make an order
export async function POST(req: Request) {
  try {
    const { products: productIds } = await orderPayloadSchema.parseAsync(
      await req.json(),
    );

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return Response.json({ message: "Invalid product ids" }, { status: 400 });
    }

    const user = await getAuthenticatedUser(req);

    const order = await prisma.order.create({
      data: {
        User: { connect: { id: user.id } },
        status: "PENDING",
        products: {
          connect: products,
        },
      },
    });

    return Response.json(
      { message: "Order created successfully", order },
      { status: 201 },
    );
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

// Get all orders
export async function GET(req: Request) {
  const fetchedOrders = await prisma.order.findMany({
    select: {
      id: true,
      status: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      products: true,
    },
  });

  return Response.json({
    orders: fetchedOrders,
  });
}
