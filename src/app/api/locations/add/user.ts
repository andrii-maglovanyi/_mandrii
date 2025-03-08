interface UserData {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  id: string;
}

const DEFAULT_ROLE = "user";
const DEFAULT_STATUS = "active";

const INSERT_USER_MUTATION = `
        mutation InsertUser($email: String!, $full_name: String!, $google_id: String!, $profile_image: String, $role: String!, $status: String!) {
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

export const saveUser = async ({ email, name, image, id }: UserData) => {
  const variables = {
    email,
    full_name: name || "anonymous",
    google_id: id,
    profile_image: image || null,
    role: DEFAULT_ROLE,
    status: DEFAULT_STATUS,
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
      body: JSON.stringify({ query: INSERT_USER_MUTATION, variables }),
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
      body: JSON.stringify({
        query: GET_USER_QUERY,
        variables: { google_id: id },
      }),
    }
  );

  const existingUserResult = await existingUserResponse.json();

  if (existingUserResult.errors || existingUserResult.data.users.length === 0) {
    throw new Error("User lookup failed.");
  }

  return existingUserResult.data.users[0].id;
};
