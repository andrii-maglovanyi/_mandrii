import { getServerSession } from "next-auth";
import { Account } from "../../../features/Account/Account";
import { authOptions } from "@/lib";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <Account />;
}
