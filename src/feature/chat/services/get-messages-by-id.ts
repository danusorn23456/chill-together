import { UUID, supabase } from "~/feature/common";

export async function getMessagesByRoomId(id: UUID) {
  return await supabase.rpc("get_messages_by_room_id", { id });
}

export type GetMessagesByRoomIdResponse = Awaited<
  ReturnType<typeof getMessagesByRoomId>
>;
export type GetMessagesByRoomIdResponseSuccess =
  GetMessagesByRoomIdResponse["data"];
export type GetMessagesByRoomIdResponseError =
  GetMessagesByRoomIdResponse["error"];
