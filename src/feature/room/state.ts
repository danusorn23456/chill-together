import { APIgetRoomByIdResult } from "./api";
import { atom } from "recoil";
import { OnlineUsers } from "./type";

export const onlineUserState = atom<OnlineUsers>({
  key: "onlineUserState",
  default: [],
});

export const roomState = atom<APIgetRoomByIdResult>({
  key: "roomState",
  default: null,
});
