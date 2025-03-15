export type Json =
  | string
  | number
  | boolean
  | Json[]
  | { [key: string]: Json }
  | null;
