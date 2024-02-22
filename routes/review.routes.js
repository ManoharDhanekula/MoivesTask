import express from "express";
import { auth } from "../middleware/author.js";
import reviewController from "../controller/review.controller.js";

const route = express.Router();

route.route("/").post(auth, reviewController.postDataByID);

export default route;
