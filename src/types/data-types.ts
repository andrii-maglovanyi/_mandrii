import { ObjectId } from "mongodb";
import { Language } from "./language";

export interface NameValueObject<T> {
  name: string;
  value: T;
}

export type Status = "active" | "pending" | "inactive";

interface GeoLocation {
  type: "Point";
  coordinates: [number, number];
}

export interface PlaceData {
  geo: GeoLocation;
  images: Array<string>;
  category: string;
  name: string;
  address?: string;
  description: Record<Language["lang"], string>;
  email?: string;
  phone?: Array<string>;
  web?: string;
  slug: string;
  status: Status;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaceEntry extends PlaceData {
  _id: ObjectId;
}
