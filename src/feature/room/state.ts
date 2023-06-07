import { atom } from "recoil";
import { OnlineUsers } from "./type";

export const onlineUserState = atom<OnlineUsers>({
  key: "onlineUserState",
  default: [],
});
