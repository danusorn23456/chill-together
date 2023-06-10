import { atom } from "recoil";
import { GetUserByIdResult } from "~/feature/auth/services";

export type UserInRoom = {
  is_owner: boolean;
  online_at: string;
  coordinates: [number, number, number];
} & GetUserByIdResult;

export type UsersInRoom = UserInRoom[];

const usersInRoomState = atom<UserInRoom[]>({
  key: "usersInRoomState",
  default: [],
});

export { usersInRoomState };
