import {
  Ukrainian_Location_Categories_Enum,
  Ukrainian_Locations,
} from "@/types";

export type Ukrainian_Locations_Data = Omit<
  Ukrainian_Locations,
  "id" | "ukrainian_location_category" | "ukrainian_location_status"
>;

export interface LocationData {
  address: string;
  category: Ukrainian_Location_Categories_Enum;
  city: string;
  coordinates: [number, number];
  country: string;
  description_en: string;
  description_uk: string;
  emails: Array<string>;
  images: Array<string>;
  name: string;
  phone_numbers: Array<string>;
  slug: string;
  user_id: string;
  website: string;
}

const INSERT_LOCATION_MUTATION = `
        mutation InsertLocation(
            $name: String!, 
            $address: String!, 
            $phone_numbers: [String!], 
            $emails: [String!], 
            $category: String!, 
            $city: String!, 
            $country: String!, 
            $geo: geography!,
            $images: [String!], 
            $description_en: String, 
            $description_uk: String, 
            $website: String, 
            $slug: String!, 
            $status: ukrainian_location_statuses_enum!, 
            $user_id: Int!
        ) {
            insert_ukrainian_locations_one(
                object: {
                    name: $name, 
                    address: $address, 
                    phone_numbers: $phone_numbers, 
                    emails: $emails, 
                    category: $category, 
                    city: $city, 
                    country: $country, 
                    geo: $geo,
                    images: $images, 
                    description_en: $description_en, 
                    description_uk: $description_uk, 
                    website: $website, 
                    slug: $slug, 
                    status: $status, 
                    user_id: $user_id
                }
            ) {
                id
            }
        }
    `;

export const saveLocation = async (variables: Ukrainian_Locations_Data) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    {
      body: JSON.stringify({ query: INSERT_LOCATION_MUTATION, variables }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
      method: "POST",
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.insert_ukrainian_locations_one.id;
};
