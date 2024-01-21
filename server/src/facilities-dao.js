import { facilitiesModel } from "./models.js";
import fs from "fs";

export const searchFacilities = (query) => facilitiesModel.find(query);

export const findFacilityById = (id) => facilitiesModel.findById(id);

export const countFacilities = (query) => facilitiesModel.countDocuments(query);

export const updateFacility = (id, pwbd) =>
  facilitiesModel.updateOne({ _id: id }, { $set: { pwbd: pwbd } });

export const deleteFacility = (id) => facilitiesModel.deleteOne({ _id: id });

export const findCities = () => facilitiesModel.distinct("city");

export const findStates = () => facilitiesModel.distinct("state");

export const validDemographicsFilters = [
  { label: "Pediatric", value: "pediatric" },
  { label: "Young Adult", value: "teen" },
  { label: "Adult", value: "adult" },
  { label: "Senior", value: "senior" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
];

export const createFacilities = async () => {
  const existing = await facilitiesModel.count();
  if (existing !== 0) {
    console.log(
      `[DATA CREATION] Skipping - ${existing} facilities documents found`
    );
    return;
  }

  const data = JSON.parse(fs.readFileSync("./assets/converted.json"));
  const formatted = data.map((x) => {
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
      facility_type: x.type_facility,
      pediatric: x.chld === "1",
      teen: x.yad === "1",
      adult: x.adlt === "1",
      senior: x.snr === "1",
      women: x.fem === "1",
      men: x.male === "1",
      pwbd: "Unknown",
    };
  });

  // create in batches
  let count = 0;
  const chunkSize = 999;
  for (let i = 0; i < formatted.length; i += chunkSize) {
    await facilitiesModel
      .insertMany(formatted.slice(i, i + chunkSize))
      .then((docs) => {
        count += docs.length;
        console.log(`[DATA CREATION] Created ${docs.length} documents.`);
      })
      .catch((error) => console.log(error));
  }
  console.log(
    `[DATA CREATION] Created a total of ${count} facility documents.`
  );
};
