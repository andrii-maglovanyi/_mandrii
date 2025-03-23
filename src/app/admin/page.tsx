import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { Admin } from "@/features/Admin/Admin";
import { authOptions } from "@/lib";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect(
      `https://mandrii.com/api/auth/signin?callbackUrl=${encodeURIComponent(
        "https://admin.mandrii.com"
      )}`
    );
  }

  const userRole = session.user.hasuraClaims?.["x-hasura-default-role"];

  if (userRole !== "admin") {
    return redirect("/");
  }

  return <Admin />;
}
