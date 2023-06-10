import { UUID, supabase } from "~/feature/common";

export async function getRoomById(id: UUID) {
  const { data, error } = await supabase.rpc("get_room_by_id", { room_id: id });
  if (error) {
    throw error;
  }
  return data;
}

export type GetRoomByIdResult = Awaited<
  Promise<ReturnType<typeof getRoomById>>
> | null;
