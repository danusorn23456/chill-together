import { RoomRecordWithOwner, UUID, supabase } from "~/service/supabase";

export async function APIgetRooms(): Promise<RoomRecordWithOwner[]> {
  const { data, error } = await supabase.rpc("get_rooms");
  if (error) {
    throw error;
  }
  return data as RoomRecordWithOwner[];
}

export async function APIgetRoomById(id: UUID): Promise<RoomRecordWithOwner> {
  const { data, error } = await supabase.rpc("get_room_by_id", { room_id: id });
  if (error) {
    throw error;
  }
  return data as RoomRecordWithOwner;
}
