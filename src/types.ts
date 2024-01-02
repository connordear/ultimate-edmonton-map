type TableDataType = "location" | "multipoint";

export interface TableData {
  table_name: string;
  type: TableDataType;
  display_name: string;
}

export interface Location {
  name: string;
  location: string;
}

export interface MultiPoint {
  geometry_line: string;
}
