import { supabase } from "~/service/supabase";

export async function APIgetUserById(id: string) {
  const { data, error } = await supabase.rpc("get_user_by_id", { user_id: id });
  if (error) {
    supabase.auth.signOut();
    throw error;
  }
  return data;
}

export type APIgetUserByIdResult = Awaited<
  Promise<ReturnType<typeof APIgetUserById>>
> | null;
