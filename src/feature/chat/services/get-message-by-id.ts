import { UUID, supabase } from "~/feature/common";

export async function getMessagesByRoomId(id: UUID) {
  const { data, error } = await supabase.rpc("get_messages_by_room_id", { id });
  if (error) {
    throw error;
  }
  return data;
}

export type GetMessagesByRoomIdResult =
  | Awaited<Promise<ReturnType<typeof getMessagesByRoomId>>>
  | [];
