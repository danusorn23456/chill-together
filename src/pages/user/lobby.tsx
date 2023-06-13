import { RoomDescriptions, useRooms } from "~/feature/room";

export interface LobbyProps {}

function Lobby({}: LobbyProps) {
  const { rooms, join } = useRooms();

  return (
    <div className="pt-14 bg-gray-950 h-full w-full flex flex-col justify-start items-center space-y-4 p-4">
      {rooms?.map((room) => (
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
