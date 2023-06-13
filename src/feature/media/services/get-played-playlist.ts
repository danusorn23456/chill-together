import { Database, supabase } from "~/feature/common";

export async function getPlayedPlaylist({
  room_id,
}: Database["public"]["Functions"]["get_played_playlist"]["Args"]) {
  return supabase.rpc("get_played_playlist", { room_id });
}

export type GetPlayedPlaylistResponse = Awaited<
  ReturnType<typeof getPlayedPlaylist>
>;
export type GetPlayedPlaylistResponseSuccess =
  GetPlayedPlaylistResponse["data"];
export type GetPlayedPlaylistResponseError = GetPlayedPlaylistResponse["error"];
