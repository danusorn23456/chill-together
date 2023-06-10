export * from "./users-in-room";
import { atom, selector } from "recoil";
import { GetRoomByIdResult, getRoomById } from "../services";
import { UUID } from "~/feature/common";
import { stall } from "~/feature/common";

export const roomIdState = atom<UUID | null>({
  key: "roomIdState",
  default: null,
});

const roomState = selector<GetRoomByIdResult>({
  key: "roomState",
  get: async ({ get }) => {
    const roomId = get(roomIdState);

    if (!roomId) return stall<null>();

    const room = await getRoomById(roomId);

    return room?.id ? room : stall<null>();
  },
});

export { roomState };
