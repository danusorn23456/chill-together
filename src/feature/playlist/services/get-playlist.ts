import { Database, supabase } from "~/feature/common";

export async function getPlaylist({
  page,
  per_page,
}: Database["public"]["Functions"]["get_playlist"]["Args"]) {
  return supabase.rpc("get_playlist", { page, per_page });
}

export type GetPlaylistResponse = Awaited<ReturnType<typeof getPlaylist>>;
export type GetPlaylistResponseSuccess = GetPlaylistResponse["data"];
export type GetPlaylistResponseError = GetPlaylistResponse["error"];
