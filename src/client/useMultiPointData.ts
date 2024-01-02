import { useEffect, useState } from "react";
import { MultiPoint, TableData } from "./../types";
import { supabase } from "./db";

const useMultiPointData = (tableData: TableData) => {
  const [multiPoints, setMultiPoints] = useState<MultiPoint[]>([]);

  useEffect(() => {
    getData(tableData.table_name);
  }, [tableData.table_name]);

  async function getData(tableName: string) {
    const { data } = await supabase.from(tableName).select("*");
    data && setMultiPoints(data);
  }

  return multiPoints;
};

export default useMultiPointData;
