import express from "express";
import mobileController from "../controller/mobile.controller.js";

const route = express.Router();

route
  .route("/")
  // .get(mobileController.getAllMobileData)
  // .post(mobileController.postDataByID)
  .get(mobileController.paginationForMobilesData);

route
  .route("/:id")
  .get(mobileController.getMobileDataByID)
  .put(mobileController.putMobileDataByID)
  .delete(mobileController.deleteMobileDataByID);

export default route;
