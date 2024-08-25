import prisma from "@/db";
import { orderStatuses } from "@/utils/constants";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fromZodError, isZodErrorLike } from "zod-validation-error";

const orderStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(orderStatuses),
});

// Change order status
export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await orderStatusSchema.parseAsync(
      await req.json(),
    );

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status === status) {
      return Response.json(
        { message: "Status is already " + status },
        { status: 400 },
      );
    }

    const user = await getAuthenticatedUser(req);

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        OrderStatusHistory: {
          create: {
            User: { connect: { id: user.id } },
            changedFrom: order.status,
            changedTo: status,
          },
        },
      },
    });

    return Response.json({
      message: `Status changed successfully from ${order.status} to ${status} for order ${orderId}`,
    });
  } catch (e) {
    if (isZodErrorLike(e)) {
      return Response.json(
        { message: fromZodError(e).toString() },
        { status: 400 },
      );
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "Missing order id" }, { status: 400 });
  }

  const orderHistory = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      OrderStatusHistory: {
        select: {
          changedFrom: true,
          changedTo: true,
          createdAt: true,
          updatedAt: true,
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!orderHistory)
    return Response.json(
      { message: "No order history found" },
      { status: 404 },
    );

  return Response.json(orderHistory);
}
