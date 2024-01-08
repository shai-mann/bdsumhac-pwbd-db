import mongoose from "mongoose";
const historySchema = new mongoose.Schema(
  {
    facility: String,
    time: Date,
    email: String,
    pwbd: String, // the value it was edited to
  },
  { collection: "edit-history" }
);
export default historySchema;
