import { createClient } from "@/supabase/server";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.log("Error fetching user data", error);
      return;
    }

    console.log("USER DATA", data);

    // if (data.type === Role.ADMIN) return redirect("/");
  }

  return <>{children}</>;
}
