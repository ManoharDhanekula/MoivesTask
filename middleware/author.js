import Jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    Jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};

export { auth };
