import { supabase } from "~/feature/common";

export async function getMessages() {
  const { data, error } = await supabase.rpc("get_messages");
  if (error) {
    throw error;
  }
  return data;
}

export type GetMessagesResult =
  | Awaited<Promise<ReturnType<typeof getMessages>>>
  | [];
