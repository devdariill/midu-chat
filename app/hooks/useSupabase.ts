import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";
type TypeSupabaseClient = SupabaseClient<Database>;
export type SupabaseOutletContext = {
  supabase: TypeSupabaseClient;
  name: string;
};
export const useSupabase = () => {
  const { supabase, name } = useOutletContext<SupabaseOutletContext>();
  console.log(name)
  return supabase;
};
