import { LatLngExpression } from "leaflet";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import ChangeView from "./ChangeView";
import useLocationData from "./client/useLocationData";
import useMultiPointData from "./client/useMultiPointData";
import { TableData } from "./types";
import { parseLocation, parsePolyline } from "./utils/locationUtils";

type MapPropsType = {
  layers: TableData[];
  userLocation?: LatLngExpression;
  center?: LatLngExpression;
};

const Map = ({
  layers,
  userLocation,
  center = [53.5461, -113.4937],
}: MapPropsType) => {
  return (
    <MapContainer
      center={userLocation ?? center}
      zoom={15}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ChangeView center={userLocation ?? center} zoom={15} />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <LayersControl>
        {layers.map((layer) => (
          <MapLayer key={layer.table_name} layer={layer} />
        ))}
      </LayersControl>
      {/* Marker for user location */}
      {userLocation && (
        <Marker opacity={0.5} position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}
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
        {locations.map((location, i) => (
          <Marker
            key={`${location.name}-${i}`}
            position={parseLocation(location.location)}
          >
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
        {multiPoints.map((multiPoint, i) => (
          <Polyline
            key={i}
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
