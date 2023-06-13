import { useRecoilValue } from "recoil";
import { userState } from "~/feature/auth";
import { RoomDescriptions, useRooms } from "~/feature/room";

export interface LobbyProps {}

function Lobby({}: LobbyProps) {
  const { rooms, join } = useRooms();
  const user = useRecoilValue(userState);
  const otherRooms = rooms?.filter((room) => room.owner.id !== user?.id);
  let myRoom = rooms?.find((room) => room.owner.id === user?.id);

  return (
    <div className="pt-14 bg-gray-950 h-full w-full flex flex-col justify-start items-center space-y-4 p-4">
      {myRoom ? (
        <RoomDescriptions isMe room={myRoom} onClick={() => join(myRoom!.id)} />
      ) : (
        <></>
      )}
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
