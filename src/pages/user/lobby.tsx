import { useRecoilValue } from "recoil";
import { userState } from "~/feature/auth";
import { RoomDescriptions, useLobby } from "~/feature/room";

/** This is a functional component called `Lobby` that renders a list of available rooms for users to
join. It uses the `useRooms` hook to get the list of rooms and the `useRecoilValue` hook to get the
current user's information from the `userState` atom. It then filters the list of rooms to exclude
the user's own room (if they have one) and renders the remaining rooms using the `RoomDescriptions`
component. The `join` function is passed as a callback to the `onClick` event of each
`RoomDescriptions` component, allowing users to join a room by clicking on it. */

function Lobby() {
  const user = useRecoilValue(userState);
  const { loading, otherRooms, myRoom, join } = useLobby({ user });

  if (loading) {
    return (
      <div className="pt-14 bg-gray-950 h-full w-full flex flex-col justify-start items-center space-y-4 p-4" />
    );
  }

  return (
    <div className="pt-14 bg-gray-950 h-full w-full flex flex-col justify-start items-center space-y-4 p-4">
      <RoomDescriptions isMe room={myRoom!} onClick={() => join(myRoom!.id)} />
      {otherRooms?.map((room) => (
        <RoomDescriptions
          key={room.id}
          room={room}
          onClick={() => join(room.id)}
        />
      ))}
    </div>
  );
}

export { Lobby };
