import { atom } from "recoil";
import { GetRoomByIdResult } from "../services";

export const roomState = atom<GetRoomByIdResult>({
  key: "roomState",
  default: null,
});
