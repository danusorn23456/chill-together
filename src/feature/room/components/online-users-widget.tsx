import { useRecoilValue } from "recoil";
import { usersInRoomState } from "../store";

export interface OnlineUserWidgetProps {}

function OnlineUserWidget() {
  const onlineUsers = useRecoilValue(usersInRoomState);

  return (
    <div className="bg-zinc-900 bg-opacity-90 rounded p-4">
      <div className="flex flex-col space-y-3">
        <h2 className="text-white text-sm leading-none">online user</h2>
        <ul>
          {onlineUsers?.map((user) => (
            <li
              className="text-white text-xs flex space-x-2 items-center justify-end"
              key={user.id}
            >
              <span>{user.is_owner ? "👑" : ""}</span>
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { OnlineUserWidget };
