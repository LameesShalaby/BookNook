import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [reviewSchema],
    genre: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
