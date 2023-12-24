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
      zip: stringExists(filter.zip) ? new RegExp(`^${filter.zip}`) : null,
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

  // update the PWBD value of a given list of facilities. Must have an email attached.
  // PARAMS: facilites list (in body, as (id, pwbd) pairs), email (query)
  const updateFacility = async (req, res) => {
    const email = req.query.email;
    const facilities = req.body;

    if (!email || email === "") return res.sendStatus(401);
    var anyFailed = false
    for (let [id, pwbd] of Object.entries(facilities)) {
      try {
        const facility = await facilitiesDao.findFacilityById(id);
        console.log(facility)
        if (!facility) {
          anyFailed = true
          continue
        }
      } catch (error) {
        anyFailed = true
        continue
      }

      await facilitiesDao.updateFacility(id, pwbd);
      await historyDao.createEdit({ email: email, facility: id, pwbd: pwbd });
    }

    if (anyFailed) {
      return res.sendStatus(500)
    }

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
  app.post("/api/facilities/edit", updateFacility);
  app.get("/api/cities", getCities);
  app.get("/api/states", getStates);
};

export default AppController;
