import { users } from "../model/users.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { session } from "../model/session.model.js";

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

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

async function userAvatarUpadte(user_id, url) {
  return await users.update(
    { avatar: url },
    {
      where: {
        id: user_id,
      },
    }
  );
}

async function sessionCheckToken(token) {
  return await session.findOne({
    where: {
      token: token,
      expiry: false,
    },
  });
}

async function getuserDataById(id, token) {
  const checkId = await users.findOne({
    where: {
      id: id,
    },
  });
  const checkToken = await session.update(
    { expiry: true },
    {
      where: {
        token: token,
        user_id: checkId.dataValues.id,
      },
    }
  );
}

export default {
  displayingData,
  postingData,
  distoryMovieDataByID,
  getUserbyname,
  uploadImage,
  sessionCheckToken,
  userAvatarUpadte,
  getuserDataById,
};