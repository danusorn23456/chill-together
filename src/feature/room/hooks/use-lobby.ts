import { useEffect, useState } from "react";
import {
  GetRoomByIdResponseSuccess,
  GetRoomsReponseSuccess,
  getRooms,
} from "../services";
import { UUID } from "~/feature/common";
import { RoutePath } from "~/routes/type";
import { useNavigate } from "react-router-dom";
import { GetUserByIdResponseSuccess } from "~/feature/auth";

/**
 * This function returns a hook that allows the user to retrieve and join rooms from a database.
 * @returns The `useLobby` hook returns an object with two properties: `rooms` and `join`. `rooms` is
 * the state variable that holds the list of rooms retrieved from the database, and `join` is a
 * function that takes a `UUID` parameter and navigates the user to the corresponding room page.
 */
export function useLobby({ user }: { user: GetUserByIdResponseSuccess }) {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<GetRoomsReponseSuccess>();
  const [myRoom, setMyRoom] = useState<GetRoomByIdResponseSuccess>();
  const [otherRooms, setOtherRooms] = useState<GetRoomsReponseSuccess>([]);
  const navigate = useNavigate();

  function join(id: UUID) {
    navigate(RoutePath.ROOM + "/" + id);
  }

  useEffect(
    function getingRoomsFormDatabse() {
      if (!user) return;
      async function callAPIGetRooms() {
        const { data: rooms, error } = await getRooms();

        if (error) {
          throw new Error(error.message);
        }

        const myRoom = rooms?.find((room) => room.owner.id === user?.id);
        const otherRooms = rooms?.filter((room) => room.owner.id !== user?.id);

        setOtherRooms(otherRooms);
        setMyRoom(myRoom);
        setRooms(rooms);

        setLoading(false);
      }
      callAPIGetRooms();
    },
    [user]
  );

  return { loading, rooms, myRoom, otherRooms, join };
}
