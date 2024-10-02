import { timeStamp } from "console";

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
