import { atom, selector } from "recoil";
import { stall } from "~/feature/common";
import { getUserById, getUserByIdResult } from "../services";

export const userIDState = atom<string | null | undefined>({
  key: "userIDState",
  default: null,
});

export const userState = selector<getUserByIdResult>({
  key: "userState",
  get: async ({ get }) => {
    const userID = get(userIDState);

    if (!userID) {
      return stall<null>();
    }

    const user = await getUserById(userID);

    if (user.id) {
      return user;
    }

    return stall<null>();
  },
});
