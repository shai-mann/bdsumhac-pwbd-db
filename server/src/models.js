import mongoose from "mongoose";
import facilitiesSchema from "./facilities-schema.js";
import historySchema from "./history-schema.js";

const facilitiesModel = mongoose.model("Facilities", facilitiesSchema);
const historyModel = mongoose.model("History", historySchema);

export { facilitiesModel, historyModel };
