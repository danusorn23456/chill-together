import { UUID, supabase } from "~/service/supabase";

export async function APIgetRooms() {
  const { data, error } = await supabase.rpc("get_rooms");
  if (error) {
    throw error;
  }
  return data;
}

export type APIgetRoomsResult = Awaited<
  Promise<ReturnType<typeof APIgetRooms>>
>;

export async function APIgetRoomById(id: UUID) {
  const { data, error } = await supabase.rpc("get_room_by_id", { room_id: id });
  if (error) {
    throw error;
  }
  return data;
}

export type APIgetRoomByIdResult = Awaited<
  Promise<ReturnType<typeof APIgetRoomById>>
> | null;
