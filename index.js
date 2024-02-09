import express from "express";
import { sequelize } from "./config.js";
import { Movies } from "./movies.js";

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
// const movies1 = await Movies.create({
//   name: "Ratatouille",
//   poster:
//     "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//   rating: 8,
//   summary:
//     "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//   trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
// });

const PORT = 4000;
app.get("/movies", async function (request, response) {
  const movieData = await Movies.findAll();
  response.send(movieData);
});

app.get("/movies/:id", async function (request, response) {
  const not_Found = { msg: "Movie Not Found" };
  const { id } = request.params;

  const movieData = await Movies.findOne({
    where: {
      id: id,
    },
  });
  movieData ? response.send(movieData) : response.status(404).send(not_Found);
});

app.post("/movies", async function (request, response) {
  console.log(request.body);

  const { name, poster, rating, summary, trailer } = request.body;
  const moviesDataPost = await Movies.create({
    name,
    poster,
    rating,
    summary,
    trailer,
  });
  const not_Found = { msg: "Not Inserted" };
  moviesDataPost
    ? response.send(moviesDataPost)
    : response.status(404).send(not_Found);
});

app.put("/movies/:id", async function (request, response) {
  console.log(request.body);
  const { id } = request.params;

  const { name, poster, rating, summary, trailer } = request.body;
  const moviesDataUpdate = await Movies.update(
    { name, poster, rating, summary, trailer },
    {
      where: {
        id: id,
      },
    }
  );
  const not_Found = { msg: "Not Updated" };
  moviesDataUpdate
    ? response.send(moviesDataUpdate)
    : response.status(404).send(not_Found);
});

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const moviesDataDelete = await Movies.destroy({
    where: {
      id: id,
    },
  });
  console.log(moviesDataDelete);
  const not_Found = { msg: "Not found" };
  moviesDataDelete
    ? response.send("Deleted")
    : response.status(404).send(not_Found);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
