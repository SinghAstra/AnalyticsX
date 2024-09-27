import { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    sessionToken: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expires: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
