import { FC, useEffect, useState } from "react";
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
import { IconButton } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { pink } from "@mui/material/colors";

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
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([-96, 38.5]);
  const [hoveredMarker, setHoveredMarker] = useState<Facility>();
  // keeping track of hovered marker allows rendering of that marker on top of all others.

  const hoveredCallback = (f: Facility, hovered: boolean) => {
    setHoveredMarker(hovered ? f : undefined);
  };

  const onMapMove = (center: [number, number], zoom: number) => {
    setCenter(center);
    setZoom(zoom);
  };

  const updateZoom = (newZoom: number) => {
    setZoom(newZoom);
    setScaleFactor(newZoom);
  };

  useEffect(() => {
    if (querying) {
      return;
    }

    if (facilities.length === 0) {
      setCenter([-96, 38.5]);
      updateZoom(1);
      return;
    }

    const latLongs = facilities.map((f) => [f.latitude, f.longitude]);

    const [sumLat, sumLon] = latLongs.reduce(([lat, lon], [curLat, curLon]) => [
      lat + curLat,
      lon + curLon,
    ]);
    const newCenter = [sumLon / facilities.length, sumLat / facilities.length];

    setCenter(newCenter as [number, number]);
  }, [facilities, querying]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "revert" }}>
        <ComposableMap projection="geoAlbers" style={{ height: 400 }}>
          <ZoomableGroup
            onMove={({ zoom }) => setScaleFactor(zoom)}
            center={center}
            zoom={zoom}
            maxZoom={500}
            onMoveEnd={({ coordinates, zoom }) => onMapMove(coordinates, zoom)}
          >
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
            {!querying && (
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
      </div>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        {querying && (
          <ColorRing
            visible={querying}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <IconButton onClick={() => updateZoom(zoom * 1.1)}>
          <PlusIcon sx={{ color: pink[400] }} fontSize="large" />
        </IconButton>
        <IconButton onClick={() => updateZoom(zoom / 1.1)}>
          <MinusIcon sx={{ color: pink[400] }} fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default FacilityMap;
