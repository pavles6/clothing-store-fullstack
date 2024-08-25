import prisma from "@/db";
import { orderStatuses } from "@/utils/constants";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
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

export async function GET(req: Request) {
  return Response.json(
    await prisma.orderStatusHistory.findMany({
      select: {
        changedFrom: true,
        changedTo: true,
        order: {
          select: {
            _count: {
              select: {
                products: true,
              },
            },
          },
        },
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  );
}
