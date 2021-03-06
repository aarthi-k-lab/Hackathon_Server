import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/user.js";
import movie_router from "./routes/movie.js";
import theatre_router from "./routes/theatre.js";
import showtime_router from "./routes/showtime.js";
import reservation_router from "./routes/reservation.js";

const app = Express();

//app part
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/api/movies", movie_router);
app.use("/api/theatres", theatre_router);
app.use("/api/showtimes", showtime_router);
app.use("/api/reservations", reservation_router);

const PORT = process.env.PORT || 5000;

// const CONNECTION_URL =
//   "mongodb+srv://aarthi:Chandlerbing@cluster0.prt4u.mongodb.net/BookMyShow?retryWrites=true&w=majority";

// const CONNECTION_URL =
//   "mongodb+srv://aarthi:Chandlerbing@cluster0.prt4u.mongodb.net/BookMyShow?retryWrites=true&w=majority";

const CONNECTION_URL =
  " mongodb://aarthi:Chandlerbing@cluster0-shard-00-00.prt4u.mongodb.net:27017,cluster0-shard-00-01.prt4u.mongodb.net:27017,cluster0-shard-00-02.prt4u.mongodb.net:27017/BookMyShow?ssl=true&replicaSet=atlas-g6xe0w-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server Running on Port:http://immense-sands-26614.herokuapp.com`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

//User HTTP Request for users collection

app
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.send(err);
    }
  })

  .post(async (req, res) => {
    try {
      const user = new User({
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });
      const newUser = await user.save();
      res.json(newUser);
    } catch (err) {
      res.send(err);
    }
  });

app
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json(user);
    } catch (err) {
      res.send(err);
    }
  });
