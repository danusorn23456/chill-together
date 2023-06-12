import { MouseEventHandler } from "react";
import { GetRoomByIdResponseSuccess } from "../services";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

export interface RoomDescreiptionsProps {
  room: Required<GetRoomByIdResponseSuccess>;
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
          className="w-14 h-14 bg-white rounded-full"
          src={room?.owner.avatar_url || ""}
          alt={`avatar of ${room!.owner.username}`}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-2">
        <p className="text-white text-xs leading-none">
          {room?.owner.username || ""}
        </p>
        <div className="flex flex-col space-y-1">
          <h2 className="text-pink-500 text-lg leading-none font-bold">
            {room?.name || ""}
          </h2>
          <p className="text-white leading-none">{room!.description}</p>
        </div>
      </div>
      <div className="mt-auto">
        <button
          onClick={onClick}
          className="p-1 px-4 text-sm duration-200 text-green-400 rounded border border-green-400 hover:border-green-200 hover:bg-green-500 hover:text-green-900"
        >
          join
        </button>
      </div>
    </div>
  );
}

export { RoomDescriptions };
