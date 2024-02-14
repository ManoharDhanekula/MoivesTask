import express from "express";
import { sequelize } from "./config.js";
import cors from "cors";
import morgan from "morgan";

import moviesRoute from "./routes/movies.routes.js";

import mobileRoute from "./routes/mobile.routes.js";

import usersRoute from "./routes/users.router.js";
import { users } from "./model/users.model.js";
import { role } from "./model/role.model.js";
import { session } from "./model/session.model.js";
import { seedData } from "./written.js";

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");

  // await seedData();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// const join = await users.findAll({
//   include: [
//     {
//       model: session,
//       required: true,
//       right: true, // has no effect, will create an inner join
//     },
//   ],
// });

// console.log(join);

const app = express();
app.use(express.json()); // mibble-ware
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Hello, world");
});

app.use("/movies", moviesRoute);
app.use("/mobile", mobileRoute);
app.use("/users", usersRoute);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
