import { atom, selector } from "recoil";
import { stall, supabase } from "~/feature/common";
import { GetUserByIdResponseSuccess, getUserById } from "../services";

export const userIdState = atom<string | null>({
  key: "userIdState",
  default: null,
});

export const defaultUserState = selector<GetUserByIdResponseSuccess>({
  key: "defaultUserState",
  get: async ({ get }) => {
    const userID = get(userIdState);

    if (!userID) {
      return stall<null>();
    }

    const { data: user, error } = await getUserById(userID);

    if (error) {
      supabase.auth.signOut();
    }

    return user;
  },
});

export const userState = atom<GetUserByIdResponseSuccess>({
  key: "userState",
  default: defaultUserState,
});
