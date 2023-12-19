import { FC, useState } from "react";
import "./map.css";
import { ColorRing } from "react-loader-spinner";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import Facility from "../../models/Facility";
import FacilityMarker from "./FacilityMarker";

const GEO_URL = "/us-topojson.json";

interface FacilityMapProps {
  querying: boolean;
  facilities: Facility[];
  clickCallback: (f: Facility) => void;
}

const FacilityMap: FC<FacilityMapProps> = ({
  querying,
  facilities,
  clickCallback,
}) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [hoveredMarker, setHoveredMarker] = useState<Facility>();
  // keeping track of hovered marker allows rendering of that marker on top of all others.

  const hoveredCallback = (f: Facility, hovered: boolean) => {
    setHoveredMarker(hovered ? f : undefined);
  };

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
          <>
            {facilities.map((f, i) => (
              <FacilityMarker
                facility={f}
                key={i}
                scaleFactor={scaleFactor}
                hoveredCallback={hoveredCallback}
                clickCallback={clickCallback}
              />
            ))}
            {hoveredMarker && (
              <FacilityMarker
                facility={hoveredMarker}
                key={"hovered"}
                scaleFactor={scaleFactor}
                hoveredCallback={hoveredCallback}
                clickCallback={clickCallback}
              />
            )}
          </>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default FacilityMap;
