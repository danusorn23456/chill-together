import { supabase } from "~/service/supabase";

export async function getRooms() {
  const { data, error } = await supabase.rpc("get_rooms");
  if (error) {
    throw error;
  }
  return data;
}

export type GetRoomsResult = Awaited<Promise<ReturnType<typeof getRooms>>>;
