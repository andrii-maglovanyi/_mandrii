import { Geography } from './geography';
import { Geometry } from './geography';
import { Json } from './json';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  geography: { input: Geography; output: Geography; }
  geometry: { input: Geometry; output: Geometry; }
  jsonb: { input: Json; output: Json; }
  timestamptz: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Geography_Cast_Exp = {
  geometry?: InputMaybe<Geometry_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast?: InputMaybe<Geography_Cast_Exp>;
  _eq?: InputMaybe<Scalars['geography']['input']>;
  _gt?: InputMaybe<Scalars['geography']['input']>;
  _gte?: InputMaybe<Scalars['geography']['input']>;
  _in?: InputMaybe<Array<Scalars['geography']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['geography']['input']>;
  _lte?: InputMaybe<Scalars['geography']['input']>;
  _neq?: InputMaybe<Scalars['geography']['input']>;
  _nin?: InputMaybe<Array<Scalars['geography']['input']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within?: InputMaybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: InputMaybe<Scalars['geography']['input']>;
};

export type Geometry_Cast_Exp = {
  geography?: InputMaybe<Geography_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast?: InputMaybe<Geometry_Cast_Exp>;
  _eq?: InputMaybe<Scalars['geometry']['input']>;
  _gt?: InputMaybe<Scalars['geometry']['input']>;
  _gte?: InputMaybe<Scalars['geometry']['input']>;
  _in?: InputMaybe<Array<Scalars['geometry']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['geometry']['input']>;
  _lte?: InputMaybe<Scalars['geometry']['input']>;
  _neq?: InputMaybe<Scalars['geometry']['input']>;
  _nin?: InputMaybe<Array<Scalars['geometry']['input']>>;
  /** is the column within a given 3D distance from the given geometry value */
  _st_3d_d_within?: InputMaybe<St_D_Within_Input>;
  /** does the column spatially intersect the given geometry value in 3D */
  _st_3d_intersects?: InputMaybe<Scalars['geometry']['input']>;
  /** does the column contain the given geometry value */
  _st_contains?: InputMaybe<Scalars['geometry']['input']>;
  /** does the column cross the given geometry value */
  _st_crosses?: InputMaybe<Scalars['geometry']['input']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within?: InputMaybe<St_D_Within_Input>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals?: InputMaybe<Scalars['geometry']['input']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects?: InputMaybe<Scalars['geometry']['input']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps?: InputMaybe<Scalars['geometry']['input']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches?: InputMaybe<Scalars['geometry']['input']>;
  /** is the column contained in the given geometry value */
  _st_within?: InputMaybe<Scalars['geometry']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "ukrainian_location_categories" */
  delete_ukrainian_location_categories?: Maybe<Ukrainian_Location_Categories_Mutation_Response>;
  /** delete single row from the table: "ukrainian_location_categories" */
  delete_ukrainian_location_categories_by_pk?: Maybe<Ukrainian_Location_Categories>;
  /** delete data from the table: "ukrainian_location_statuses" */
  delete_ukrainian_location_statuses?: Maybe<Ukrainian_Location_Statuses_Mutation_Response>;
  /** delete single row from the table: "ukrainian_location_statuses" */
  delete_ukrainian_location_statuses_by_pk?: Maybe<Ukrainian_Location_Statuses>;
  /** delete data from the table: "ukrainian_locations" */
  delete_ukrainian_locations?: Maybe<Ukrainian_Locations_Mutation_Response>;
  /** delete single row from the table: "ukrainian_locations" */
  delete_ukrainian_locations_by_pk?: Maybe<Ukrainian_Locations>;
  /** delete data from the table: "user_roles" */
  delete_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** delete single row from the table: "user_roles" */
  delete_user_roles_by_pk?: Maybe<User_Roles>;
  /** delete data from the table: "user_statuses" */
  delete_user_statuses?: Maybe<User_Statuses_Mutation_Response>;
  /** delete single row from the table: "user_statuses" */
  delete_user_statuses_by_pk?: Maybe<User_Statuses>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "ukrainian_location_categories" */
  insert_ukrainian_location_categories?: Maybe<Ukrainian_Location_Categories_Mutation_Response>;
  /** insert a single row into the table: "ukrainian_location_categories" */
  insert_ukrainian_location_categories_one?: Maybe<Ukrainian_Location_Categories>;
  /** insert data into the table: "ukrainian_location_statuses" */
  insert_ukrainian_location_statuses?: Maybe<Ukrainian_Location_Statuses_Mutation_Response>;
  /** insert a single row into the table: "ukrainian_location_statuses" */
  insert_ukrainian_location_statuses_one?: Maybe<Ukrainian_Location_Statuses>;
  /** insert data into the table: "ukrainian_locations" */
  insert_ukrainian_locations?: Maybe<Ukrainian_Locations_Mutation_Response>;
  /** insert a single row into the table: "ukrainian_locations" */
  insert_ukrainian_locations_one?: Maybe<Ukrainian_Locations>;
  /** insert data into the table: "user_roles" */
  insert_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** insert a single row into the table: "user_roles" */
  insert_user_roles_one?: Maybe<User_Roles>;
  /** insert data into the table: "user_statuses" */
  insert_user_statuses?: Maybe<User_Statuses_Mutation_Response>;
  /** insert a single row into the table: "user_statuses" */
  insert_user_statuses_one?: Maybe<User_Statuses>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "ukrainian_location_categories" */
  update_ukrainian_location_categories?: Maybe<Ukrainian_Location_Categories_Mutation_Response>;
  /** update single row of the table: "ukrainian_location_categories" */
  update_ukrainian_location_categories_by_pk?: Maybe<Ukrainian_Location_Categories>;
  /** update multiples rows of table: "ukrainian_location_categories" */
  update_ukrainian_location_categories_many?: Maybe<Array<Maybe<Ukrainian_Location_Categories_Mutation_Response>>>;
  /** update data of the table: "ukrainian_location_statuses" */
  update_ukrainian_location_statuses?: Maybe<Ukrainian_Location_Statuses_Mutation_Response>;
  /** update single row of the table: "ukrainian_location_statuses" */
  update_ukrainian_location_statuses_by_pk?: Maybe<Ukrainian_Location_Statuses>;
  /** update multiples rows of table: "ukrainian_location_statuses" */
  update_ukrainian_location_statuses_many?: Maybe<Array<Maybe<Ukrainian_Location_Statuses_Mutation_Response>>>;
  /** update data of the table: "ukrainian_locations" */
  update_ukrainian_locations?: Maybe<Ukrainian_Locations_Mutation_Response>;
  /** update single row of the table: "ukrainian_locations" */
  update_ukrainian_locations_by_pk?: Maybe<Ukrainian_Locations>;
  /** update multiples rows of table: "ukrainian_locations" */
  update_ukrainian_locations_many?: Maybe<Array<Maybe<Ukrainian_Locations_Mutation_Response>>>;
  /** update data of the table: "user_roles" */
  update_user_roles?: Maybe<User_Roles_Mutation_Response>;
  /** update single row of the table: "user_roles" */
  update_user_roles_by_pk?: Maybe<User_Roles>;
  /** update multiples rows of table: "user_roles" */
  update_user_roles_many?: Maybe<Array<Maybe<User_Roles_Mutation_Response>>>;
  /** update data of the table: "user_statuses" */
  update_user_statuses?: Maybe<User_Statuses_Mutation_Response>;
  /** update single row of the table: "user_statuses" */
  update_user_statuses_by_pk?: Maybe<User_Statuses>;
  /** update multiples rows of table: "user_statuses" */
  update_user_statuses_many?: Maybe<Array<Maybe<User_Statuses_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_Location_CategoriesArgs = {
  where: Ukrainian_Location_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_Location_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_Location_StatusesArgs = {
  where: Ukrainian_Location_Statuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_Location_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_LocationsArgs = {
  where: Ukrainian_Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ukrainian_Locations_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_RolesArgs = {
  where: User_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Roles_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_StatusesArgs = {
  where: User_Statuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_Location_CategoriesArgs = {
  objects: Array<Ukrainian_Location_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Ukrainian_Location_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_Location_Categories_OneArgs = {
  object: Ukrainian_Location_Categories_Insert_Input;
  on_conflict?: InputMaybe<Ukrainian_Location_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_Location_StatusesArgs = {
  objects: Array<Ukrainian_Location_Statuses_Insert_Input>;
  on_conflict?: InputMaybe<Ukrainian_Location_Statuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_Location_Statuses_OneArgs = {
  object: Ukrainian_Location_Statuses_Insert_Input;
  on_conflict?: InputMaybe<Ukrainian_Location_Statuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_LocationsArgs = {
  objects: Array<Ukrainian_Locations_Insert_Input>;
  on_conflict?: InputMaybe<Ukrainian_Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ukrainian_Locations_OneArgs = {
  object: Ukrainian_Locations_Insert_Input;
  on_conflict?: InputMaybe<Ukrainian_Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_RolesArgs = {
  objects: Array<User_Roles_Insert_Input>;
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Roles_OneArgs = {
  object: User_Roles_Insert_Input;
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_StatusesArgs = {
  objects: Array<User_Statuses_Insert_Input>;
  on_conflict?: InputMaybe<User_Statuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Statuses_OneArgs = {
  object: User_Statuses_Insert_Input;
  on_conflict?: InputMaybe<User_Statuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_CategoriesArgs = {
  _set?: InputMaybe<Ukrainian_Location_Categories_Set_Input>;
  where: Ukrainian_Location_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_Categories_By_PkArgs = {
  _set?: InputMaybe<Ukrainian_Location_Categories_Set_Input>;
  pk_columns: Ukrainian_Location_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_Categories_ManyArgs = {
  updates: Array<Ukrainian_Location_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_StatusesArgs = {
  _set?: InputMaybe<Ukrainian_Location_Statuses_Set_Input>;
  where: Ukrainian_Location_Statuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_Statuses_By_PkArgs = {
  _set?: InputMaybe<Ukrainian_Location_Statuses_Set_Input>;
  pk_columns: Ukrainian_Location_Statuses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Location_Statuses_ManyArgs = {
  updates: Array<Ukrainian_Location_Statuses_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_LocationsArgs = {
  _append?: InputMaybe<Ukrainian_Locations_Append_Input>;
  _delete_at_path?: InputMaybe<Ukrainian_Locations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Ukrainian_Locations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Ukrainian_Locations_Delete_Key_Input>;
  _inc?: InputMaybe<Ukrainian_Locations_Inc_Input>;
  _prepend?: InputMaybe<Ukrainian_Locations_Prepend_Input>;
  _set?: InputMaybe<Ukrainian_Locations_Set_Input>;
  where: Ukrainian_Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Locations_By_PkArgs = {
  _append?: InputMaybe<Ukrainian_Locations_Append_Input>;
  _delete_at_path?: InputMaybe<Ukrainian_Locations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Ukrainian_Locations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Ukrainian_Locations_Delete_Key_Input>;
  _inc?: InputMaybe<Ukrainian_Locations_Inc_Input>;
  _prepend?: InputMaybe<Ukrainian_Locations_Prepend_Input>;
  _set?: InputMaybe<Ukrainian_Locations_Set_Input>;
  pk_columns: Ukrainian_Locations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ukrainian_Locations_ManyArgs = {
  updates: Array<Ukrainian_Locations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_RolesArgs = {
  _set?: InputMaybe<User_Roles_Set_Input>;
  where: User_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Roles_By_PkArgs = {
  _set?: InputMaybe<User_Roles_Set_Input>;
  pk_columns: User_Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Roles_ManyArgs = {
  updates: Array<User_Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_StatusesArgs = {
  _set?: InputMaybe<User_Statuses_Set_Input>;
  where: User_Statuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Statuses_By_PkArgs = {
  _set?: InputMaybe<User_Statuses_Set_Input>;
  pk_columns: User_Statuses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Statuses_ManyArgs = {
  updates: Array<User_Statuses_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "ukrainian_location_categories" */
  ukrainian_location_categories: Array<Ukrainian_Location_Categories>;
  /** fetch aggregated fields from the table: "ukrainian_location_categories" */
  ukrainian_location_categories_aggregate: Ukrainian_Location_Categories_Aggregate;
  /** fetch data from the table: "ukrainian_location_categories" using primary key columns */
  ukrainian_location_categories_by_pk?: Maybe<Ukrainian_Location_Categories>;
  /** fetch data from the table: "ukrainian_location_statuses" */
  ukrainian_location_statuses: Array<Ukrainian_Location_Statuses>;
  /** fetch aggregated fields from the table: "ukrainian_location_statuses" */
  ukrainian_location_statuses_aggregate: Ukrainian_Location_Statuses_Aggregate;
  /** fetch data from the table: "ukrainian_location_statuses" using primary key columns */
  ukrainian_location_statuses_by_pk?: Maybe<Ukrainian_Location_Statuses>;
  /** An array relationship */
  ukrainian_locations: Array<Ukrainian_Locations>;
  /** An aggregate relationship */
  ukrainian_locations_aggregate: Ukrainian_Locations_Aggregate;
  /** fetch data from the table: "ukrainian_locations" using primary key columns */
  ukrainian_locations_by_pk?: Maybe<Ukrainian_Locations>;
  /** fetch data from the table: "user_roles" */
  user_roles: Array<User_Roles>;
  /** fetch aggregated fields from the table: "user_roles" */
  user_roles_aggregate: User_Roles_Aggregate;
  /** fetch data from the table: "user_roles" using primary key columns */
  user_roles_by_pk?: Maybe<User_Roles>;
  /** fetch data from the table: "user_statuses" */
  user_statuses: Array<User_Statuses>;
  /** fetch aggregated fields from the table: "user_statuses" */
  user_statuses_aggregate: User_Statuses_Aggregate;
  /** fetch data from the table: "user_statuses" using primary key columns */
  user_statuses_by_pk?: Maybe<User_Statuses>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootUkrainian_Location_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Categories_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};


export type Query_RootUkrainian_Location_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Categories_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};


export type Query_RootUkrainian_Location_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootUkrainian_Location_StatusesArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Statuses_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};


export type Query_RootUkrainian_Location_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Statuses_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};


export type Query_RootUkrainian_Location_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootUkrainian_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


export type Query_RootUkrainian_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


export type Query_RootUkrainian_Locations_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Query_RootUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Query_RootUser_Roles_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootUser_StatusesArgs = {
  distinct_on?: InputMaybe<Array<User_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Statuses_Order_By>>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};


export type Query_RootUser_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Statuses_Order_By>>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};


export type Query_RootUser_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int']['input'];
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float']['input'];
  from: Scalars['geography']['input'];
  use_spheroid?: InputMaybe<Scalars['Boolean']['input']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float']['input'];
  from: Scalars['geometry']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "ukrainian_location_categories" */
  ukrainian_location_categories: Array<Ukrainian_Location_Categories>;
  /** fetch aggregated fields from the table: "ukrainian_location_categories" */
  ukrainian_location_categories_aggregate: Ukrainian_Location_Categories_Aggregate;
  /** fetch data from the table: "ukrainian_location_categories" using primary key columns */
  ukrainian_location_categories_by_pk?: Maybe<Ukrainian_Location_Categories>;
  /** fetch data from the table in a streaming manner: "ukrainian_location_categories" */
  ukrainian_location_categories_stream: Array<Ukrainian_Location_Categories>;
  /** fetch data from the table: "ukrainian_location_statuses" */
  ukrainian_location_statuses: Array<Ukrainian_Location_Statuses>;
  /** fetch aggregated fields from the table: "ukrainian_location_statuses" */
  ukrainian_location_statuses_aggregate: Ukrainian_Location_Statuses_Aggregate;
  /** fetch data from the table: "ukrainian_location_statuses" using primary key columns */
  ukrainian_location_statuses_by_pk?: Maybe<Ukrainian_Location_Statuses>;
  /** fetch data from the table in a streaming manner: "ukrainian_location_statuses" */
  ukrainian_location_statuses_stream: Array<Ukrainian_Location_Statuses>;
  /** An array relationship */
  ukrainian_locations: Array<Ukrainian_Locations>;
  /** An aggregate relationship */
  ukrainian_locations_aggregate: Ukrainian_Locations_Aggregate;
  /** fetch data from the table: "ukrainian_locations" using primary key columns */
  ukrainian_locations_by_pk?: Maybe<Ukrainian_Locations>;
  /** fetch data from the table in a streaming manner: "ukrainian_locations" */
  ukrainian_locations_stream: Array<Ukrainian_Locations>;
  /** fetch data from the table: "user_roles" */
  user_roles: Array<User_Roles>;
  /** fetch aggregated fields from the table: "user_roles" */
  user_roles_aggregate: User_Roles_Aggregate;
  /** fetch data from the table: "user_roles" using primary key columns */
  user_roles_by_pk?: Maybe<User_Roles>;
  /** fetch data from the table in a streaming manner: "user_roles" */
  user_roles_stream: Array<User_Roles>;
  /** fetch data from the table: "user_statuses" */
  user_statuses: Array<User_Statuses>;
  /** fetch aggregated fields from the table: "user_statuses" */
  user_statuses_aggregate: User_Statuses_Aggregate;
  /** fetch data from the table: "user_statuses" using primary key columns */
  user_statuses_by_pk?: Maybe<User_Statuses>;
  /** fetch data from the table in a streaming manner: "user_statuses" */
  user_statuses_stream: Array<User_Statuses>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootUkrainian_Location_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Categories_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};


export type Subscription_RootUkrainian_Location_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Categories_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};


export type Subscription_RootUkrainian_Location_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootUkrainian_Location_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ukrainian_Location_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};


export type Subscription_RootUkrainian_Location_StatusesArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Statuses_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};


export type Subscription_RootUkrainian_Location_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Location_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Location_Statuses_Order_By>>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};


export type Subscription_RootUkrainian_Location_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootUkrainian_Location_Statuses_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ukrainian_Location_Statuses_Stream_Cursor_Input>>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};


export type Subscription_RootUkrainian_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


export type Subscription_RootUkrainian_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


export type Subscription_RootUkrainian_Locations_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUkrainian_Locations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ukrainian_Locations_Stream_Cursor_Input>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


export type Subscription_RootUser_RolesArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUser_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Roles_Order_By>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUser_Roles_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootUser_Roles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Roles_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};


export type Subscription_RootUser_StatusesArgs = {
  distinct_on?: InputMaybe<Array<User_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Statuses_Order_By>>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};


export type Subscription_RootUser_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Statuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Statuses_Order_By>>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};


export type Subscription_RootUser_Statuses_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootUser_Statuses_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Statuses_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "ukrainian_location_categories" */
export type Ukrainian_Location_Categories = {
  __typename?: 'ukrainian_location_categories';
  /** An array relationship */
  ukrainian_locations: Array<Ukrainian_Locations>;
  /** An aggregate relationship */
  ukrainian_locations_aggregate: Ukrainian_Locations_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "ukrainian_location_categories" */
export type Ukrainian_Location_CategoriesUkrainian_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


/** columns and relationships of "ukrainian_location_categories" */
export type Ukrainian_Location_CategoriesUkrainian_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};

/** aggregated selection of "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Aggregate = {
  __typename?: 'ukrainian_location_categories_aggregate';
  aggregate?: Maybe<Ukrainian_Location_Categories_Aggregate_Fields>;
  nodes: Array<Ukrainian_Location_Categories>;
};

/** aggregate fields of "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Aggregate_Fields = {
  __typename?: 'ukrainian_location_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Ukrainian_Location_Categories_Max_Fields>;
  min?: Maybe<Ukrainian_Location_Categories_Min_Fields>;
};


/** aggregate fields of "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ukrainian_Location_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ukrainian_location_categories". All fields are combined with a logical 'AND'. */
export type Ukrainian_Location_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Ukrainian_Location_Categories_Bool_Exp>>;
  _not?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Ukrainian_Location_Categories_Bool_Exp>>;
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ukrainian_location_categories" */
export enum Ukrainian_Location_Categories_Constraint {
  /** unique or primary key constraint on columns "value" */
  UkrainianLocationCategoriesPkey = 'ukrainian_location_categories_pkey'
}

export enum Ukrainian_Location_Categories_Enum {
  Cafe = 'CAFE',
  Church = 'CHURCH',
  Club = 'CLUB',
  DentalClinic = 'DENTAL_CLINIC',
  GroceryStore = 'GROCERY_STORE',
  Library = 'LIBRARY',
  Restaurant = 'RESTAURANT',
  School = 'SCHOOL'
}

/** Boolean expression to compare columns of type "ukrainian_location_categories_enum". All fields are combined with logical 'AND'. */
export type Ukrainian_Location_Categories_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Ukrainian_Location_Categories_Enum>;
  _in?: InputMaybe<Array<Ukrainian_Location_Categories_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Ukrainian_Location_Categories_Enum>;
  _nin?: InputMaybe<Array<Ukrainian_Location_Categories_Enum>>;
};

/** input type for inserting data into table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Insert_Input = {
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Ukrainian_Location_Categories_Max_Fields = {
  __typename?: 'ukrainian_location_categories_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Ukrainian_Location_Categories_Min_Fields = {
  __typename?: 'ukrainian_location_categories_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Mutation_Response = {
  __typename?: 'ukrainian_location_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ukrainian_Location_Categories>;
};

/** input type for inserting object relation for remote table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Obj_Rel_Insert_Input = {
  data: Ukrainian_Location_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ukrainian_Location_Categories_On_Conflict>;
};

/** on_conflict condition type for table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_On_Conflict = {
  constraint: Ukrainian_Location_Categories_Constraint;
  update_columns?: Array<Ukrainian_Location_Categories_Update_Column>;
  where?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "ukrainian_location_categories". */
export type Ukrainian_Location_Categories_Order_By = {
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ukrainian_location_categories */
export type Ukrainian_Location_Categories_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "ukrainian_location_categories" */
export enum Ukrainian_Location_Categories_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "ukrainian_location_categories" */
export type Ukrainian_Location_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ukrainian_Location_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ukrainian_Location_Categories_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "ukrainian_location_categories" */
export enum Ukrainian_Location_Categories_Update_Column {
  /** column name */
  Value = 'value'
}

export type Ukrainian_Location_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ukrainian_Location_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ukrainian_Location_Categories_Bool_Exp;
};

/** columns and relationships of "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses = {
  __typename?: 'ukrainian_location_statuses';
  /** An array relationship */
  ukrainian_locations: Array<Ukrainian_Locations>;
  /** An aggregate relationship */
  ukrainian_locations_aggregate: Ukrainian_Locations_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "ukrainian_location_statuses" */
export type Ukrainian_Location_StatusesUkrainian_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


/** columns and relationships of "ukrainian_location_statuses" */
export type Ukrainian_Location_StatusesUkrainian_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};

/** aggregated selection of "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Aggregate = {
  __typename?: 'ukrainian_location_statuses_aggregate';
  aggregate?: Maybe<Ukrainian_Location_Statuses_Aggregate_Fields>;
  nodes: Array<Ukrainian_Location_Statuses>;
};

/** aggregate fields of "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Aggregate_Fields = {
  __typename?: 'ukrainian_location_statuses_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Ukrainian_Location_Statuses_Max_Fields>;
  min?: Maybe<Ukrainian_Location_Statuses_Min_Fields>;
};


/** aggregate fields of "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ukrainian_Location_Statuses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ukrainian_location_statuses". All fields are combined with a logical 'AND'. */
export type Ukrainian_Location_Statuses_Bool_Exp = {
  _and?: InputMaybe<Array<Ukrainian_Location_Statuses_Bool_Exp>>;
  _not?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
  _or?: InputMaybe<Array<Ukrainian_Location_Statuses_Bool_Exp>>;
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ukrainian_location_statuses" */
export enum Ukrainian_Location_Statuses_Constraint {
  /** unique or primary key constraint on columns "value" */
  UkrainianLocationStatusesPkey = 'ukrainian_location_statuses_pkey'
}

export enum Ukrainian_Location_Statuses_Enum {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Boolean expression to compare columns of type "ukrainian_location_statuses_enum". All fields are combined with logical 'AND'. */
export type Ukrainian_Location_Statuses_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Ukrainian_Location_Statuses_Enum>;
  _in?: InputMaybe<Array<Ukrainian_Location_Statuses_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Ukrainian_Location_Statuses_Enum>;
  _nin?: InputMaybe<Array<Ukrainian_Location_Statuses_Enum>>;
};

/** input type for inserting data into table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Insert_Input = {
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Ukrainian_Location_Statuses_Max_Fields = {
  __typename?: 'ukrainian_location_statuses_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Ukrainian_Location_Statuses_Min_Fields = {
  __typename?: 'ukrainian_location_statuses_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Mutation_Response = {
  __typename?: 'ukrainian_location_statuses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ukrainian_Location_Statuses>;
};

/** input type for inserting object relation for remote table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Obj_Rel_Insert_Input = {
  data: Ukrainian_Location_Statuses_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ukrainian_Location_Statuses_On_Conflict>;
};

/** on_conflict condition type for table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_On_Conflict = {
  constraint: Ukrainian_Location_Statuses_Constraint;
  update_columns?: Array<Ukrainian_Location_Statuses_Update_Column>;
  where?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
};

/** Ordering options when selecting data from "ukrainian_location_statuses". */
export type Ukrainian_Location_Statuses_Order_By = {
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ukrainian_location_statuses */
export type Ukrainian_Location_Statuses_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "ukrainian_location_statuses" */
export enum Ukrainian_Location_Statuses_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "ukrainian_location_statuses" */
export type Ukrainian_Location_Statuses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ukrainian_Location_Statuses_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ukrainian_Location_Statuses_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "ukrainian_location_statuses" */
export enum Ukrainian_Location_Statuses_Update_Column {
  /** column name */
  Value = 'value'
}

export type Ukrainian_Location_Statuses_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ukrainian_Location_Statuses_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ukrainian_Location_Statuses_Bool_Exp;
};

/** columns and relationships of "ukrainian_locations" */
export type Ukrainian_Locations = {
  __typename?: 'ukrainian_locations';
  address: Scalars['String']['output'];
  category: Ukrainian_Location_Categories_Enum;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description_en?: Maybe<Scalars['String']['output']>;
  description_uk?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Scalars['String']['output']>>;
  geo: Scalars['geography']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  phone_numbers?: Maybe<Array<Scalars['String']['output']>>;
  slug: Scalars['String']['output'];
  social_links?: Maybe<Scalars['jsonb']['output']>;
  status: Ukrainian_Location_Statuses_Enum;
  /** An object relationship */
  ukrainian_location_category: Ukrainian_Location_Categories;
  /** An object relationship */
  ukrainian_location_status: Ukrainian_Location_Statuses;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "ukrainian_locations" */
export type Ukrainian_LocationsSocial_LinksArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "ukrainian_locations" */
export type Ukrainian_Locations_Aggregate = {
  __typename?: 'ukrainian_locations_aggregate';
  aggregate?: Maybe<Ukrainian_Locations_Aggregate_Fields>;
  nodes: Array<Ukrainian_Locations>;
};

export type Ukrainian_Locations_Aggregate_Bool_Exp = {
  count?: InputMaybe<Ukrainian_Locations_Aggregate_Bool_Exp_Count>;
};

export type Ukrainian_Locations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "ukrainian_locations" */
export type Ukrainian_Locations_Aggregate_Fields = {
  __typename?: 'ukrainian_locations_aggregate_fields';
  avg?: Maybe<Ukrainian_Locations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Ukrainian_Locations_Max_Fields>;
  min?: Maybe<Ukrainian_Locations_Min_Fields>;
  stddev?: Maybe<Ukrainian_Locations_Stddev_Fields>;
  stddev_pop?: Maybe<Ukrainian_Locations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ukrainian_Locations_Stddev_Samp_Fields>;
  sum?: Maybe<Ukrainian_Locations_Sum_Fields>;
  var_pop?: Maybe<Ukrainian_Locations_Var_Pop_Fields>;
  var_samp?: Maybe<Ukrainian_Locations_Var_Samp_Fields>;
  variance?: Maybe<Ukrainian_Locations_Variance_Fields>;
};


/** aggregate fields of "ukrainian_locations" */
export type Ukrainian_Locations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "ukrainian_locations" */
export type Ukrainian_Locations_Aggregate_Order_By = {
  avg?: InputMaybe<Ukrainian_Locations_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ukrainian_Locations_Max_Order_By>;
  min?: InputMaybe<Ukrainian_Locations_Min_Order_By>;
  stddev?: InputMaybe<Ukrainian_Locations_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Ukrainian_Locations_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Ukrainian_Locations_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Ukrainian_Locations_Sum_Order_By>;
  var_pop?: InputMaybe<Ukrainian_Locations_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Ukrainian_Locations_Var_Samp_Order_By>;
  variance?: InputMaybe<Ukrainian_Locations_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Ukrainian_Locations_Append_Input = {
  social_links?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "ukrainian_locations" */
export type Ukrainian_Locations_Arr_Rel_Insert_Input = {
  data: Array<Ukrainian_Locations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ukrainian_Locations_On_Conflict>;
};

/** aggregate avg on columns */
export type Ukrainian_Locations_Avg_Fields = {
  __typename?: 'ukrainian_locations_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ukrainian_locations". All fields are combined with a logical 'AND'. */
export type Ukrainian_Locations_Bool_Exp = {
  _and?: InputMaybe<Array<Ukrainian_Locations_Bool_Exp>>;
  _not?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
  _or?: InputMaybe<Array<Ukrainian_Locations_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Ukrainian_Location_Categories_Enum_Comparison_Exp>;
  city?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description_en?: InputMaybe<String_Comparison_Exp>;
  description_uk?: InputMaybe<String_Comparison_Exp>;
  emails?: InputMaybe<String_Array_Comparison_Exp>;
  geo?: InputMaybe<Geography_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  images?: InputMaybe<String_Array_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone_numbers?: InputMaybe<String_Array_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  social_links?: InputMaybe<Jsonb_Comparison_Exp>;
  status?: InputMaybe<Ukrainian_Location_Statuses_Enum_Comparison_Exp>;
  ukrainian_location_category?: InputMaybe<Ukrainian_Location_Categories_Bool_Exp>;
  ukrainian_location_status?: InputMaybe<Ukrainian_Location_Statuses_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ukrainian_locations" */
export enum Ukrainian_Locations_Constraint {
  /** unique or primary key constraint on columns "id" */
  UkrainianLocationsPkey = 'ukrainian_locations_pkey',
  /** unique or primary key constraint on columns "slug" */
  UkrainianLocationsSlugKey = 'ukrainian_locations_slug_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Ukrainian_Locations_Delete_At_Path_Input = {
  social_links?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Ukrainian_Locations_Delete_Elem_Input = {
  social_links?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Ukrainian_Locations_Delete_Key_Input = {
  social_links?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "ukrainian_locations" */
export type Ukrainian_Locations_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "ukrainian_locations" */
export type Ukrainian_Locations_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Ukrainian_Location_Categories_Enum>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description_en?: InputMaybe<Scalars['String']['input']>;
  description_uk?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  geo?: InputMaybe<Scalars['geography']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_numbers?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  social_links?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Ukrainian_Location_Statuses_Enum>;
  ukrainian_location_category?: InputMaybe<Ukrainian_Location_Categories_Obj_Rel_Insert_Input>;
  ukrainian_location_status?: InputMaybe<Ukrainian_Location_Statuses_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Ukrainian_Locations_Max_Fields = {
  __typename?: 'ukrainian_locations_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description_en?: Maybe<Scalars['String']['output']>;
  description_uk?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  phone_numbers?: Maybe<Array<Scalars['String']['output']>>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  city?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description_en?: InputMaybe<Order_By>;
  description_uk?: InputMaybe<Order_By>;
  emails?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  images?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_numbers?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ukrainian_Locations_Min_Fields = {
  __typename?: 'ukrainian_locations_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description_en?: Maybe<Scalars['String']['output']>;
  description_uk?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  phone_numbers?: Maybe<Array<Scalars['String']['output']>>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  city?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description_en?: InputMaybe<Order_By>;
  description_uk?: InputMaybe<Order_By>;
  emails?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  images?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_numbers?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ukrainian_locations" */
export type Ukrainian_Locations_Mutation_Response = {
  __typename?: 'ukrainian_locations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ukrainian_Locations>;
};

/** on_conflict condition type for table "ukrainian_locations" */
export type Ukrainian_Locations_On_Conflict = {
  constraint: Ukrainian_Locations_Constraint;
  update_columns?: Array<Ukrainian_Locations_Update_Column>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};

/** Ordering options when selecting data from "ukrainian_locations". */
export type Ukrainian_Locations_Order_By = {
  address?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  city?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description_en?: InputMaybe<Order_By>;
  description_uk?: InputMaybe<Order_By>;
  emails?: InputMaybe<Order_By>;
  geo?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  images?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone_numbers?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  social_links?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  ukrainian_location_category?: InputMaybe<Ukrainian_Location_Categories_Order_By>;
  ukrainian_location_status?: InputMaybe<Ukrainian_Location_Statuses_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ukrainian_locations */
export type Ukrainian_Locations_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Ukrainian_Locations_Prepend_Input = {
  social_links?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "ukrainian_locations" */
export enum Ukrainian_Locations_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Category = 'category',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DescriptionEn = 'description_en',
  /** column name */
  DescriptionUk = 'description_uk',
  /** column name */
  Emails = 'emails',
  /** column name */
  Geo = 'geo',
  /** column name */
  Id = 'id',
  /** column name */
  Images = 'images',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneNumbers = 'phone_numbers',
  /** column name */
  Slug = 'slug',
  /** column name */
  SocialLinks = 'social_links',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "ukrainian_locations" */
export type Ukrainian_Locations_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Ukrainian_Location_Categories_Enum>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description_en?: InputMaybe<Scalars['String']['input']>;
  description_uk?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  geo?: InputMaybe<Scalars['geography']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_numbers?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  social_links?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Ukrainian_Location_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Ukrainian_Locations_Stddev_Fields = {
  __typename?: 'ukrainian_locations_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Ukrainian_Locations_Stddev_Pop_Fields = {
  __typename?: 'ukrainian_locations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Ukrainian_Locations_Stddev_Samp_Fields = {
  __typename?: 'ukrainian_locations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ukrainian_locations" */
export type Ukrainian_Locations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ukrainian_Locations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ukrainian_Locations_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Ukrainian_Location_Categories_Enum>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description_en?: InputMaybe<Scalars['String']['input']>;
  description_uk?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  geo?: InputMaybe<Scalars['geography']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_numbers?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  social_links?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Ukrainian_Location_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Ukrainian_Locations_Sum_Fields = {
  __typename?: 'ukrainian_locations_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** update columns of table "ukrainian_locations" */
export enum Ukrainian_Locations_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Category = 'category',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DescriptionEn = 'description_en',
  /** column name */
  DescriptionUk = 'description_uk',
  /** column name */
  Emails = 'emails',
  /** column name */
  Geo = 'geo',
  /** column name */
  Id = 'id',
  /** column name */
  Images = 'images',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneNumbers = 'phone_numbers',
  /** column name */
  Slug = 'slug',
  /** column name */
  SocialLinks = 'social_links',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Website = 'website'
}

export type Ukrainian_Locations_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Ukrainian_Locations_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Ukrainian_Locations_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Ukrainian_Locations_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Ukrainian_Locations_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Ukrainian_Locations_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Ukrainian_Locations_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ukrainian_Locations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ukrainian_Locations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Ukrainian_Locations_Var_Pop_Fields = {
  __typename?: 'ukrainian_locations_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Ukrainian_Locations_Var_Samp_Fields = {
  __typename?: 'ukrainian_locations_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Ukrainian_Locations_Variance_Fields = {
  __typename?: 'ukrainian_locations_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "ukrainian_locations" */
export type Ukrainian_Locations_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "user_roles" */
export type User_Roles = {
  __typename?: 'user_roles';
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "user_roles" */
export type User_RolesUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "user_roles" */
export type User_RolesUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "user_roles" */
export type User_Roles_Aggregate = {
  __typename?: 'user_roles_aggregate';
  aggregate?: Maybe<User_Roles_Aggregate_Fields>;
  nodes: Array<User_Roles>;
};

/** aggregate fields of "user_roles" */
export type User_Roles_Aggregate_Fields = {
  __typename?: 'user_roles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Roles_Max_Fields>;
  min?: Maybe<User_Roles_Min_Fields>;
};


/** aggregate fields of "user_roles" */
export type User_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user_roles". All fields are combined with a logical 'AND'. */
export type User_Roles_Bool_Exp = {
  _and?: InputMaybe<Array<User_Roles_Bool_Exp>>;
  _not?: InputMaybe<User_Roles_Bool_Exp>;
  _or?: InputMaybe<Array<User_Roles_Bool_Exp>>;
  users?: InputMaybe<Users_Bool_Exp>;
  users_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_roles" */
export enum User_Roles_Constraint {
  /** unique or primary key constraint on columns "value" */
  UserRolesPkey = 'user_roles_pkey'
}

export enum User_Roles_Enum {
  Admin = 'ADMIN',
  User = 'USER'
}

/** Boolean expression to compare columns of type "user_roles_enum". All fields are combined with logical 'AND'. */
export type User_Roles_Enum_Comparison_Exp = {
  _eq?: InputMaybe<User_Roles_Enum>;
  _in?: InputMaybe<Array<User_Roles_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<User_Roles_Enum>;
  _nin?: InputMaybe<Array<User_Roles_Enum>>;
};

/** input type for inserting data into table "user_roles" */
export type User_Roles_Insert_Input = {
  users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Roles_Max_Fields = {
  __typename?: 'user_roles_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Roles_Min_Fields = {
  __typename?: 'user_roles_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_roles" */
export type User_Roles_Mutation_Response = {
  __typename?: 'user_roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Roles>;
};

/** input type for inserting object relation for remote table "user_roles" */
export type User_Roles_Obj_Rel_Insert_Input = {
  data: User_Roles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Roles_On_Conflict>;
};

/** on_conflict condition type for table "user_roles" */
export type User_Roles_On_Conflict = {
  constraint: User_Roles_Constraint;
  update_columns?: Array<User_Roles_Update_Column>;
  where?: InputMaybe<User_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "user_roles". */
export type User_Roles_Order_By = {
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_roles */
export type User_Roles_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "user_roles" */
export enum User_Roles_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "user_roles" */
export type User_Roles_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "user_roles" */
export type User_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Roles_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "user_roles" */
export enum User_Roles_Update_Column {
  /** column name */
  Value = 'value'
}

export type User_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Roles_Bool_Exp;
};

/** columns and relationships of "user_statuses" */
export type User_Statuses = {
  __typename?: 'user_statuses';
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "user_statuses" */
export type User_StatusesUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "user_statuses" */
export type User_StatusesUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "user_statuses" */
export type User_Statuses_Aggregate = {
  __typename?: 'user_statuses_aggregate';
  aggregate?: Maybe<User_Statuses_Aggregate_Fields>;
  nodes: Array<User_Statuses>;
};

/** aggregate fields of "user_statuses" */
export type User_Statuses_Aggregate_Fields = {
  __typename?: 'user_statuses_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Statuses_Max_Fields>;
  min?: Maybe<User_Statuses_Min_Fields>;
};


/** aggregate fields of "user_statuses" */
export type User_Statuses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Statuses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user_statuses". All fields are combined with a logical 'AND'. */
export type User_Statuses_Bool_Exp = {
  _and?: InputMaybe<Array<User_Statuses_Bool_Exp>>;
  _not?: InputMaybe<User_Statuses_Bool_Exp>;
  _or?: InputMaybe<Array<User_Statuses_Bool_Exp>>;
  users?: InputMaybe<Users_Bool_Exp>;
  users_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_statuses" */
export enum User_Statuses_Constraint {
  /** unique or primary key constraint on columns "value" */
  UserStatusesPkey = 'user_statuses_pkey'
}

export enum User_Statuses_Enum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** Boolean expression to compare columns of type "user_statuses_enum". All fields are combined with logical 'AND'. */
export type User_Statuses_Enum_Comparison_Exp = {
  _eq?: InputMaybe<User_Statuses_Enum>;
  _in?: InputMaybe<Array<User_Statuses_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<User_Statuses_Enum>;
  _nin?: InputMaybe<Array<User_Statuses_Enum>>;
};

/** input type for inserting data into table "user_statuses" */
export type User_Statuses_Insert_Input = {
  users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Statuses_Max_Fields = {
  __typename?: 'user_statuses_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Statuses_Min_Fields = {
  __typename?: 'user_statuses_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_statuses" */
export type User_Statuses_Mutation_Response = {
  __typename?: 'user_statuses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Statuses>;
};

/** input type for inserting object relation for remote table "user_statuses" */
export type User_Statuses_Obj_Rel_Insert_Input = {
  data: User_Statuses_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Statuses_On_Conflict>;
};

/** on_conflict condition type for table "user_statuses" */
export type User_Statuses_On_Conflict = {
  constraint: User_Statuses_Constraint;
  update_columns?: Array<User_Statuses_Update_Column>;
  where?: InputMaybe<User_Statuses_Bool_Exp>;
};

/** Ordering options when selecting data from "user_statuses". */
export type User_Statuses_Order_By = {
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_statuses */
export type User_Statuses_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "user_statuses" */
export enum User_Statuses_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "user_statuses" */
export type User_Statuses_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "user_statuses" */
export type User_Statuses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Statuses_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Statuses_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "user_statuses" */
export enum User_Statuses_Update_Column {
  /** column name */
  Value = 'value'
}

export type User_Statuses_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Statuses_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Statuses_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email: Scalars['String']['output'];
  full_name: Scalars['String']['output'];
  google_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  profile_image?: Maybe<Scalars['String']['output']>;
  role: User_Roles_Enum;
  status: User_Statuses_Enum;
  /** An array relationship */
  ukrainian_locations: Array<Ukrainian_Locations>;
  /** An aggregate relationship */
  ukrainian_locations_aggregate: Ukrainian_Locations_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user_role: User_Roles;
  /** An object relationship */
  user_status: User_Statuses;
};


/** columns and relationships of "users" */
export type UsersUkrainian_LocationsArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUkrainian_Locations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ukrainian_Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ukrainian_Locations_Order_By>>;
  where?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Bool_Exp = {
  count?: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
  stddev?: InputMaybe<Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  google_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  profile_image?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<User_Roles_Enum_Comparison_Exp>;
  status?: InputMaybe<User_Statuses_Enum_Comparison_Exp>;
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Bool_Exp>;
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_role?: InputMaybe<User_Roles_Bool_Exp>;
  user_status?: InputMaybe<User_Statuses_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "google_id" */
  UsersGoogleIdKey = 'users_google_id_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<User_Roles_Enum>;
  status?: InputMaybe<User_Statuses_Enum>;
  ukrainian_locations?: InputMaybe<Ukrainian_Locations_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_role?: InputMaybe<User_Roles_Obj_Rel_Insert_Input>;
  user_status?: InputMaybe<User_Statuses_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  google_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  google_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profile_image?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  google_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  google_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profile_image?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  google_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profile_image?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  ukrainian_locations_aggregate?: InputMaybe<Ukrainian_Locations_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_role?: InputMaybe<User_Roles_Order_By>;
  user_status?: InputMaybe<User_Statuses_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FullName = 'full_name',
  /** column name */
  GoogleId = 'google_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileImage = 'profile_image',
  /** column name */
  Role = 'role',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<User_Roles_Enum>;
  status?: InputMaybe<User_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<User_Roles_Enum>;
  status?: InputMaybe<User_Statuses_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FullName = 'full_name',
  /** column name */
  GoogleId = 'google_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileImage = 'profile_image',
  /** column name */
  Role = 'role',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type GetPublicLocationsQueryVariables = Exact<{
  where: Ukrainian_Locations_Bool_Exp;
}>;


export type GetPublicLocationsQuery = { __typename?: 'query_root', ukrainian_locations: Array<{ __typename?: 'ukrainian_locations', id: number, name: string, address: string, images?: Array<string> | null, description_uk?: string | null, description_en?: string | null, geo: Geography, emails?: Array<string> | null, website?: string | null, phone_numbers?: Array<string> | null, slug: string }>, ukrainian_locations_aggregate: { __typename?: 'ukrainian_locations_aggregate', aggregate?: { __typename?: 'ukrainian_locations_aggregate_fields', count: number } | null } };

export type GetUserLocationsQueryVariables = Exact<{
  where: Ukrainian_Locations_Bool_Exp;
}>;


export type GetUserLocationsQuery = { __typename?: 'query_root', ukrainian_locations: Array<{ __typename?: 'ukrainian_locations', id: number, name: string, address: string, images?: Array<string> | null, category: Ukrainian_Location_Categories_Enum, created_at?: string | null, description_uk?: string | null, description_en?: string | null, geo: Geography, emails?: Array<string> | null, website?: string | null, phone_numbers?: Array<string> | null, slug: string }>, ukrainian_locations_aggregate: { __typename?: 'ukrainian_locations_aggregate', aggregate?: { __typename?: 'ukrainian_locations_aggregate_fields', count: number } | null } };

export type GetAdminLocationsQueryVariables = Exact<{
  where: Ukrainian_Locations_Bool_Exp;
}>;


export type GetAdminLocationsQuery = { __typename?: 'query_root', ukrainian_locations: Array<{ __typename?: 'ukrainian_locations', id: number, name: string, address: string, images?: Array<string> | null, category: Ukrainian_Location_Categories_Enum, created_at?: string | null, description_uk?: string | null, description_en?: string | null, geo: Geography, emails?: Array<string> | null, website?: string | null, phone_numbers?: Array<string> | null, status: Ukrainian_Location_Statuses_Enum, user_id?: number | null, slug: string }>, ukrainian_locations_aggregate: { __typename?: 'ukrainian_locations_aggregate', aggregate?: { __typename?: 'ukrainian_locations_aggregate_fields', count: number } | null } };

export type UpdateLocationStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  status: Ukrainian_Location_Statuses_Enum;
}>;


export type UpdateLocationStatusMutation = { __typename?: 'mutation_root', update_ukrainian_locations_by_pk?: { __typename?: 'ukrainian_locations', id: number, status: Ukrainian_Location_Statuses_Enum, updated_at?: string | null } | null };
