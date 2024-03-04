import mongoose from "mongoose";
const historySchema = new mongoose.Schema(
  {
    facility: String,
    time: Date,
    email: String,
    name: String, // name: optional parameter for user to give
    explanation: String, // explain how they know the edit is true (optional)
    pwbd: String, // the value it was edited to
  },
  { collection: "edit-history" }
);
export default historySchema;
