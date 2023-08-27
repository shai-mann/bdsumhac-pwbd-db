import { facilitiesModel } from "./models.js";
import fs from "fs";

export const searchFacilities = (query) =>
  facilitiesModel.find({
    city: query?.city,
    state: query?.state,
    zip: query?.zip,
    pwbd: query?.pwbd,
  });

export const updateFacility = (id, pwbd) =>
  facilitiesModel.updateOne({ _id: id }, { $set: { pwbd: pwbd } });

export const deleteFacility = (id) => facilitiesModel.deleteOne({ _id: id });

export const createFacilities = async () => {
  const existing = await facilitiesModel.count();
  if (existing !== 0) {
    console.log(`[DATA CREATION] Skipping - ${existing} facilities documents found`)
    return;
  }

  const data = JSON.parse(fs.readFileSync("./assets/converted.json"));
  const formatted = data.map(x => {
    return {
      name1: x.name1,
      name2: x.name2,
      street1: x.street1,
      street2: x.street2,
      city: x.city,
      state: x.state,
      zip: x.zip,
      zip4: x.zip4,
      county: x.county,
      phone: x.phone,
      website: x.website,
      latitude: x.latitude,
      longitude: x.longitude,
      pwbd: false,
    }
  })

  await facilitiesModel
      .insertMany(formatted)
      .then((docs) => docs.forEach(d => console.log(`[DATA CREATION] Created new Facility with ID ${d._id}`)))
      .catch((error) => console.log(error));
};
