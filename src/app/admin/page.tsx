import { Admin } from "@/features/Admin/Admin";
import { authOptions } from "@/lib";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!session.user.isAdmin) {
    redirect("/");
  }

  return <Admin />;
}
