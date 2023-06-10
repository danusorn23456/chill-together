import { atom, selector } from "recoil";
import { stall, supabase } from "~/feature/common";
import { GetUserByIdResponseSuccess, getUserById } from "../services";

export const userIDState = atom<string | null | undefined>({
  key: "userIDState",
  default: null,
});

export const userState = selector<GetUserByIdResponseSuccess>({
  key: "userState",
  get: async ({ get }) => {
    const userID = get(userIDState);

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
