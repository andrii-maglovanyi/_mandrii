import jwt from "jsonwebtoken";
import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

type HasuraClaims = {
  "x-hasura-allowed-roles": string[];
  "x-hasura-default-role": string;
  "x-hasura-user-id": string;
};

type UserExtra = User & {
  hasuraClaims: HasuraClaims;
  id: string;
};

export type UserSession = Session & { accessToken: string; user: UserExtra };

const getHasuraClaims = (email?: string | null) => ({
  "x-hasura-allowed-roles":
    email === process.env.ADMIN_EMAIL ? ["admin", "user"] : ["user"],
  "x-hasura-default-role": email === process.env.ADMIN_EMAIL ? "admin" : "user",
  "x-hasura-user-id": email || "",
});

export const authOptions = {
  callbacks: {
    async jwt({
      account,
      token,
    }: {
      account?: Account | null;
      token: JWT;
      user?: User;
    }) {
      if (account) {
        token.googleAccessToken = account.access_token;
      }

      const claims = getHasuraClaims(token.email);

      token["https://hasura.io/jwt/claims"] = claims;
      token.accessToken = jwt.sign(
        {
          email: token.email,
          "https://hasura.io/jwt/claims": claims,
          sub: token.sub,
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
    async redirect({ baseUrl, url }: { baseUrl: string; url: string }) {
      return url.startsWith(baseUrl) ? url : "/account";
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...(session.user || {}),
          hasuraClaims: token["https://hasura.io/jwt/claims"],
          id: token.sub as string,
        },
      } as UserSession;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        domain: ".mandrii.com",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: true, // ← this is key
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
};

export const handler = NextAuth(authOptions);
