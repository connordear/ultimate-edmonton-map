import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import { supabase } from "./client/db";
import { TableData } from "./types";

function App() {
  const [tables, setTables] = useState<TableData[]>([]);

  async function getTables() {
    const { data } = await supabase.from("tables").select("*");
    data && setTables(data);
  }

  useEffect(() => {
    getTables();
  }, []);

  if (!tables) return <div>Loading...</div>;
  return (
    <>
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Map layers={tables} />
      </div>
    </>
  );
}

export default App;
