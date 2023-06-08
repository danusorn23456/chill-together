import { useEffect, useState } from "react";
import { APIgetRooms, APIgetRoomsResult } from "./api";

export function useRooms() {
  const [rooms, setRooms] = useState<APIgetRoomsResult>([]);

  useEffect(function getingRoomsFormDatabse() {
    async function callAPIGetRooms() {
      const rooms = await APIgetRooms();
      setRooms(rooms || []);
    }
    callAPIGetRooms();
  }, []);

  return rooms;
}
