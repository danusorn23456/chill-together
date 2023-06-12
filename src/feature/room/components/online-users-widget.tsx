import { useRecoilValue } from "recoil";
import { usersInRoomState } from "../store";

export interface OnlineUserWidgetProps {}

function OnlineUserWidget() {
  const onlineUsers = useRecoilValue(usersInRoomState);

  return (
    <ul className="flex flex-col p-4">
      {onlineUsers?.map((user) => (
        <li
          className="text-white text-xs flex space-x-2 items-center"
          key={user.id}
        >
          <span>{user.is_owner ? "👑" : ""}</span>
          <span>{user.username}</span>
        </li>
      ))}
    </ul>
  );
}

export { OnlineUserWidget };
