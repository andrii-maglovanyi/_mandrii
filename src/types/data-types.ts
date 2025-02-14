import { Language } from "./language";

export interface NameValueObject<T> {
  name: string;
  value: T;
}

export interface PlaceData {
  _id: number;
  geo: {
    coordinates: [number, number];
  };
  images: Array<string>;
  category: string;
  name: string;
  address?: string;
  description: Record<Language["lang"], string>;
  email?: string;
  phone?: Array<string>;
  web?: string;
}
