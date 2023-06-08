import { useEffect, useState } from "react";
import { APIgetRooms } from "./api";
import { RoomRecordWithOwner } from "~/service/supabase";

export function useRooms(): RoomRecordWithOwner[] {
  const [rooms, setRooms] = useState<RoomRecordWithOwner[] | []>([]);

  useEffect(function getingRoomsFormDatabse() {
    async function callAPIGetRoom() {
      const rooms = await APIgetRooms();
      setRooms(rooms);
    }
    callAPIGetRoom();
  }, []);

  return rooms;
}
