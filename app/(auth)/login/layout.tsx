import type { Metadata } from "next";

import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "landmark blockchain",
  description: "landmark blockchain",
};
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin/dashboard");
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
