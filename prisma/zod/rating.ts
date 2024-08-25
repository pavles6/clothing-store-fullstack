import * as z from "zod"
import * as imports from "../null"
import { CompleteProduct, RelatedProductModel, CompleteUser, RelatedUserModel } from "./index"

export const RatingModel = z.object({
  id: z.string(),
  productId: z.string(),
  rating: z.number().int(),
  comment: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
})

export interface CompleteRating extends z.infer<typeof RatingModel> {
  product: CompleteProduct
  User?: CompleteUser | null
}

/**
 * RelatedRatingModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRatingModel: z.ZodSchema<CompleteRating> = z.lazy(() => RatingModel.extend({
  product: RelatedProductModel,
  User: RelatedUserModel.nullish(),
}))
