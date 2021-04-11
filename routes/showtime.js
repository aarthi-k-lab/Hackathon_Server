import Express from "express";
import { Showtime } from "../models/showtime.js";

const showtime_router = new Express.Router();
showtime_router
  .route("/")
  .get(async (req, res) => {
    try {
      const showtimes = await Showtime.find();
      res.json(showtimes);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const showtime = new Showtime({
        startAt: req.body.startAt,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        movieId: req.body.movieId,
        cinemaId: req.body.cinemaId,
      });
      const newShowtime = await showtime.save();
      res.json(newShowtime);
    } catch (err) {
      res.send(err);
    }
  });

showtime_router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const showtime = await Showtime.findById(req.params.id);
      res.json(showtime);
    } catch (err) {
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const showtime = await Showtime.findByIdAndDelete(req.params.id);
      res.json(showtime);
    } catch (err) {
      res.send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const showtime = await Showtime.findByIdAndUpdate(
        req.params.id,
        {
          startAt: req.body.startAt,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          movieId: req.body.movieId,
          cinemaId: req.body.cinemaId,
        },
        (err, docs) => {
          if (err) console.log(err);
        }
      );
      res.json(showtime);
    } catch (err) {
      res.send(err);
    }
  });

export default showtime_router;
