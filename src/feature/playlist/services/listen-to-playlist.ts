import { Database, supabase } from "~/feature/common";

export async function listenToMusic(
  playlist_id: Database["public"]["Functions"]["listen_to_playlist"]["Args"]["playlist_id"]
) {
  return await supabase.rpc("listen_to_playlist", { playlist_id });
}

export type ListenToMusicResponse = Awaited<ReturnType<typeof listenToMusic>>;
export type ListenToMusicResponseSuccess = ListenToMusicResponse["data"];
export type ListenToMusicResponseError = ListenToMusicResponse["error"];
