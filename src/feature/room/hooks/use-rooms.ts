import { useEffect, useState } from "react";
import { GetRoomsReponseSuccess, getRooms } from "../services";
import { UUID } from "~/feature/common";
import { RoutePath } from "~/routes/type";
import { useNavigate } from "react-router-dom";

/**
 * This function returns a hook that allows the user to retrieve and join rooms from a database.
 * @returns The `useRooms` hook returns an object with two properties: `rooms` and `join`. `rooms` is
 * the state variable that holds the list of rooms retrieved from the database, and `join` is a
 * function that takes a `UUID` parameter and navigates the user to the corresponding room page.
 */
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
