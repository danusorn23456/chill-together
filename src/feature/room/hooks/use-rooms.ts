import { useEffect, useState } from "react";
import { GetRoomsResult, getRooms } from "../services";

export function useRooms() {
  const [rooms, setRooms] = useState<GetRoomsResult>([]);

  useEffect(function getingRoomsFormDatabse() {
    async function callAPIGetRooms() {
      const rooms = await getRooms();
      setRooms(rooms || []);
    }
    callAPIGetRooms();
  }, []);

  return rooms;
}
