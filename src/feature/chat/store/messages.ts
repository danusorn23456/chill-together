import { atom, selector } from "recoil";
import { GetMessagesByRoomIdResult, getMessagesByRoomId } from "..";
import { roomIdState } from "~/feature/room/store";
import { stall } from "~/feature/common";

const defaultMessagesState = selector<GetMessagesByRoomIdResult>({
  key: "defaultMessagesState",
  get: async ({ get }) => {
    const roomId = get(roomIdState);

    if (!roomId) return stall<[]>();

    const messages = await getMessagesByRoomId(roomId);

    return messages ? messages : stall<[]>();
  },
});

const messagesState = atom({
  key: "messagesState",
  default: defaultMessagesState,
});

export { messagesState };
