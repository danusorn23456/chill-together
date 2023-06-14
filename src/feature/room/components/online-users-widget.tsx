import { OnlineUsers } from "..";

export interface OnlineUserWidgetProps {
  users?: OnlineUsers;
}

/**  renders a list of online users in a
room. It uses the `useRecoilValue` hook from the `recoil` library to retrieve the current value of
the `usersInRoomState` atom from the store. It then maps over the `onlineUsers` array and renders a
list item for each user, displaying their username and an optional crown emoji if they are the owner
of the room. The resulting JSX is returned and rendered by the component. */
function OnlineUserWidget({ users }: OnlineUserWidgetProps) {
  return (
    <ul className="flex flex-col space-y-2 p-4">
      {users?.map((user, index) => (
        <li
          className="text-white text-xs flex space-x-2 items-center"
          key={user.id}
        >
          <span className="w-4">{index + 1} : </span>
          <span className="">{user.is_owner ? "👑" : "🥳"}</span>
          <span>{user.username}</span>
        </li>
      ))}
    </ul>
  );
}

export { OnlineUserWidget };
