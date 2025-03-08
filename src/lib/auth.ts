import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

type HasuraClaims = {
  "x-hasura-user-id": string;
  "x-hasura-default-role": string;
  "x-hasura-allowed-roles": string[];
};

type UserExtra = User & {
  id: string;
  hasuraClaims: HasuraClaims;
};

const getHasuraClaims = (email?: string | null) => ({
  "x-hasura-user-id": email || "",
  "x-hasura-default-role": email === process.env.ADMIN_EMAIL ? "admin" : "user",
  "x-hasura-allowed-roles":
    email === process.env.ADMIN_EMAIL ? ["admin", "user"] : ["user"],
});

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }) {
      if (account) {
        token.googleAccessToken = account.access_token;
      }

      const claims = getHasuraClaims(token.email);

      token["https://hasura.io/jwt/claims"] = claims;
      token.accessToken = jwt.sign(
        {
          sub: token.sub,
          email: token.email,
          "https://hasura.io/jwt/claims": claims,
        },
        process.env.NEXT_AUTH_SECRET!, // Use the same secret as Hasura
        {
          algorithm: "HS256",
          expiresIn: "1h",
          issuer: "https://mandrii.com",
        }
      );

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...(session.user || {}),
          id: token.sub as string,
          hasuraClaims: token["https://hasura.io/jwt/claims"],
        },
        accessToken: token.accessToken,
      } as Session & { user: UserExtra };
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : "/account";
    },
  },
};

export const handler = NextAuth(authOptions);
