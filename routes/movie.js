import Express from "express";
import { Movie } from "../models/movie.js";

const movie_router = new Express.Router();
movie_router
  .route("/")
  .get(async (req, res) => {
    try {
      const movies = await Movie.find();
      res.send(movies);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const movie = new Movie({
        title: req.body.title,
        image: req.body.image,
        language: req.body.language,
        genre: req.body.genre,
        director: req.body.director,
        cast: req.body.cast,
        description: req.body.description,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        endDate: req.body.endDate,
      });
      const newMovie = await movie.save();
      res.send(newMovie);
    } catch (err) {
      res.send(err);
    }
  });

movie_router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch (err) {
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      res.send(movie);
    } catch (err) {
      res.send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          image: req.body.image,
          language: req.body.language,
          genre: req.body.genre,
          director: req.body.director,
          cast: req.body.cast,
          description: req.body.description,
          duration: req.body.duration,
          releaseDate: req.body.releaseDate,
          endDate: req.body.endDate,
        },
        (err, docs) => {
          if (err) console.log(err);
        }
      );
      res.send(movie);
    } catch (err) {
      res.send(err);
    }
  });

export default movie_router;
