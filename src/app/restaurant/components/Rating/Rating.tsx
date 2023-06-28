import { calculateReviewRatingAverage } from "utils";
import { Review } from "@prisma/client";
import { Stars } from "components";

export const Rating = ({ reviews }: { reviews: Review[] }) => (
  <div className="flex items-end">
    <div className="ratings mt-2 flex items-center">
      <Stars reviews={reviews} />
      <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews)}</p>
    </div>
    <div>
      <p className="text-reg ml-4">
        {reviews.length} review{reviews.length === 1 ? "" : "s"}
      </p>
    </div>
  </div>
);
