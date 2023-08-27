import mongoose from "mongoose";
const historySchema = new mongoose.Schema(
  {
    facility: Number,
    time: Date,
    email: String,
    pwbd: Boolean, // the value it was edited to
  },
  { collection: "edit-history" }
);
export default historySchema;
