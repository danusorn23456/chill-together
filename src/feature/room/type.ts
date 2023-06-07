import { Profile } from "~/service/supabase";

export type RoomID = string;

export interface OnlineUser {
  id: Profile["id"];
  username: Profile["username"];
  online_at: string;
}

export interface RoomMessage {
  sender_id: string;
  message: string;
  create_at: string;
}

export type OnlineUsers = OnlineUser[] | [];
export type RoomMessages = RoomMessage[];

export enum RoomChannel {
  PREFIX = "room-",
}
