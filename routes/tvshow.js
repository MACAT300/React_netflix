const express = require("express");
//create a express router
const router = express.Router();

const {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
} = require("../controllers/tvshow");

router.get("/", async (req, res) => {
  const premiere_year = req.query.premiere_year;
  const genre = req.query.genre;
  const rating = req.query.rating;
  const shows = await getTvshows(premiere_year, genre, rating);
  res.status(200).send(shows);
});

// GEt
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await getTvshow.findById(id);
  res.status(200).send(show);
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
    res
      .status(200)
      .send(
        await addTvshow(title, creator, premiere_year, seasons, genre, rating)
      );
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
    res
      .status(200)
      .send(
        await updateTvshow(
          id,
          title,
          creator,
          premiere_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTvshow(id);
    res.status(200).send({
      message: `Tvshow with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
