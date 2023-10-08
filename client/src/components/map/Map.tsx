import { FC, useState } from "react";
import "./map.css";
import { ColorRing } from "react-loader-spinner";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import Facility from "../../models/Facility";

const GEO_URL = "/us-topojson.json";

interface FacilityMapProps {
  querying: boolean;
  facilities: Facility[];
}

const FacilityMap: FC<FacilityMapProps> = ({ querying, facilities }) => {
  const [scaleFactor, setScaleFactor] = useState(1);

  return (
    <ComposableMap projection="geoAlbers" style={{ height: 400 }}>
      <ZoomableGroup onMove={({ zoom }) => setScaleFactor(zoom)} maxZoom={500}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
                className="geography"
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
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
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
  );
};

export default FacilityMap;
