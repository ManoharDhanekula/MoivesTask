import { Mobile } from "../model/mobile.model.js";
import { review } from "../model/review.model.js";

async function postingData(user_id, mobile_id, title_Of, rating, comments) {
  return await review.create({
    user_id,
    mobile_id,
    title_Of,
    rating,
    comments,
  });
}

async function averageOfRating(mobile_id) {
  const sumOF = await review.sum("rating", { where: { mobile_id: mobile_id } });
  const countOF = await review.count({
    where: { mobile_id: mobile_id },
  });

  return sumOF / countOF;
}

async function updateMobileRatings(mobile_id) {
  try {
    const results = await Mobile.update(
      { rating: await averageOfRating(mobile_id) },
      {
        where: {
          id: mobile_id,
        },
      }
    );
    console.log(averageOfRating(mobile_id));
    console.log("Updated mobile ratings:", results);
  } catch (error) {
    console.error("Error updating mobile ratings:", error);
  }
}

export default { postingData, updateMobileRatings };
