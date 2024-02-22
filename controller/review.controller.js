import { Op } from "sequelize";
// import usersService from "../service/users.service";
import reviewService from "../service/review.service.js";

async function postDataByID(request, response) {
  console.log(request.body);
  try {
    const { user_id, mobile_id, title_Of, rating, comments } = request.body;
    const mobileDataPost = reviewService.postingData(
      user_id,
      mobile_id,
      title_Of,
      rating,
      comments
    );
    reviewService.updateMobileRatings(mobile_id);
    const not_Found = { msg: "Not Inserted" };
    mobileDataPost
      ? response.send(await mobileDataPost)
      : response.status(404).send(not_Found);
  } catch (err) {
    response.send({ msg: err });
  }
}

export default { postDataByID };
