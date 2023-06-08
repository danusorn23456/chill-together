import { atom, selector } from "recoil";
import { UserRecord, supabase } from "~/service/supabase";
import { APIgetUserById } from "./api-get-user-by-id";

export const userIDState = atom<string | null | undefined>({
  key: "userIDState",
  default: null,
});

export const userRecordState = selector<UserRecord | null>({
  key: "userState",
  get: async ({ get }) => {
    const userID = get(userIDState);
    console.log("userId ", userID);

    if (!userID) {
      return null;
    }
    const user = await APIgetUserById(userID);
    if (user.id) {
      return user as UserRecord;
    }
    supabase.auth.signOut();
    return null;
  },
});
