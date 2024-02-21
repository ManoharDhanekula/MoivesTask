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
  const passwordStrength = await usersService.isStrongPassword(password);
  if (passwordStrength) {
    const userDataPost = await usersService.postingData(username, password);
    const not_Found = { msg: "Not Inserted" };
    userDataPost
      ? response.send(userDataPost)
      : response.status(404).send(not_Found);
  } else {
    response.status(404).send("Password Requirement Not Reach");
  }
}

async function getUserData(request, response) {
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (
    findingUserRoleID.dataValues.role_id == 3 ||
    findingUserRoleID.dataValues.role_id == 1
  ) {
    try {
      const userData = usersService.displayingData();
      response.send(await userData);
    } catch (err) {
      response.send({ msg: err });
    }
  } else {
    response.send("NoT Authorization");
  }
}

async function deleteUserDataByID(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (findingUserRoleID.dataValues.role_id == 3) {
    try {
      const userDataDelete = await usersService.distoryMovieDataByID(id);
      console.log(userDataDelete);
      const not_Found = { msg: "Not found" };
      userDataDelete
        ? response.send("Deleted")
        : response.status(404).send(not_Found);
    } catch (err) {
      response.send({ msg: err });
    }
  }
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
  const userId = await usersService.sessionCheckToken(tokenId);
  const userAvatarUpdate = await usersService.userAvatarUpdate(
    userId.dataValues.user_id,
    publicId.secure_url
  );
  response.send({
    msg: "Upload",
    url: publicId.secure_url,
  });
}

async function updateAdmin(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (findingUserRoleID.dataValues.role_id == 3) {
    try {
      const userAdmin = usersService.userAdminUpdate(id);
      response.send({ msg: "Updated" });
    } catch (err) {
      response.send({ msg: err });
    }
  } else {
    response.send("NoT Authorization");
  }
}

async function expiryLogout(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const userAvatarUpdate = usersService.getuserDataById(id, tokenId);

  response.send("LogOut SucessFully");
}

export default {
  postDataByID,
  getUserData,
  deleteUserDataByID,
  loginUserData,
  userAvatar,
  updateAdmin,
  expiryLogout,
};
