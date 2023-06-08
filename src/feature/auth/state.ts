import { atom, selector } from "recoil";
import { APIgetUserById, APIgetUserByIdResult } from "./api-get-user-by-id";
import { APIstall } from "../common/api";

export const userIDState = atom<string | null | undefined>({
  key: "userIDState",
  default: null,
});

export const userRecordState = selector<APIgetUserByIdResult>({
  key: "userState",
  get: async ({ get }) => {
    const userID = get(userIDState);

    if (!userID) {
      return APIstall<null>();
    }

    const user = await APIgetUserById(userID);

    if (user.id) {
      return user;
    }

    return APIstall<null>();
  },
});
