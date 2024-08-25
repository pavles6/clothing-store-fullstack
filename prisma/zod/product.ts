import * as z from "zod"
import * as imports from "../null"
import { CompleteOrder, RelatedOrderModel, CompleteRating, RelatedRatingModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  size: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  orders: CompleteOrder[]
  Ratings: CompleteRating[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  orders: RelatedOrderModel.array(),
  Ratings: RelatedRatingModel.array(),
}))
