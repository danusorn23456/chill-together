import { supabase } from "~/feature/common";

export async function getPlaylistByTitle(title: string) {
  return supabase.rpc("get_playlist_by_title", { title });
}

export type GetPlaylistByTitleResponse = Awaited<
  ReturnType<typeof getPlaylistByTitle>
>;
export type GetPlaylistByTitleResponseSuccess =
  GetPlaylistByTitleResponse["data"];
export type GetPlaylistByTitleResponseError =
  GetPlaylistByTitleResponse["error"];
