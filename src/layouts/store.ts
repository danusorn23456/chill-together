import { atom } from "recoil";

export interface LayoutState {
  title: string;
}

const layoutState = atom<LayoutState>({
  key: "layoutState",
  default: {
    title: "",
  },
});

export { layoutState };
