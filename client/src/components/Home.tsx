import React, { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import * as appService from "../services/app-service";

const states = [
  { value: "CA", label: "CA (2K)" },
  { value: "NY", label: "NY (1.4K)" },
  { value: "OH", label: "OH (1.1K)" },
];

interface Facility {
  _id: string;
  name1: string;
  name2: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  zip4: string;
  county: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  pwbd: boolean;
}

interface FacilityPage {
  pages: number;
  data: Facility[];
}

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function HomePage() {
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState<string[]>([]);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [zip, setZip] = useState("");
  const [pwbd, setPwbd] = useState(false);

  const [facilities, setFacilities] = useState<FacilityPage>({
    pages: 0,
    data: [],
  });

  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    async function load() {
      const cities = await appService.getCities();
      setCities(
        cities.map((c: any) => {
          return { label: c, value: c };
        })
      );
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      setFacilities(
        await appService.search({
          filter: {
            city: selectedCities,
            state: selectedStates,
            zip: zip,
            pwbd: pwbd,
          },
          pagination: {
            page: 1,
            itemsPerPage: 100,
          },
        })
      );
    }
    load();
  }, [selectedCities, selectedStates, zip, pwbd]);

  return (
    <PrimeReactProvider>
      {!loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 25,
            padding: 25,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 25,
              padding: 25,
              alignItems: "center",
            }}
          >
            <span className="p-float-label">
              <MultiSelect
                id="ms-cities"
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.value)}
                options={cities}
                filter
                optionLabel="label"
                display="chip"
                className="w-full md:w-20rem"
              />
              <label htmlFor="ms-cities">Cities</label>
            </span>
            <span className="p-float-label">
              <MultiSelect
                id="ms-states"
                value={selectedStates}
                onChange={(e) => setSelectedStates(e.value)}
                options={states}
                filter
                optionLabel="label"
                display="chip"
                className="w-full md:w-20rem"
              />
              <label htmlFor="ms-states">States</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label htmlFor="zip">Zip (Starts with)</label>
            </span>
            <div className="flex items-center">
              <Checkbox
                inputId="pwbd"
                onChange={(e) => setPwbd(e.checked || false)}
                checked={pwbd}
              />
              <label htmlFor="pwbd" className="ml-2">
                Accepts PWBD?
              </label>
            </div>
          </div>
          <ComposableMap projection="geoAlbers" style={{ height: 400 }}>
            <ZoomableGroup onMove={({ zoom }) => setScaleFactor(zoom)} maxZoom={15}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#DDD"
                      stroke="#FFF"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {facilities &&
                facilities.data.map((f) => {
                  return (
                    <Marker coordinates={[f.longitude, f.latitude]}>
                      <circle r={8 / scaleFactor} fill="#F53" />
                    </Marker>
                  );
                })}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      )}
    </PrimeReactProvider>
  );
}

export default HomePage;
