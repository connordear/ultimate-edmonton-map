import { LatLngExpression } from "leaflet";

export function parseLocation(loc: string): LatLngExpression {
  // string version is (lat, lng)

  // check format
  if (!loc.startsWith("(") || !loc.endsWith(")")) {
    throw new Error("Invalid location format");
  }
  // remove the parentheses
  const latLng = loc.replace(/[()]/g, "");
  const [lat, lng] = latLng.split(",");
  return [parseFloat(lat), parseFloat(lng)];
}
