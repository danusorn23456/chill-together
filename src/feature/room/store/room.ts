export * from "./users-in-room";
import { atom } from "recoil";
import { GetRoomByIdResponseSuccess } from "../services";

const roomState = atom<GetRoomByIdResponseSuccess>({
  key: "roomState",
  default: null,
});

export { roomState };
