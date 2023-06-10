import { atom } from "recoil";
import { User } from "~/feature/common";

export interface UserInRoom extends User {
  is_owner: boolean;
  online_at: string;
  coordinates: [number, number, number];
}

export type UsersInRoom = UserInRoom[];

const usersInRoomState = atom<UserInRoom[]>({
  key: "usersInRoomState",
  default: [],
});

export { usersInRoomState };
