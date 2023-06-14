import { ReactNode } from "react";
import { atom } from "recoil";

export interface RoomLayoutState {
  title: string | ReactNode;
  timer: string;
}

const roomLayoutState = atom<RoomLayoutState>({
  key: "room-layout-state",
  default: {
    title: "",
    timer: "",
  },
});

export { roomLayoutState };
