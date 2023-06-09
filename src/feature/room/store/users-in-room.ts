import { atom } from "recoil";
import { UserRecord } from "~/service/supabase";

export interface UserInRoom extends UserRecord {
  is_owner: boolean;
  online_at: string;
}

const usersInRoomState = atom<UserInRoom[]>({
  key: "usersInRoomState",
  default: [],
});

export { usersInRoomState };
