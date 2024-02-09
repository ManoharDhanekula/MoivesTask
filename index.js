import express from "express";
import { sequelize } from "./config.js";
import moviesRoute from "./routes/movies.routes.js";

// import { Movies } from "./movies.js";
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Hello, world");
});

app.use("/movies", moviesRoute);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
