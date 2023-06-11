import { Database, supabase } from "~/feature/common";

export async function sendMessage({
  message,
  room_id,
  sender_id,
}: Database["public"]["Functions"]["send_message"]["Args"]) {
  return await supabase.rpc("send_message", { room_id, sender_id, message });
}

export type sendMessageResponse = Awaited<ReturnType<typeof sendMessage>>;
export type sendMessageResponseSuccess = sendMessageResponse["data"];
export type sendMessageResponseError = sendMessageResponse["error"];
