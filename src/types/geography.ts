import { Geometry as GeoJSONGeometry } from "geojson";

export type Geography = {
  coordinates: [number, number];
  type: "Point"; // [longitude, latitude]
};

export type Geometry = GeoJSONGeometry;
