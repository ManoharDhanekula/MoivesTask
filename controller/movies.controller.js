// import { Movies } from "../model/movies.model.js";
import moviesService from "../service/movies.service.js";

async function getAllMovieData(request, response) {
  const movieData = moviesService.displayingData;
  response.send(movieData);
}

async function postDataByID(request, response) {
  console.log(request.body);

  const { name, poster, rating, summary, trailer } = request.body;
  const moviesDataPost = moviesService.postingData(
    name,
    poster,
    rating,
    summary,
    trailer
  );
  const not_Found = { msg: "Not Inserted" };
  moviesDataPost
    ? response.send(moviesDataPost)
    : response.status(404).send(not_Found);
}

async function getMovieDataByID(request, response) {
  const not_Found = { msg: "Movie Not Found" };
  const { id } = request.params;

  const movieData = moviesService.findByID(id);
  movieData ? response.send(movieData) : response.status(404).send(not_Found);
}

async function putMovieDataByID(request, response) {
  console.log(request.body);
  const { id } = request.params;

  const { name, poster, rating, summary, trailer } = request.body;
  const moviesDataUpdate = moviesService.updatingMovieDataByID(
    name,
    poster,
    rating,
    summary,
    trailer,
    id
  );
  const not_Found = { msg: "Not Updated" };
  moviesDataUpdate
    ? response.send(moviesDataUpdate)
    : response.status(404).send(not_Found);
}

async function deleteMoviesDataByID(request, response) {
  const { id } = request.params;
  const moviesDataDelete = moviesService.distoryMovieDataByID(id);
  console.log(moviesDataDelete);
  const not_Found = { msg: "Not found" };
  moviesDataDelete
    ? response.send("Deleted")
    : response.status(404).send(not_Found);
}

export default {
  getAllMovieData,
  postDataByID,
  getMovieDataByID,
  putMovieDataByID,
  deleteMoviesDataByID,
};
