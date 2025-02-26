export enum CONNOTATIONS {
  alert = "alert",
  cta = "cta",
  primary = "primary",
  success = "success",
}

export type Connotations = keyof typeof CONNOTATIONS;
