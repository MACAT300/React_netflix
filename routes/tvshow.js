const express = require("express");
//create a express router
const router = express.Router();

// import the Movie model
const Tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  const premiere_year = req.query.premiere_year;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create a empty container for filter
  let filter = {};
  // if premiere_year exists, then only add it into the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the shows data from Mongodb
  const shows = await Tvshow.find(filter);
  res.send(shows);
});

// GEt
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await Tvshow.findById(id);
  res.send(show);
});

// Post
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new tvshow
    const newTvshow = new Tvshow({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });

    await newTvshow.save(); // clicking the "save" button

    res.status(200).send(newTvshow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  PUT
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedTvShow = await Tvshow.findByIdAndUpdate(
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
    console.log(updatedTvShow);
    res.status(200).send(updatedTvShow);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTvshow = await Tvshow.findByIdAndDelete(id);
    res.status(200).send({
      message: `Tvshow with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
