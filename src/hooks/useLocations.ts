import {
  GetAdminLocationsQuery,
  GetLocationsQuery,
  GetPublicLocationsQuery,
  GetUserLocationsQuery,
  Status,
  Ukrainian_Locations,
} from "@/types";
import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";

interface LocationsParams {
  geo?: {
    lat: number;
    lng: number;
  };
  distance?: number;
  category?: string;
  slug?: string;
}

const getFilter = ({ geo, distance, category, slug }: LocationsParams) => {
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
            type: "Point",
            coordinates: [geo.lng, geo.lat],
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
  mutation UpdateLocationStatus($id: Int!, $status: String!) {
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

export const useLocations = () => {
  const getLocations = <
    T extends
      | GetAdminLocationsQuery
      | GetUserLocationsQuery
      | GetPublicLocationsQuery
  >(
    query: DocumentNode,
    params: LocationsParams
  ) => {
    const { data, loading, error } = useQuery<T>(query, getFilter(params));

    return {
      data: data?.ukrainian_locations ?? [],
      total: data?.ukrainian_locations_aggregate?.aggregate?.count ?? 0,
      loading,
      error,
    };
  };

  const [updateStatus, { loading, error }] = useMutation(
    UPDATE_LOCATION_STATUS
  );

  const updateLocationStatus = useCallback(
    async (id: number, status: Status) => {
      const { data } = await updateStatus({
        variables: { id, status },
      });

      return { data, loading, error };
    },
    [updateStatus, loading, error]
  );

  const getAdminLocations = useCallback(
    (params: LocationsParams) =>
      getLocations<GetAdminLocationsQuery>(GET_ADMIN_LOCATIONS, params),
    []
  );

  const getUserLocations = useCallback(
    (params: LocationsParams) =>
      getLocations<GetUserLocationsQuery>(GET_USER_LOCATIONS, params),
    []
  );

  const getPublicLocations = useCallback(
    (params: LocationsParams) =>
      getLocations<GetPublicLocationsQuery>(GET_PUBLIC_LOCATIONS, params),
    []
  );

  return {
    getAdminLocations,
    getUserLocations,
    getPublicLocations,
    updateLocationStatus,
  };
};
