import { useEffect, useState } from "react";
import "./home.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import * as appService from "../services/app-service";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDebounce } from "primereact/hooks";
import FacilityMap from "./map/Map";
import Facility from "../models/Facility";
import Select from "./filter/Select";
import TextInput from "./filter/TextInput";
import Table from "./table/Table";
import SingleSelect from "./filter/SingleSelect";

export const PWBD_DROPDOWN_OPTIONS = [
  { label: "Yes", value: appService.PWBD_TRUE },
  { label: "No", value: appService.PWBD_FALSE },
  { label: "Unknown", value: appService.PWBD_UNKNOWN },
];

export const FACILITY_TYPE_OPTIONS = [
  { label: "Substance Use", value: "SU" },
  { label: "Mental Health", value: "MH" },
];

function HomePage() {
  const [loading, setLoading] = useState(true);
  // querying is slightly different from loading - loading is for cities and states, querying is for loading the facilities
  const [querying, setQuerying] = useState(true);

  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [demographicFilters, setDemographicFilters] = useState<string[]>([]);

  // filters
  const [facilityName, debouncedFacilityName, setFacilityName] = useDebounce(
    "",
    1000
  );
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [zip, debouncedZip, setZip] = useDebounce("", 1000);
  const [pwbd, setPwbd] = useState<boolean | undefined>(undefined);
  const [facilityType, setFacilityType] = useState<boolean | undefined>(
    undefined
  );
  const [selectedDemographics, setSelectedDemographics] = useState([]);

  const [facilities, setFacilities] = useState<Facility[]>([]);

  const [highlightedFacility, setHighlightedFacility] =
    useState<Facility | null>(null);

  useEffect(() => {
    async function load() {
      const cities = await appService.getCities();
      const states = await appService.getStates();
      const demographics = await appService.getDemographicFilters();
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
      setDemographicFilters(demographics);
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      setQuerying(true);
      setFacilities(
        await appService.search({
          name: debouncedFacilityName,
          city: selectedCities,
          state: selectedStates,
          zip: debouncedZip,
          facility_type: facilityType,
          demographics: selectedDemographics,
          pwbd,
        })
      );
      setQuerying(false);
    }

    if (
      debouncedFacilityName.length === 0 &&
      selectedCities.length === 0 &&
      selectedStates.length === 0 &&
      debouncedZip === "" &&
      facilityType === undefined &&
      selectedDemographics.length === 0 &&
      pwbd === undefined
    ) {
      setFacilities([]);
      setQuerying(false);
      return; // no querying with pwbd != true, since it lags out the view
    }

    load();
  }, [
    debouncedFacilityName,
    selectedCities,
    selectedStates,
    debouncedZip,
    facilityType,
    selectedDemographics,
    pwbd,
  ]);

  return (
    <PrimeReactProvider>
      <div className="container">
        <div className="filter-container">
          {loading ? (
            <p style={{ color: "#6c757d" }}>Loading Filters...</p>
          ) : (
            <>
              <div className="filter-row">
                <TextInput
                  title="Facility Name"
                  value={facilityName}
                  onChange={setFacilityName}
                />
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
              </div>
              <div className="filter-row">
                <SingleSelect
                  title="Facility type"
                  options={FACILITY_TYPE_OPTIONS}
                  selectedOption={facilityType}
                  setSelectedOption={setFacilityType}
                />
                <Select
                  title="Demographics"
                  options={demographicFilters}
                  selectedOptions={selectedDemographics}
                  setSelectedOptions={setSelectedDemographics}
                />
                <SingleSelect
                  title="Accepts person with blood disorder?"
                  options={PWBD_DROPDOWN_OPTIONS}
                  selectedOption={pwbd}
                  setSelectedOption={setPwbd}
                />
              </div>
            </>
          )}
        </div>
        <FacilityMap
          querying={querying}
          facilities={facilities}
          clickCallback={setHighlightedFacility}
        />
      </div>
      <ScrollPanel className="results-container">
        {facilities && (
          <Table
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
        )}
      </ScrollPanel>
    </PrimeReactProvider>
  );
}

export default HomePage;
