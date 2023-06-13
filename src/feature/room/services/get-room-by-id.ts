import { UUID, supabase } from "~/feature/common";

/**
 * This function retrieves a room from Supabase by its ID using a stored procedure.
 * @param {UUID} id - The parameter `id` is of type `UUID`
 * @returns The `getRoomById` function is returning a Promise that resolves to the result of calling
 * the Supabase stored procedure "get_room_by_id" with the provided `id` parameter. The result could be
 * any data type depending on what the stored procedure returns.
 */
export async function getRoomById(id: UUID) {
  return await supabase.rpc("get_room_by_id", { room_id: id });
}

export type GetRoomByIdResponse = Awaited<ReturnType<typeof getRoomById>>;
export type GetRoomByIdResponseSuccess = GetRoomByIdResponse["data"];
export type GetRoomByIdResponseError = GetRoomByIdResponse["error"];
