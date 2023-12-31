import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import { Location, MultiPoint } from "./types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [data, setData] = useState<Location[]>([]);
  const [multiPoints, setMultiPoints] = useState<MultiPoint[]>([]);
  useEffect(() => {
    getData();
    getMultiPoints();
  }, []);

  async function getData() {
    const { data } = await supabase
      .from("od_public_washrooms_location")
      .select("*");
    console.log(data);
    data && setData(data);
  }
  async function getMultiPoints() {
    const { data } = await supabase
      .from("od_bike_routes_multipath")
      .select("*");
    console.log(data);
    data && setMultiPoints(data);
  }

  if (!data) return <div>{import.meta.env.SUPABASE_KEY} Loading...</div>;
  return (
    <>
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Map locations={data} multiPoints={multiPoints} />
      </div>
    </>
  );
}

export default App;
