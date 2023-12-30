import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Location, MultiPoint } from "./types";
import { parseLocation } from "./utils/locationUtils";

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
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker position={parseLocation(location.location)}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
