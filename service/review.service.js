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

async function sumOF(mobile_id) {
  return await review.sum("rating", { where: { mobile_id: mobile_id } });
}

async function countOF(mobile_id) {
  return await review.count({
    where: { mobile_id: mobile_id },
  });
}

async function averageOF(mobile_id) {
  console.log(await sumOF(mobile_id), await countOF(mobile_id));
  return (await sumOF(mobile_id)) / (await countOF(mobile_id));
}

async function updateMobileRatings(mobile_id) {
  try {
    const average = await averageOF(mobile_id);
    console.log(average);
    const results = await Mobile.update(
      { rating: average },
      {
        where: {
          id: mobile_id,
        },
      }
    );
    // console.log(await averageOF(mobile_id));
    console.log("Updated mobile ratings:", results);
  } catch (error) {
    console.error("Error updating mobile ratings:", error);
  }
}

export default { postingData, updateMobileRatings };
