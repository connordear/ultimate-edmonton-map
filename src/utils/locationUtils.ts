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

export function parsePolyline(
  mpString: string
): LatLngExpression[] | LatLngExpression[][] {
  // mpSTring is a string of MULTILINESTRING ((-113.54947835911825 53.54938001127477, -113.54949634285407 53.54960169937668))
  const points = mpString
    .replace("MULTILINESTRING ((", "")
    .replace("))", "")
    .split(", ");

  const res = points.map((point) => {
    const cleaned = point.replace("(", "").replace(")", "");
    const [lat, lng] = cleaned.split(" ");
    return [parseFloat(lng), parseFloat(lat)];
  });
  return res as LatLngExpression[] | LatLngExpression[][];
}
