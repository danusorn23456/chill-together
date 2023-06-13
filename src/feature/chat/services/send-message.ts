import { Database, supabase } from "~/feature/common";

export async function sendMessage({
  message,
  room_id,
  sender_id,
}: Database["public"]["Functions"]["send_message"]["Args"]) {
  return await supabase.rpc("send_message", { room_id, sender_id, message });
}

export type SendMessageResponse = Awaited<ReturnType<typeof sendMessage>>;
export type SendMessageResponseSuccess = SendMessageResponse["data"];
export type SendMessageResponseError = SendMessageResponse["error"];
