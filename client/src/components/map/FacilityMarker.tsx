import { FC, useState } from "react";
import Facility from "../../models/Facility";
import { Marker } from "react-simple-maps";
import { blue, pink } from "@mui/material/colors";

interface MarkerProps {
  facility: Facility;
  scaleFactor: number;
  hoveredCallback: (f: Facility, hovered: boolean) => void;
  clickCallback: (f: Facility) => void;
}

const FacilityMarker: FC<MarkerProps> = ({
  facility: f,
  scaleFactor,
  hoveredCallback,
  clickCallback,
}) => {
  const [hovered, setHovered] = useState(false);

  const updateHover = (hover: boolean) => {
    setHovered(hover);
    hoveredCallback(f, hover); // to allow rendering on top of all other markers
  };

  return (
    <Marker
      coordinates={[f.longitude, f.latitude]}
      key={f._id}
      onClick={() => clickCallback(f)}
      onMouseEnter={() => updateHover(true)}
      onMouseLeave={() => updateHover(false)}
      className="marker"
    >
      {hovered && <circle r={10 / scaleFactor} fill={blue[200]} />}
      <circle r={8 / scaleFactor} fill={hovered ? pink[800] : pink[400]} />
      {hovered && (
        <text
          textAnchor="middle"
          y={-18 / scaleFactor}
          className="marker-text"
          style={{
            fontSize: 20 / scaleFactor,
          }}
        >
          {f.name1} {f.name2}
        </text>
      )}
    </Marker>
  );
};

export default FacilityMarker;
