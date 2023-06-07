import { atom, selector } from "recoil";
import { Profile, supabase } from "~/service/supabase";

const defaultUserIDState = selector<string | null>({
  key: "defaultUserIDState",
  get: async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id || null;
  },
});

export const userIDState = atom<string | null>({
  key: "userIDState",
  default: defaultUserIDState,
});

export const userProfilesState = selector<Profile | null>({
  key: "userState",
  get: async ({ get }) => {
    const userID = get(userIDState);
    if (!userID) {
      return null;
    }
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userID)
      .single();
    return data as Profile;
  },
});
