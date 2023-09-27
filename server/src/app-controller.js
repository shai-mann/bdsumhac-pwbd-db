import * as historyDao from "./history-dao.js";
import * as facilitiesDao from "./facilities-dao.js";

const exists = (field) => field && field.length !== 0;
const stringExists = (field) => field && field !== "";

const AppController = (app) => {
  // filter and find all facilities
  // PARAMS: filter (body)
  //   {
  //     city: String[] (optional),
  //     state: String[] (optional),
  //     zip: String (optional),
  //     pwbd: Boolean (optional)
  //   }
  const getFacilities = async (req, res) => {
    const filter = req.body;
    const formattedFilter = {
      city: exists(filter.city) ? { $in: filter.city } : null,
      state: exists(filter.state) ? { $in: filter.state } : null,
      zip: stringExists(filter.zip)
        ? new RegExp(`^${filter.zip}`)
        : null,
      pwbd: !!filter.pwbd,
    };

    Object.keys(formattedFilter).forEach((key) => {
      if (formattedFilter[key] === null) {
        delete formattedFilter[key];
      }
    });
    if (Object.keys(formattedFilter).length == 0) return res.json([]); // prevents returning all elements

    const out = await facilitiesDao.searchFacilities(formattedFilter);
    return res.json(out);
  };

  // find specific facility by a given ID
  // PARAMS: id (in path)
  const getFacility = async (req, res) => {
    const id = req.params.id;
    try {
      const out = await facilitiesDao.findFacilityById(id);
      if (!out) return res.sendStatus(500);

      return res.json(out);
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  // update the PWBD value of a given facility. Must have an email attached.
  // PARAMS: id (in path), username (query), pwbd (query)
  const updateFacility = async (req, res) => {
    const id = req.params.id;
    const email = req.query.email;
    const pwbd = req.query.pwbd;

    if (!email || email === "") return res.sendStatus(401);
    try {
      const facility = await facilitiesDao.findFacilityById(id);
      if (!facility) res.sendStatus(500);
    } catch (error) {
      res.sendStatus(500);
    }

    await facilitiesDao.updateFacility(id, pwbd);
    await historyDao.createEdit({ email: email, facility: id, pwbd: pwbd });
    return res.sendStatus(200);
  };

  const getCities = async (req, res) => {
    const cities = await facilitiesDao.findCities();
    return res.json(cities);
  };

  const getStates = async (req, res) => {
    const states = await facilitiesDao.findStates();
    return res.json(states);
  };

  app.post("/api/facilities", getFacilities);
  app.get("/api/facilities/:id", getFacility);
  app.post("/api/facilities/:id", updateFacility);
  app.get("/api/cities", getCities);
  app.get("/api/states", getStates);
};

export default AppController;
