import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import useLocationData from "./client/useLocationData";
import useMultiPointData from "./client/useMultiPointData";
import { TableData } from "./types";
import { parseLocation, parsePolyline } from "./utils/locationUtils";

type MapPropsType = {
  layers: TableData[];
};

const Map = ({ layers }: MapPropsType) => {
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
      <LayersControl>
        {layers.map((layer) => (
          <MapLayer layer={layer} />
        ))}
      </LayersControl>
    </MapContainer>
  );
};

const MapLayer = ({ layer }: { layer: TableData }) => {
  if (layer.type === "location") {
    return <LocationMapLayer layer={layer} />;
  }
  if (layer.type === "multipoint") {
    return <MultiPointMapLayer layer={layer} />;
  }
  return null;
};

const LocationMapLayer = ({ layer }: { layer: TableData }) => {
  const locations = useLocationData(layer);
  return (
    <LayersControl.Overlay checked name={layer.display_name}>
      <LayerGroup>
        {locations.map((location) => (
          <Marker position={parseLocation(location.location)}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

const MultiPointMapLayer = ({ layer }: { layer: TableData }) => {
  const multiPoints = useMultiPointData(layer);

  return (
    <LayersControl.Overlay checked name={layer.display_name}>
      <LayerGroup>
        {multiPoints.map((multiPoint) => (
          <Polyline
            positions={parsePolyline(multiPoint.geometry_line)}
            pathOptions={{
              color: "red",
              weight: 1,
            }}
          />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default Map;
