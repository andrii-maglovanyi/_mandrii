import { Admin } from "@/features/Admin/Admin";
import { authOptions } from "@/lib";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/api/auth/signin");
  }

  const userRole = session.user.hasuraClaims?.["x-hasura-default-role"];

  if (userRole !== "admin") {
    return redirect("/");
  }

  return <Admin />;
}
