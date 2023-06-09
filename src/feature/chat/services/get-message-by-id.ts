import { UUID, supabase } from "~/service/supabase";

export async function getMessageById(id: UUID) {
  const { data, error } = await supabase.rpc("get_message_by_id", {
    message_id: id,
  });
  if (error) {
    throw error;
  }
  return data;
}
