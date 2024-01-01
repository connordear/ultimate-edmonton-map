import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Location, MultiPoint } from "./types";
import { parseLocation, parsePolyline } from "./utils/locationUtils";

type MapPropsType = {
  locations: Location[];
  multiPoints?: MultiPoint[];
};

const Map = ({ locations, multiPoints }: MapPropsType) => {
  console.log(locations);
  console.log(multiPoints);
  return (
    <MapContainer
      center={[53.5461, -113.4937]}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {locations.map((location) => (
        <Marker position={parseLocation(location.location)}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
      {multiPoints?.map((multiPoint) => (
        <Polyline
          positions={parsePolyline(multiPoint.geometry_line)}
          pathOptions={{
            color: "red",
            weight: 1,
          }}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
