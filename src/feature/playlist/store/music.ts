import { atom } from "recoil";
import { GetPlayedPlaylistResponseSuccess } from "..";

export const musicState = atom<GetPlayedPlaylistResponseSuccess>({
  key: "musicState",
  default: null,
});
