import { ReviewCard } from "@/restaurantPage/components";
import { Review } from "@prisma/client";

export const Reviews = ({ reviews }: { reviews: Review[] }) => (
  <div>
    <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
      What {reviews.length}
      {reviews.length === 1 ? " person is " : " people are "}
      saying
    </h1>
    <div>
      <div className="border-b pb-7 mb-7 flex flex-col gap-4">
        {reviews.length ? (
          reviews.map(({ id, first_name, last_name, rating, text }) => (
            <ReviewCard
              key={id}
              name={`${first_name} ${last_name}`}
              rating={rating}
              text={text}
            />
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  </div>
);
