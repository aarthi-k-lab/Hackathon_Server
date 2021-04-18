import Express from "express";
import { Reservation } from "../models/reservation.js";

const reservation_router = new Express.Router();
reservation_router
  .route("/")
  .get(async (req, res) => {
    try {
      const reservation = await Reservation.find();
      res.send(reservation);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const reservation = new Reservation({
        date: req.body.date,
        startAt: req.body.startAt,
        seats: req.body.seats,
        ticketPrice: req.body.ticketPrice,
        total: req.body.total,
        showtimeId: req.body.showtimeId,
        movieId: req.body.movieId,
        cinemaId: req.body.cinemaId,
        userId: req.body.userId,
      });
      const newreservation = await reservation.save();
      res.send(newreservation);
    } catch (err) {
      res.send(err);
    }
  });

reservation_router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      res.send(reservation);
    } catch (err) {
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      res.send(reservation);
    } catch (err) {
      res.send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        {
          date: req.body.date,
          startAt: req.body.startAt,
          seats: req.body.seats,
          ticketPrice: req.body.ticketPrice,
          total: req.body.total,
          showtimeId: req.body.showtimeId,
          movieId: req.body.movieId,
          cinemaId: req.body.cinemaId,
          userId: req.body.userId,
        },
        (err, docs) => {
          if (err) console.log(err);
        }
      );
      res.send(reservation);
    } catch (err) {
      res.send(err);
    }
  });

export default reservation_router;
