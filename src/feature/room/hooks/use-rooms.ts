import { useEffect, useState } from "react";
import { GetRoomsResult, getRooms } from "../services";
import { UUID } from "~/feature/common";
import { RoutePath } from "~/routes/type";
import { useNavigate } from "react-router-dom";

export function useRooms() {
  const [rooms, setRooms] = useState<GetRoomsResult>([]);
  const navigate = useNavigate();

  function join(id: UUID) {
    navigate(RoutePath.ROOM + "/" + id);
  }

  useEffect(function getingRoomsFormDatabse() {
    async function callAPIGetRooms() {
      const rooms = await getRooms();
      setRooms(rooms || []);
    }
    callAPIGetRooms();
  }, []);

  return { rooms, join };
}
