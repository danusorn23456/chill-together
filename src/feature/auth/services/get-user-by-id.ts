import { supabase } from "~/feature/common";

export async function getUserById(id: string) {
  const { data, error } = await supabase.rpc("get_user_by_id", { id });
  if (error) {
    supabase.auth.signOut();
    throw error;
  }
  return data;
}

export type GetUserByIdResult = Awaited<
  Promise<ReturnType<typeof getUserById>>
> | null;
