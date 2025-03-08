import { Ukrainian_Locations } from "@/types";

export type Ukrainian_Locations_Data = Omit<Ukrainian_Locations, "id">;

export interface LocationData {
  name: string;
  address: string;
  description_en: string;
  description_uk: string;
  website: string;
  coordinates: [number, number];
  emails: Array<string>;
  category: string;
  city: string;
  country: string;
  slug: string;
  phone_numbers: Array<string>;
  images: Array<string>;
  user_id: string;
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
            $status: String!, 
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
      body: JSON.stringify({ query: INSERT_LOCATION_MUTATION, variables }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.insert_ukrainian_locations_one.id;
};
