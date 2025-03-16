import { User_Roles_Enum, User_Statuses_Enum } from "@/types";

interface UserData {
  email?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
}

const INSERT_USER_MUTATION = `
        mutation InsertUser($email: String!, $full_name: String!, $google_id: String!, $profile_image: String, $role: user_roles_enum!, $status: user_statuses_enum!) {
            insert_users_one(
                object: {
                    email: $email,
                    full_name: $full_name,
                    google_id: $google_id,
                    profile_image: $profile_image,
                    role: $role,
                    status: $status
                },
                on_conflict: {
                    constraint: users_google_id_key, 
                    update_columns: []
                }
            ) {
                id
            }
        }
    `;

const GET_USER_QUERY = `
        query GetUser($google_id: String!) {
            users(where: { google_id: { _eq: $google_id } }) {
                id
            }
        }
    `;

export const saveUser = async ({ email, id, image, name }: UserData) => {
  const variables = {
    email,
    full_name: name || "anonymous",
    google_id: id,
    profile_image: image || null,
    role: User_Roles_Enum.User,
    status: User_Statuses_Enum.Active,
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    {
      body: JSON.stringify({ query: INSERT_USER_MUTATION, variables }),
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

  if (result.data.insert_users_one) {
    return result.data.insert_users_one.id;
  }

  const existingUserResponse = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    {
      body: JSON.stringify({
        query: GET_USER_QUERY,
        variables: { google_id: id },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
      method: "POST",
    }
  );

  const existingUserResult = await existingUserResponse.json();

  if (existingUserResult.errors || existingUserResult.data.users.length === 0) {
    throw new Error("User lookup failed.");
  }

  return existingUserResult.data.users[0].id;
};
