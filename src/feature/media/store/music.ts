import { atom, selector } from "recoil";
import { roomIdState } from "~/feature/room";
import { GetPlayedPlaylistResponseSuccess, getPlayedPlaylist } from "..";
import { stall } from "~/feature/common";

export const defaultMusicState = selector<GetPlayedPlaylistResponseSuccess>({
  key: "defaultState",
  get: async ({ get }) => {
    const room_id = get(roomIdState);

    if (!room_id) return stall<null>();

    const { data: room, error } = await getPlayedPlaylist({ room_id });

    if (error) {
      throw new Error(error.message);
    }

    return room;
  },
});

export const musicState = atom<GetPlayedPlaylistResponseSuccess>({
  key: "musicState",
  default: defaultMusicState,
});
