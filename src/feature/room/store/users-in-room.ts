import { atom } from "recoil";
import { GetUserByIdResponseSuccess } from "~/feature/auth";

export type UserInRoom = {
  is_owner: boolean;
  online_at: string;
  coordinates: [number, number, number];
} & GetUserByIdResponseSuccess;

export type UsersInRoom = UserInRoom[];

const usersInRoomState = atom<UserInRoom[]>({
  key: "usersInRoomState",
  default: [],
});

export { usersInRoomState };
