import express from "express";
import { sequelize } from "./config.js";
import moviesRoute from "./routes/movies.routes.js";
import mobileRoute from "./routes/mobile.routes.js";
import { Mobile } from "./model/mobile.model.js";
// import { Movies } from "./movies.js";
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// const mobile1 = await Mobile.create({
//   brand: "Samsung",
//   title: "Samsung Galaxy S4",
//   url: "https://www.amazon.com/dp/B0CMDMKQB7?ref_=cm_sw_r_cp_ud_dp_TYW4FD3CAE03JWA4F0ZG&th=1",
//   rating: 3.7,
//   image:
//     "https://www.91-cdn.com/hub/wp-content/uploads/2023/12/Samsung-Galaxy-S24-Ultra.png",
//   os: "Android v14",
//   ram: 12,
//   price: 129999,
// });
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Hello, world");
});

app.use("/movies", moviesRoute);
app.use("/mobile", mobileRoute);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
