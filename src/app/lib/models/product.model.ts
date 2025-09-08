import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
    },
    image: {
      type: String,
    },
    currency: {
      type: String,
    },
    discount: {
      type: String, // keep as string if it includes "%" originally
    },
    priceHistory: {
      type: [
        {
          price: Number,
          date: Date,
        },
      ], // array of numbers
      default: [],
    },
    discountRate: {
      type: Number, // parsed number without %
    },
    category: {
      type: String,
      default: "category",
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    lowestPrice: {
      type: Number,
    },
    highestPrice: {
      type: Number,
    },
    users: [
      {
        email: String,
        date: Date,
      },
    ],
    default: [],
  },
  { timestamps: true }
);

// const Product =  mongoose.model('Product', productSchema);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
