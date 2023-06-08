import { supabase } from "~/service/supabase";

export async function APIgetMessages() {
  const { data, error } = await supabase.from("messages").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export type APIgetMessagesResult =
  | Awaited<Promise<ReturnType<typeof APIgetMessages>>>
  | [];
