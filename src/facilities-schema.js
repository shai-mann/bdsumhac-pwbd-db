import mongoose from "mongoose";
const facilitiesSchema = new mongoose.Schema(
  {
    name1: String,
    name2: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    zip4: Number,
    county: String,
    phone: String,
    website: String,
    latitude: Number,
    longitude: Number,
    pwbd: Boolean,
  },
  { collection: "facilities" }
);
export default facilitiesSchema;
