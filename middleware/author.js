import Jwt from "jsonwebtoken";
import { session } from "../model/session.model.js";

const auth = async (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    Jwt.verify(token, process.env.SECRET_KEY);
    const checkToken = await session.findOne({
      where: {
        token: token,
        expiry: false,
      },
    });
    if (checkToken) {
      next();
    } else {
      response.status(401).send({ msg: "Expired Login" });
    }
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};

export { auth };
