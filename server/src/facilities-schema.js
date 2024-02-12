import mongoose from "mongoose";
const facilitiesSchema = new mongoose.Schema(
  {
    name1: String,
    name2: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String,
    zip4: String,
    county: String,
    phone: String,
    website: String,
    latitude: Number,
    longitude: Number,
    treatment_type: String,
    pediatric: Boolean,
    teen: Boolean,
    adult: Boolean,
    senior: Boolean,
    women: Boolean,
    men: Boolean,
    inpatient: Boolean, // HI
    outpatient: Boolean, // OP
    partial_hospitalization: Boolean, // PHDT
    residential: Boolean, // RES
    pwbd: String,
  },
  { collection: "facilities" }
);
export default facilitiesSchema;
