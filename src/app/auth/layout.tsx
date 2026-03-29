import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  console.log("AUTH USER", authData);

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

    if (data.type === Role.ADMIN) return redirect("/admin");
  }

  return <>{children}</>;
}
