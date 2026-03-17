import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | Portfolio",
  description: "Login page for the local admin panel.",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="adminLoginPage">
      <div className="adminLoginShell">
        <AdminLoginForm />
      </div>
    </main>
  );
}
