import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";

import {
  GetAdminLocationsQuery,
  GetPublicLocationsQuery,
  GetUserLocationsQuery,
  Status,
} from "@/types";

interface LocationsParams {
  category?: string;
  distance?: number;
  geo?: {
    lat: number;
    lng: number;
  };
  slug?: string;
}

const getFilter = ({ category, distance, geo, slug }: LocationsParams) => {
  const variables: { where: Record<string, unknown> } = {
    where: {},
  };

  if (slug) {
    variables.where.slug = {
      _eq: slug,
    };
  } else {
    if (geo) {
      variables.where.geo = {
        _st_d_within: {
          distance: distance,
          from: {
            coordinates: [geo.lng, geo.lat],
            type: "Point",
          },
        },
      };
    }

    if (category) {
      variables.where.category = { _eq: category };
    }
  }

  return { variables };
};

const GET_PUBLIC_LOCATIONS = gql`
  query GetPublicLocations($where: ukrainian_locations_bool_exp!) {
    ukrainian_locations(where: $where) {
      id
      name
      address
      images
      description_uk
      description_en
      geo
      emails
      website
      phone_numbers
      slug
    }
    ukrainian_locations_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_USER_LOCATIONS = gql`
  query GetUserLocations($where: ukrainian_locations_bool_exp!) {
    ukrainian_locations(where: $where) {
      id
      name
      address
      images
      category
      created_at
      description_uk
      description_en
      geo
      emails
      website
      phone_numbers
      slug
    }
    ukrainian_locations_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_ADMIN_LOCATIONS = gql`
  query GetAdminLocations($where: ukrainian_locations_bool_exp!) {
    ukrainian_locations(where: $where) {
      id
      name
      address
      images
      category
      created_at
      description_uk
      description_en
      geo
      emails
      website
      phone_numbers
      status
      user_id
      slug
    }
    ukrainian_locations_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const UPDATE_LOCATION_STATUS = gql`
  mutation UpdateLocationStatus(
    $id: Int!
    $status: ukrainian_location_statuses_enum!
  ) {
    update_ukrainian_locations_by_pk(
      pk_columns: { id: $id }
      _set: { status: $status }
    ) {
      id
      status
      updated_at
    }
  }
`;

/**
 * Custom hook to fetch locations based on a query.
 */
const useLocationsQuery = <
  T extends
    | GetAdminLocationsQuery
    | GetUserLocationsQuery
    | GetPublicLocationsQuery
>(
  query: DocumentNode,
  params: LocationsParams
) => {
  const { data, error, loading } = useQuery<T>(query, getFilter(params));

  return {
    data: (data?.ukrainian_locations ?? []) as T["ukrainian_locations"],
    error,
    loading,
    total: data?.ukrainian_locations_aggregate?.aggregate?.count ?? 0,
  };
};

export const useLocations = () => {
  const [updateStatus, { error, loading }] = useMutation(
    UPDATE_LOCATION_STATUS
  );

  const updateLocationStatus = useCallback(
    async (id: number, status: Status) => {
      const { data } = await updateStatus({
        variables: { id, status },
      });

      return { data, error, loading };
    },
    [updateStatus, loading, error]
  );

  const useAdminLocations = (params: LocationsParams) =>
    useLocationsQuery<GetAdminLocationsQuery>(GET_ADMIN_LOCATIONS, params);

  const useUserLocations = (params: LocationsParams) =>
    useLocationsQuery<GetUserLocationsQuery>(GET_USER_LOCATIONS, params);

  const usePublicLocations = (params: LocationsParams) =>
    useLocationsQuery<GetPublicLocationsQuery>(GET_PUBLIC_LOCATIONS, params);

  return {
    updateLocationStatus,
    useAdminLocations,
    usePublicLocations,
    useUserLocations,
  };
};
