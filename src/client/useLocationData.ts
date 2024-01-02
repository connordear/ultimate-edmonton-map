import { useEffect, useState } from "react";
import { Location, TableData } from "./../types";
import { supabase } from "./db";

const useLocationData = (tableData: TableData) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    getData(tableData.table_name);
  }, [tableData.table_name]);

  async function getData(tableName: string) {
    const { data } = await supabase.from(tableName).select("*");
    console.log(data);
    data && setLocations(data);
  }

  return locations;
};

export default useLocationData;
