import { RoomLists } from "~/feature/room/components/rooms-lists";

export interface LobbyProps {}

function Lobby({}: LobbyProps) {
  return (
    <div className="h-full w-full">
      <RoomLists />
    </div>
  );
}

export { Lobby };
