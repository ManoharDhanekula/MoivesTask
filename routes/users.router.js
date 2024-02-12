import express from "express";
import usersController from "../controller/users.controller.js";
import { auth } from "../middleware/author.js";

const route = express.Router();

route.route("/").get(auth, usersController.getUserData);
route.route("/signUp").post(usersController.postDataByID);

route.route("/:id").delete(usersController.deleteUserDataByID);
route.route("/signIn").post(usersController.loginUserData);

export default route;
