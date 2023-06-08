import { RoomLists } from "~/feature/room/rooms-lists";

export interface LobbyProps {}

function Lobby({ ...rest }: LobbyProps) {
  return (
    <div className="h-full w-full">
      <RoomLists />
    </div>
  );
}

export { Lobby };
