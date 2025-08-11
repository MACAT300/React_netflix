const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

connectToMongoDB();

const movieSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

const showschema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// create a Modal from the schema
const Movies = mongoose.model("Tv", TvSchema);
const Show = mongoose.model("Tv", TvSchema);

// setup root route
app.get("/", (request, res) => {
  res.send("1!");
});

app.get("/movie", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const director = req.query.director;

  let filter = {};
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (directorr) {
    filter.director = director;
  }
  const movie = await Movies.find(filter);
  res.send(movie);
});

app.get("/show", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;
  let filter = {};
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (premiere_year) {
    filter.premiere_year = premiere_year;
  }
  const shows = await Tv.find(filter);
  res.send(shows);
});

app.get("/show/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Show.findById(id);
  res.send(movie);
});

app.listen(5124, () => {
  console.log("server is running at http://localhost:5124");
});
