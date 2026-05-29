import Home from "@/components/Home";
import { createClient } from "@/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Home userSession={user?.id} />;
}
