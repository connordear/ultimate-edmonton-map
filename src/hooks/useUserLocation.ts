import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [location, setLocation] = useState<LatLngExpression>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!position?.coords?.latitude || !position?.coords?.longitude) {
          setError("Location not found");
          setLoading(false);
          return;
        }
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);
  return { location, error, loading };
};
export default useUserLocation;
