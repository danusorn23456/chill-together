import { UserRecord } from "~/service/supabase";

export type RoomID = string;

export interface OnlineUser {
  id: UserRecord["id"];
  username: UserRecord["username"];
  online_at: string;
}

export interface RoomMessage {
  sender_id: string;
  message: string;
  create_at: string;
}

export type OnlineUsers = OnlineUser[] | [];
export type RoomMessages = RoomMessage[];

export enum Channel {
  ONLINE_USERS = "online-users-channel-",
  ROOM_MESSAGES = "room-messages-channel-",
}
