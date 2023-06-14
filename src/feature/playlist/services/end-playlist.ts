import { supabase } from "~/feature/common";

export async function endPlaylist() {
  return await supabase.rpc("end_playlist");
}

export type endPlaylistResponse = Awaited<ReturnType<typeof endPlaylist>>;
export type endPlaylistResponseSuccess = endPlaylistResponse["data"];
export type endPlaylistResponseError = endPlaylistResponse["error"];
