import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validate as uuidValidate } from "uuid";
import { RoutePath } from "~/routes/type";

export interface RoomProps {}

function Room({ ...rest }: RoomProps) {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(
    function isValidRoom() {
      if (!roomId || !uuidValidate(roomId)) {
        navigate(RoutePath.LOBBY);
      } else {
        console.info("join room %s", roomId);
      }
    },
    [roomId]
  );

  return <div {...rest}>Room {roomId}</div>;
}

export { Room };
