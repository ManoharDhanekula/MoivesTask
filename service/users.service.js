import { users } from "../model/users.model.js";
import bcrypt from "bcrypt";

async function displayingData() {
  return await users.findAll();
}

async function postingData(username, password) {
  const no_of_round = 10;
  const salt = await bcrypt.genSalt(no_of_round);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    return await users.create({
      username,
      password: hashPassword,
    });
  } catch (error) {
    return { msg: error.errors.map((x) => x.message).join() };
  }
}

async function getUserbyname(username) {
  return await users.findOne({
    where: {
      username: username,
    },
  });
}
async function distoryMovieDataByID(id) {
  return await users.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  displayingData,
  postingData,
  distoryMovieDataByID,
  getUserbyname,
};
