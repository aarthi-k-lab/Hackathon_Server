import mongoose from "mongoose";

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  showtimeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
