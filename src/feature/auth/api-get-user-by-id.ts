import { UserRecord, supabase } from "~/service/supabase";

export async function APIgetUserById(id: string) {
  const { data, error } = await supabase
    .rpc("get_user_by_id", { id: id })
    .single();
  if (error) {
    throw error;
  }
  return data as UserRecord;
}
