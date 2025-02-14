import { type NameValueObject } from "@/types";

export const toNameValueObject = <T>(
  option: NameValueObject<T> | T
): NameValueObject<T> => {
  if (typeof option === "string") {
    return { name: option, value: option };
  }

  if (typeof option === "number") {
    return { name: option.toString(), value: option };
  }

  return option as NameValueObject<T>;
};
