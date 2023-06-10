import { supabase } from "~/feature/common";

export async function getUserById(id: string) {
  return await supabase.rpc("get_user_by_id", { id });
}

export type GetUserByIdResponse = Awaited<ReturnType<typeof getUserById>>;
export type GetUserByIdResponseSuccess = GetUserByIdResponse["data"];
export type GetUserByIdResponseError = GetUserByIdResponse["error"];
