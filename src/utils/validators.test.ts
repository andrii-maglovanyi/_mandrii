import { isEmail, isNotEmpty } from "./validators";

describe("Validators", () => {
  describe("isEmail", () => {
    test("validation should pass", () => {
      expect(isEmail("example@example.com")).toBeTruthy();
      expect(isEmail("example+1@example.com")).toBeTruthy();
    });

    test("validation should be rejected", () => {
      expect(isEmail("example.com")).toBeFalsy();
      expect(isEmail("example@")).toBeFalsy();
      expect(isEmail("@example.com")).toBeFalsy();
      expect(isEmail("example @example.com")).toBeFalsy();
      expect(isEmail("example@example")).toBeFalsy();
    });
  });

  describe("isNotEmpty", () => {
    test("validation should pass", () => {
      expect(isNotEmpty({})).toBeTruthy();
      expect(isNotEmpty({ hey: 1 })).toBeTruthy();
      expect(isNotEmpty([])).toBeTruthy();
      expect(isNotEmpty([1, 2])).toBeTruthy();
      expect(isNotEmpty(0)).toBeTruthy();
      expect(isNotEmpty("")).toBeTruthy();
      expect(isNotEmpty("abc123")).toBeTruthy();
    });

    test("validation should be rejected", () => {
      expect(isNotEmpty(null)).toBeFalsy();
      expect(isNotEmpty(undefined)).toBeFalsy();
    });
  });
});
