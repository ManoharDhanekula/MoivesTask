import express from "express";
import usersController from "../controller/users.controller.js";
import { auth } from "../middleware/author.js";
import multer from "multer";
import path from "path";
import usersService from "../service/users.service.js";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.random(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const route = express.Router();

route.route("/").get(auth, usersController.getUserData);
route.route("/signUp").post(usersController.postDataByID);

route.route("/:id").delete(auth, usersController.deleteUserDataByID);
route.route("/signIn").post(usersController.loginUserData);

route
  .route("/pic")
  .post(auth, upload.single("avatar"), usersController.userAvatar);

route.route("/UpdateAdmin/:id").post(auth, usersController.updateAdmin);
route.route("/logOut/:id").post(usersController.expiryLogout);

export default route;
