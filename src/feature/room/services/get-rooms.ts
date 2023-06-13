import { supabase } from "~/feature/common";

/**
 * This function retrieves rooms using Supabase's RPC feature.
 * @returns The `getRooms()` function is returning the result of a Supabase stored procedure called
 * "get_rooms". The exact content of the returned data depends on the implementation of the stored
 * procedure.
 */
export async function getRooms() {
  return await supabase.rpc("get_rooms");
}

export type GetRoomsResponse = Awaited<ReturnType<typeof getRooms>>;
export type GetRoomsReponseSuccess = GetRoomsResponse["data"];
export type GetRoomsReponseError = GetRoomsResponse["error"];
