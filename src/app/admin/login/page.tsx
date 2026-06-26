import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect("/admin");

  return (
    <main className="min-h-screen grid place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-4xl tracking-[0.2em] text-shogun-cream">
            SHOGUN
          </div>
          <div className="font-display tracking-[0.4em] text-xs text-shogun-orange mt-1">
            ADMIN PANEL
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
