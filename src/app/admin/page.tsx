import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin-editor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Admin | Portfolio",
  description: "Local admin panel for editing portfolio content.",
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();

  return (
    <main className="adminPage">
      <AdminEditor initialContent={content} />
    </main>
  );
}
