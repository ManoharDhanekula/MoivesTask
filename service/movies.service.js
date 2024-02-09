import { Movies } from "../model/movies.model.js";

async function displayingData() {
  return await Movies.findAll();
}

async function postingData(name, poster, rating, summary, trailer) {
  return await Movies.create({
    name,
    poster,
    rating,
    summary,
    trailer,
  });
}

async function findByID(id) {
  return await Movies.findOne({
    where: {
      id: id,
    },
  });
}

async function updatingMovieDataByID(
  name,
  poster,
  rating,
  summary,
  trailer,
  id
) {
  return await Movies.update(
    { name, poster, rating, summary, trailer },
    {
      where: {
        id: id,
      },
    }
  );
}

async function distoryMovieDataByID(id) {
  return await Movies.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  displayingData,
  postingData,
  findByID,
  updatingMovieDataByID,
  distoryMovieDataByID,
};
