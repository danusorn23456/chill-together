import { useEffect, useState } from "react";
import { GetRoomsReponseSuccess, getRooms } from "../services";
import { UUID } from "~/feature/common";
import { RoutePath } from "~/routes/type";
import { useNavigate } from "react-router-dom";

export function useRooms() {
  const [rooms, setRooms] = useState<GetRoomsReponseSuccess>();
  const navigate = useNavigate();

  function join(id: UUID) {
    navigate(RoutePath.ROOM + "/" + id);
  }

  useEffect(function getingRoomsFormDatabse() {
    async function callAPIGetRooms() {
      const { data: rooms, error } = await getRooms();

      if (error) {
        throw new Error(error.message);
      }

      setRooms(rooms);
    }
    callAPIGetRooms();
  }, []);

  return { rooms, join };
}
