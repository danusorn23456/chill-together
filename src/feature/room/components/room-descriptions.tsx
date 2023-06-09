import { MouseEventHandler } from "react";
import { GetRoomByIdResult } from "../services";

export interface RoomDescreiptionsProps {
  room: Required<GetRoomByIdResult>;
  onClick: MouseEventHandler;
}

function RoomDescriptions({
  room,
  onClick = () => {},
}: RoomDescreiptionsProps) {
  return (
    <div className="p-4 rounded w-full max-w-xl bg-black/50 backdrop-blur-sm flex justify-between items-center space-x-4">
      <div className="flex flex-col space-y-2 items-center">
        <img
          className="w-12 h-12 bg-white rounded-full"
          src={room!.owner.avatar_url}
          alt={`avatar of ${room!.owner.username}`}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-2">
        <p className="text-white text-xs leading-none">
          {room!.owner.username}
        </p>
        <div className="flex flex-col space-y-1">
          <h2 className="text-white text-lg leading-none font-bold">
            {room!.name}
          </h2>
          <p className="text-white leading-none">{room!.description}</p>
        </div>
      </div>
      <div>
        <button onClick={onClick} className="button">
          join
        </button>
      </div>
    </div>
  );
}

export { RoomDescriptions };
