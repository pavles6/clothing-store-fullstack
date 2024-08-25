import * as z from "zod"
import * as imports from "../null"
import { CompleteRating, RelatedRatingModel, CompleteOrder, RelatedOrderModel, CompleteOrderStatusHistory, RelatedOrderStatusHistoryModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Ratings: CompleteRating[]
  Order: CompleteOrder[]
  OrderStatusHistory: CompleteOrderStatusHistory[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Ratings: RelatedRatingModel.array(),
  Order: RelatedOrderModel.array(),
  OrderStatusHistory: RelatedOrderStatusHistoryModel.array(),
}))
