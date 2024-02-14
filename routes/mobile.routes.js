import express from "express";
import mobileController from "../controller/mobile.controller.js";
import { auth } from "../middleware/author.js";

const route = express.Router();

route
  .route("/")
  // .get(mobileController.getAllMobileData)
  .post(auth, mobileController.postDataByID)
  .get(auth, mobileController.paginationForMobilesData);
route.route("/sortBy").get(auth, mobileController.sortByItems);
route.route("/price").get(auth, mobileController.priceByItems);
route.route("/search").get(auth, mobileController.ramByItems);
route
  .route("/:id")
  .get(auth, mobileController.getMobileDataByID)
  .put(auth, mobileController.putMobileDataByID)
  .delete(auth, mobileController.deleteMobileDataByID);

export default route;
