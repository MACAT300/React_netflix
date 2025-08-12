// import the Movie model
const Tvshow = require("../models/tvshow");

async function getTvshows(premiere_year, genre, rating) {
  // create a empty container for filter
  let filter = {};
  // if director exists, then only add it into the filter container
  if (premiere_year) {
    filter.premiere_year = premiere_year;
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  const tvshows = await Tvshow.find(filter).sort({ _id: -1 });
  return tvshows;
}

async function getTvshow(id) {
  const tvshows = await Tvshow.findById(id);
  return tvshows;
}

async function addTvshow(
  title,
  creator,
  premiere_year,
  seasons,
  genre,
  rating
) {
  const newTvshow = new Tvshow({
    title: title,
    creator: creator,
    premiere_year: premiere_year,
    seasons: seasons,
    genre: genre,
    rating: rating,
  });
  await newTvshow.save();
  return newTvshow;
}

async function updateTvshow(
  id,
  title,
  creator,
  premiere_year,
  seasons,
  genre,
  rating
) {
  return await Tvshow.findByIdAndUpdate(
    id,
    {
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteTvshow(id) {
  return await Tvshow.findByIdAndDelete(id);
}

module.exports = {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
};
