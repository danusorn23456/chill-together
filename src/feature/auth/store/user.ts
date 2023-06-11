import { atom, selector } from "recoil";
import { stall, supabase } from "~/feature/common";
import { GetUserByIdResponseSuccess, getUserById } from "../services";

export const userIdState = atom<string | null>({
  key: "userIdState",
  default: null,
});

export const userState = selector<GetUserByIdResponseSuccess>({
  key: "userState",
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
