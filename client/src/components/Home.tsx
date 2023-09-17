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
import { ColorRing } from "react-loader-spinner";

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

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

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

  const [scaleFactor, setScaleFactor] = useState(1);

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
                virtualScrollerOptions={{ step: 100, itemSize: 43 }}
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
                virtualScrollerOptions={{ step: 100, itemSize: 43 }}
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
            <ZoomableGroup
              onMove={({ zoom }) => setScaleFactor(zoom)}
              maxZoom={500}
            >
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
              {querying ? (
                <ColorRing
                  visible={querying}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                facilities.map((f) => {
                  return (
                    <Marker coordinates={[f.longitude, f.latitude]} key={f._id}>
                      <circle r={8 / scaleFactor} fill="#F53" />
                    </Marker>
                  );
                })
              )}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      )}
    </PrimeReactProvider>
  );
}

export default HomePage;
