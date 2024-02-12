import express from "express";
import { sequelize } from "./config.js";

import moviesRoute from "./routes/movies.routes.js";

import mobileRoute from "./routes/mobile.routes.js";

import usersRoute from "./routes/users.router.js";
import { users } from "./model/users.model.js";

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// const user1 = await users.create({
//   username: "manohar",
//   password: "password@123",
// });
const app = express();
app.use(express.json()); // mibble-ware

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Hello, world");
});

app.use("/movies", moviesRoute);
app.use("/mobile", mobileRoute);
app.use("/users", usersRoute);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
