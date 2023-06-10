import { atom, selector } from "recoil";
import { GetMessagesByRoomIdResponseSuccess, getMessagesByRoomId } from "..";
import { roomIdState } from "~/feature/room/store";
import { stall } from "~/feature/common";

const defaultMessagesState = selector<GetMessagesByRoomIdResponseSuccess>({
  key: "defaultMessagesState",
  get: async ({ get }) => {
    const roomId = get(roomIdState);

    if (!roomId) return stall<[]>();

    const { data: messages, error } = await getMessagesByRoomId(roomId);

    if (error) {
      throw new Error(error.message);
    }

    return messages;
  },
});

const messagesState = atom({
  key: "messagesState",
  default: defaultMessagesState,
});

export { messagesState };
