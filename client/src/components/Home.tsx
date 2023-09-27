import { useEffect, useState } from "react";
import "./home.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import * as appService from "../services/app-service";
import { ColorRing } from "react-loader-spinner";
import { ScrollPanel } from "primereact/scrollpanel";

import FacilityMap from "./map/Map";
import Facility from "../models/Facility";
import Select from "./filter/Select";
import TextInput from "./filter/TextInput";
import SelectCheckBox from "./filter/SelectCheckBox";
import Table from "./table/Table";

function HomePage() {
  const [loading, setLoading] = useState(true);
  // querying is slightly different from loading - loading is for cities and states, querying is for loading the facilities
  const [querying, setQuerying] = useState(true);

  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [zip, setZip] = useState("");
  const [pwbd, setPwbd] = useState(false);

  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    async function load() {
      const cities = await appService.getCities();
      const states = await appService.getStates();
      setCities(
        cities.map((c: any) => {
          return { label: c, value: c };
        })
      );
      setStates(
        states.map((c: any) => {
          return { label: c, value: c };
        })
      );
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      setQuerying(true);
      setFacilities(
        await appService.search({
          city: selectedCities,
          state: selectedStates,
          zip: zip,
          pwbd: pwbd,
        })
      );
      setQuerying(false);
    }

    if (
      selectedCities.length === 0 &&
      selectedStates.length === 0 &&
      zip === ""
    ) {
      setFacilities([]);
      setQuerying(false);
      return; // no querying with just the pwbd, since it lags out the view
    }

    load();
  }, [selectedCities, selectedStates, zip, pwbd]);

  return (
    <PrimeReactProvider>
      {!loading && (
        <div className="container">
          <div className="filter-container">
            <Select
              title="Cities"
              options={cities}
              selectedOptions={selectedCities}
              setSelectedOptions={setSelectedCities}
            />
            <Select
              title="States"
              options={states}
              selectedOptions={selectedStates}
              setSelectedOptions={setSelectedStates}
            />
            <TextInput
              title="Zip (Starts with)"
              value={zip}
              onChange={setZip}
            />
            <SelectCheckBox
              id="pwbd"
              title="Accepts PWBD?"
              checked={pwbd}
              onChange={setPwbd}
            />
          </div>
          <FacilityMap querying={querying} facilities={facilities} />
        </div>
      )}
      <ScrollPanel className="results-container">
        {querying && facilities ? (
          <div className="flex justify-center">
            <ColorRing
              visible={querying}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#DDD", "#DDD", "#DDD", "#DDD", "#DDD"]}
            />
          </div>
        ) : (
          <Table facilities={facilities} />
        )}
      </ScrollPanel>
    </PrimeReactProvider>
  );
}

export default HomePage;
