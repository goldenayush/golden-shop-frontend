import { redirect } from "next/navigation";

export default function RedirectToDashboardPage() {
   redirect("/admin/settings/store");
}
