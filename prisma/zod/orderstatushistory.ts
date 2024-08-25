import * as z from "zod"
import * as imports from "../null"
import { CompleteOrder, RelatedOrderModel, CompleteUser, RelatedUserModel } from "./index"

export const OrderStatusHistoryModel = z.object({
  id: z.string(),
  orderId: z.string(),
  changedBy: z.string(),
  changedFrom: z.string(),
  changedTo: z.string(),
})

export interface CompleteOrderStatusHistory extends z.infer<typeof OrderStatusHistoryModel> {
  order: CompleteOrder
  User: CompleteUser
}

/**
 * RelatedOrderStatusHistoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderStatusHistoryModel: z.ZodSchema<CompleteOrderStatusHistory> = z.lazy(() => OrderStatusHistoryModel.extend({
  order: RelatedOrderModel,
  User: RelatedUserModel,
}))
