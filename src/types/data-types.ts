export interface NameValueObject<T> {
  name: string;
  value: T;
}

export type Status = "active" | "pending" | "archived" | "rejected";
