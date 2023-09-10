import * as historyDao from "./history-dao.js";
import * as facilitiesDao from "./facilities-dao.js";

const AppController = (app) => {
  // filter and find all facilities
  // PARAMS: filter (body)
  //   filter: {
  //     city: String[] (optional),
  //     state: String[] (optional),
  //     zip: String (optional),
  //     pwbd: Boolean (optional)
  //   }
  //   pagination: {
  //     page: Number, - starts at page 1
  //     itemsPerPage: Number,
  //     sort: String (Optional, default name1)
  //   }
  const getFacilities = async (req, res) => {
    const exists = (field) => field && field.length !== 0;

    const filter = req.body.filter;
    const formattedFilter = {
      city: exists(filter.city) ? { $in: filter.city } : null,
      state: exists(filter.state) ? { $in: filter.state } : null,
      zip: filter.zip || null,
      pwbd: filter.pwbd || false,
    };

    Object.keys(formattedFilter).forEach((key) => {
      if (formattedFilter[key] === null) {
        delete formattedFilter[key];
      }
    });

    const pagination = req.body.pagination;
    const out = await facilitiesDao.searchFacilities(
      formattedFilter,
      pagination
    );
    const totalItemsFound = await facilitiesDao.countFacilities(
      formattedFilter
    );
    return res.json({
      pages: Math.ceil(totalItemsFound / pagination.itemsPerPage),
      data: out,
    });
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

  app.post("/api/facilities", getFacilities);
  app.get("/api/facilities/:id", getFacility);
  app.post("/api/facilities/:id", updateFacility);
  app.get("/api/cities", getCities);
};

export default AppController;
