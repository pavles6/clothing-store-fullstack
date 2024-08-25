import * as z from "zod"
import * as imports from "../null"
import { CompleteProduct, RelatedProductModel, CompleteOrder, RelatedOrderModel, CompleteUser, RelatedUserModel } from "./index"

export const OrderOnProductModel = z.object({
  productId: z.string(),
  orderId: z.string(),
  orderedBy: z.string(),
})

export interface CompleteOrderOnProduct extends z.infer<typeof OrderOnProductModel> {
  product: CompleteProduct
  order: CompleteOrder
  user: CompleteUser
}

/**
 * RelatedOrderOnProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderOnProductModel: z.ZodSchema<CompleteOrderOnProduct> = z.lazy(() => OrderOnProductModel.extend({
  product: RelatedProductModel,
  order: RelatedOrderModel,
  user: RelatedUserModel,
}))
