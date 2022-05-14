import { mongoose, Schema } from "mongoose";

const urlShortenSchema = new Schema(
  {
    shortCode: {
      type: String,
      unique: true,
    },

    url: {
      type: String,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    lastSeenDate: {
      type: Date,
      default: Date.now,
    },

    redirectCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UrlShorten", urlShortenSchema);
