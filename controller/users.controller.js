import { users } from "../model/users.model.js";
import usersService from "../service/users.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { session } from "../model/session.model.js";

cloudinary.config({
  secure: true,
});

async function postDataByID(request, response) {
  console.log(request.body);

  const { username, password } = request.body;
  if (password.length < 8) {
    response.status(404).send("Password must be in gearter than 8");
  } else {
    const userDataPost = usersService.postingData(username, password);
    const not_Found = { msg: "Not Inserted" };
    userDataPost
      ? response.send(await userDataPost)
      : response.status(404).send(not_Found);
  }
}

async function getUserData(request, response) {
  const userData = usersService.displayingData();
  response.send(await userData);
}

async function deleteUserDataByID(request, response) {
  const { id } = request.params;
  const userDataDelete = usersService.distoryMovieDataByID(id);
  console.log(userDataDelete);
  const not_Found = { msg: "Not found" };
  userDataDelete
    ? response.send("Deleted")
    : response.status(404).send(not_Found);
}

async function loginUserData(request, response) {
  const { username, password } = request.body;
  const dbCheck = await usersService.getUserbyname(username);

  if (!dbCheck) {
    response.status(401).send({ msg: "Invalid credentials" });
  } else {
    const storedPassword = dbCheck.password;
    const isPasswordChecked = await bcrypt.compare(password, storedPassword);
    if (isPasswordChecked) {
      const token = Jwt.sign({ id: dbCheck.id }, process.env.SECRET_KEY);
      const user1 = await session.create({
        user_id: dbCheck.id,
        token: token,
        expiry: "n",
      });
      response.send({ msg: "Successfull Login", token: token });
    } else {
      response.status(401).send({ msg: "Invalid credentials" });
    }
  }
}

async function userAvatar(request, response) {
  console.log(request.file);
  const imagePath = request.file.path;
  const tokenId = request.header("x-auth-token");
  const publicId = await usersService.uploadImage(imagePath);
  const userAvatarUpadte = usersService.userAvatar(
    tokenId,
    publicId.secure_url
  );
  response.send({
    msg: "Upload",
    url: publicId.secure_url,
  });
}

async function expiryLogout(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const userAvatarUpadte = usersService.getuserDataById(id, tokenId);

  response.send("LogOut SucessFully");
}

export default {
  postDataByID,
  getUserData,
  deleteUserDataByID,
  loginUserData,
  userAvatar,
  expiryLogout,
};
