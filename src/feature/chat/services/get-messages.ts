import { supabase } from "~/feature/common";

export async function getMessages() {
  return await supabase.rpc("get_messages");
}

export type GetMessagesResponse = Awaited<ReturnType<typeof getMessages>>;
export type GetMessagesResponseSuccess = GetMessagesResponse["data"];
export type GetMessagesResponseError = GetMessagesResponse["error"];
