import { UUID, supabase } from "~/feature/common";

export async function getRoomById(id: UUID) {
  return await supabase.rpc("get_room_by_id", { room_id: id });
}

export type GetRoomByIdResponse = Awaited<ReturnType<typeof getRoomById>>;
export type GetRoomByIdResponseSuccess = GetRoomByIdResponse["data"];
export type GetRoomByIdResponseError = GetRoomByIdResponse["error"];
