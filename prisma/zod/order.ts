import * as z from "zod"
import * as imports from "../null"
import { CompleteProduct, RelatedProductModel, CompleteUser, RelatedUserModel, CompleteOrderStatusHistory, RelatedOrderStatusHistoryModel } from "./index"

export const OrderModel = z.object({
  id: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  orderedBy: z.string(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  products: CompleteProduct[]
  User: CompleteUser
  OrderStatusHistory: CompleteOrderStatusHistory[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  products: RelatedProductModel.array(),
  User: RelatedUserModel,
  OrderStatusHistory: RelatedOrderStatusHistoryModel.array(),
}))
