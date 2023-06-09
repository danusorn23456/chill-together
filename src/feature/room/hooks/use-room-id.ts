import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { UUID } from "~/service/supabase";

function useRoomId(): UUID {
  const { roomId } = useParams();
  const navigate = useNavigate();

  if (!roomId) {
    navigate(RoutePath.LOBBY);
  }

  return roomId as UUID;
}

export { useRoomId };
