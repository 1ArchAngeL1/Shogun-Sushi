import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import { getMenuData } from "@/lib/menu-store";
import { allBadges } from "@/lib/menu";
import { locales } from "@/lib/i18n.client";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const data = await getMenuData();

  return (
    <AdminDashboard
      initialData={data}
      badges={allBadges}
      locales={locales as unknown as string[]}
    />
  );
}
