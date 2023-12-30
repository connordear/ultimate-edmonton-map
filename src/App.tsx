import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import "./App.css";
import { Location, Name } from "./types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [data, setData] = useState<(Name & Location)[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await supabase
      .from("od_public_washrooms_location")
      .select("*");
    console.log(data);
    data && setData(data);
  }

  if (!data) return <div>{import.meta.env.SUPABASE_KEY} Loading...</div>;
  return (
    <>
      {data.map((item) => (
        <div key={item.name}>
          {item.name}
          {item.location}
        </div>
      ))}
    </>
  );
}

export default App;
