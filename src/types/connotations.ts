export enum CONNOTATIONS {
  announcement = "announcement",
  alert = "alert",
  cta = "cta",
  info = "info",
  primary = "primary",
  success = "success",
  warning = "warning",
}

export type Connotations = keyof typeof CONNOTATIONS;
