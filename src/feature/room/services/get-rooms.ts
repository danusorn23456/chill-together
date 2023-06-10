import { supabase } from "~/feature/common";

export async function getRooms() {
  return await supabase.rpc("get_rooms");
}

export type GetRoomsResponse = Awaited<ReturnType<typeof getRooms>>;
export type GetRoomsReponseSuccess = GetRoomsResponse["data"];
export type GetRoomsReponseError = GetRoomsResponse["error"];
