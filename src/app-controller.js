import * as historyDao from "./history-dao.js";
import * as facilitiesDao from "./facilities-dao.js";

const AppController = (app) => {
  // filter and find all facilities
  // PARAMS: filter (body)
  //   filter: {
  //     city: String (optional),
  //     state: String (optional),
  //     zip: String (optional),
  //     pwbd: Boolean (optional)
  //   }
  const getFacilities = async (req, res) => {};

  // find specific facility by a given ID
  // PARAMS: id (query)
  const getFacility = async (req, res) => {
    
  };

  // update the PWBD value of a given facility. Must have an email attached.
  // PARAMS: username (query), pwbd (query)
  const updateFacility = async (req, res) => {};

  app.get("/api/facilities", getFacilities);
  app.get("/api/facilities/:id", getFacility);
  app.post("/api/facilities", updateFacility);
};

export default AppController;
