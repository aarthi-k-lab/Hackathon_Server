import Express from "express";
import { Theatre } from "../models/theatre.js";

const theatre_router = new Express.Router();
theatre_router
  .route("/")
  .get(async (req, res) => {
    try {
      const theatres = await Theatre.find();
      res.json(theatres);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      const theatre = new Theatre({
        name: req.body.name,
        ticketPrice: req.body.ticketPrice,
        city: req.body.city,
        seats: req.body.seats,
        seatsAvailable: req.body.seatsAvailable,
        image: req.body.image,
      });
      const newTheatre = await theatre.save();
      res.json(newTheatre);
    } catch (err) {
      res.send(err);
    }
  });

theatre_router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const theatre = await Theatre.findById(req.params.id);
      res.json(theatre);
    } catch (err) {
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const theatre = await Theatre.findByIdAndDelete(req.params.id);
      res.json(theatre);
    } catch (err) {
      res.send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const theatre = await Theatre.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          ticketPrice: req.body.ticketPrice,
          city: req.body.city,
          seats: req.body.seats,
          seatsAvailable: req.body.seatsAvailable,
          image: req.body.image,
        },
        (err, docs) => {
          if (err) console.log(err);
        }
      );
      res.json(theatre);
    } catch (err) {
      res.send(err);
    }
  });

export default theatre_router;
