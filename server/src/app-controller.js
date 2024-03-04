import * as historyDao from "./history-dao.js";
import * as facilitiesDao from "./facilities-dao.js";
import { sendEmail } from "./mailer.js";

const exists = (field) => field && field.length !== 0;
const stringExists = (field) => field && field !== "";

const AppController = (app) => {
  // filter and find all facilities
  // PARAMS: filter (body)
  //   {
  //     city: String[] (optional),
  //     state: String[] (optional),
  //     zip: String (optional),
  //     treatment_type: SU/MH (optional),
  //     demographic: String[] optional (pediatric, teen, adult, senior, women, men),
  //     facility_types: String[] optional (inpatient, outpatient, partial_hospitalization, residential),
  //     pwbd: Boolean (optional)
  //   }
  const getFacilities = async (req, res) => {
    const filter = req.body;
    let formattedFilter = {
      name1: exists(filter.name) ? { $regex: filter.name } : null,
      city: exists(filter.city) ? { $in: filter.city } : null,
      state: exists(filter.state) ? { $in: filter.state } : null,
      zip: stringExists(filter.zip) ? new RegExp(`^${filter.zip}`) : null,
    };

    if (filter.treatment_type) {
      formattedFilter = {
        ...formattedFilter,
        treatment_type: filter.treatment_type,
      };
    }

    if (filter.demographics) {
      const demographics = {};
      filter.demographics.forEach((dem) => {
        demographics[dem] = true;
      });
      formattedFilter = {
        ...formattedFilter,
        ...demographics,
      };
    }

    if (filter.facility_types) {
      const facility_types = {};
      filter.facility_types.forEach((type) => {
        facility_types[type] = true;
      });
      formattedFilter = {
        ...formattedFilter,
        ...facility_types,
      };
      console.log(formattedFilter);
    }

    if (filter.pwbd) {
      formattedFilter = {
        ...formattedFilter,
        pwbd: filter.pwbd,
      };
    }

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
  // PARAMS: facilites list (in body, as (id, pwbd) pairs), email (query), name (query, optional), reason (body, optional)
  const updateFacility = async (req, res) => {
    const email = req.query.email;
    const name = req.query.name; // optional: may not exist
    const explanation = req.body.explanation; // optional: may not exist
    const facilities = req.body.facilities;

    let facilitiesInfo = [];

    if (!email || email === "") return res.sendStatus(401);
    var anyFailed = false;
    for (let [id, pwbd] of Object.entries(facilities)) {
      try {
        const facility = await facilitiesDao.findFacilityById(id);
        if (!facility) {
          anyFailed = true;
          continue;
        }

        facilitiesInfo = facilitiesInfo.concat([{id, name: facility.name1, pwbd}]);
      } catch (error) {
        console.log(error);
        anyFailed = true;
        continue;
      }

      await facilitiesDao.updateFacility(id, pwbd);
      await historyDao.createEdit({
        email,
        facility: id,
        name,
        explanation,
        pwbd,
      });
    }

    if (anyFailed) {
      return res.sendStatus(500);
    }

    // send email notifying Kate of updates
    sendEmail(email, facilitiesInfo, name, explanation);

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

  /**
   * Gets all supported demographic filter types as internal and external names.
   * @returns Valid demographic filters (with internal and external names)
   */
  const getDemographics = async (req, res) => {
    return res.json(facilitiesDao.validDemographicsFilters);
  };

  const getFacilityTypes = async (req, res) => {
    return res.json(facilitiesDao.validFacilityTypeFilters);
  };

  app.post("/api/facilities", getFacilities);
  app.get("/api/facilities/:id", getFacility);
  app.post("/api/facilities/edit", updateFacility);
  app.get("/api/cities", getCities);
  app.get("/api/states", getStates);
  app.get("/api/demographics", getDemographics);
  app.get("/api/facility_types", getFacilityTypes);
};

export default AppController;
