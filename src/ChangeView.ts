import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

interface ChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default ChangeView;
