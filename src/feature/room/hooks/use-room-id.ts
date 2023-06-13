import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { UUID } from "~/feature/common";

/**
 * This function retrieves the room ID from the URL parameters and navigates to the lobby if no room ID
 * is found.
 * @returns the `roomId` as a `UUID` after checking if it exists in the `useParams()` hook. If `roomId`
 * does not exist, the function will navigate to the lobby page using the `useNavigate()` hook.
 */
function useRoomId(): UUID {
  const { roomId } = useParams();
  const navigate = useNavigate();

  if (!roomId) {
    navigate(RoutePath.LOBBY);
  }

  return roomId as UUID;
}

export { useRoomId };
