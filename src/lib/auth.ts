import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

type UserExtra = User & { isAdmin: boolean; id: string };

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as UserExtra).id = token.sub as string;
        (session.user as UserExtra).isAdmin =
          session.user.email === process.env.ADMIN_EMAIL;
      }
      return session as Session & { user: UserExtra };
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : "/account";
    },
  },
};

export const handler = NextAuth(authOptions);
