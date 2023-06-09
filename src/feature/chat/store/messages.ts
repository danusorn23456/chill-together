import { selector } from "recoil";
import { GetMessagesByRoomIdResult, getMessagesByRoomId } from "..";
import { roomIdState } from "~/feature/room/store";
import { stall } from "~/feature/common";

const messagesState = selector<GetMessagesByRoomIdResult>({
  key: "messagesState",
  get: async ({ get }) => {
    const roomId = get(roomIdState);

    if (!roomId) return stall<[]>();

    const messages = await getMessagesByRoomId(roomId);

    return messages ? messages : stall<[]>();
  },
});

export { messagesState };
