import { atom } from "recoil";
import { UserRecord } from "~/service/supabase";

export interface OnlineUser extends UserRecord {
  is_owner: boolean;
  online_at: string;
}

export type OnlineUsers = OnlineUser[] | [];

export const onlineUserState = atom<OnlineUsers>({
  key: "onlineUserState",
  default: [],
});
