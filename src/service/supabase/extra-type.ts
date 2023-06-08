import { Database } from ".";

export type UserRecord = Database["public"]["Tables"]["users"]["Row"];
export type RoomRecord = Database["public"]["Tables"]["rooms"]["Row"];
export type UUID = string;
export type RoomRecordWithOwner = Pick<
  RoomRecord,
  "id" | "name" | "description" | "owner_id" | "online_users"
> & {
  owner: UserRecord;
};
