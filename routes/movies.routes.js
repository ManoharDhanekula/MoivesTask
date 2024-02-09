import express from "express";
// import { Movies } from "../model/movies.model.js";
import moviesController from "../controller/movies.controller.js";
const route = express.Router();

// const movies1 = await Movies.create({
//     name: "Ratatouille",
//     poster:
//       "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     rating: 8,
//     summary:
//       "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
//   });

route
  .route("/")
  .get(moviesController.getAllMovieData)
  .post(moviesController.postDataByID);

route
  .route("/:id")
  .get(moviesController.getMovieDataByID)
  .put(moviesController.putMovieDataByID)
  .delete(moviesController.deleteMoviesDataByID);

export default route;
