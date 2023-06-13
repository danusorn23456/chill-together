import { atom } from "recoil";
import { GetMessagesByRoomIdResponseSuccess } from "..";

const messagesState = atom<GetMessagesByRoomIdResponseSuccess>({
  key: "messagesState",
  default: [],
});

export { messagesState };
