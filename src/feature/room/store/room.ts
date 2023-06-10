export * from "./users-in-room";
import { atom, selector } from "recoil";
import { GetRoomByIdResponseSuccess, getRoomById } from "../services";
import { UUID } from "~/feature/common";
import { stall } from "~/feature/common";

export const roomIdState = atom<UUID | null>({
  key: "roomIdState",
  default: null,
});

const roomState = selector<GetRoomByIdResponseSuccess>({
  key: "roomState",
  get: async ({ get }) => {
    const roomId = get(roomIdState);

    if (!roomId) return stall<null>();

    const { data: room, error } = await getRoomById(roomId);

    if (error) {
      throw new Error(error.message);
    }

    return room;
  },
});

export { roomState };
