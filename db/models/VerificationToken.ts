import { Schema } from "mongoose";

const verificationTokenSchema = new Schema(
  {
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

module.exports = VerificationToken;
