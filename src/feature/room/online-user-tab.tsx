import { useRecoilValue } from "recoil";
import { onlineUserState } from "./state";
import { userRecordState } from "../auth/state";
import { useRoom } from "./use-room";

export interface OnlineUserTabProps {}

function OnlineUserTab({}: OnlineUserTabProps) {
  const onlineUsers = useRecoilValue(onlineUserState);
  const { room } = useRoom();
  const user = useRecoilValue(userRecordState);

  return (
    <div className="bg-zinc-900 absolute top-4 right-4 bg-opacity-90 rounded p-4">
      <div className="flex flex-col space-y-3">
        <h2 className="text-white text-sm leading-none">online user</h2>
        <ul>
          {onlineUsers?.map((user) => (
            <li
              className="text-white text-xs flex space-x-2 items-center"
              key={user.id}
            >
              <span>{user.id === room?.owner_id ? "👑" : ""}</span>
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { OnlineUserTab };
