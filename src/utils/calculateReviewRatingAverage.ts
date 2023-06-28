import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) =>
  reviews?.length
    ? parseFloat(
        (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      )
    : 0;
