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
    <div className="flex justify-between sm:items-center flex-col sm:flex-row p-4 rounded w-full max-w-xl bg-gray-900 sm:space-x-4 relative">
      <div className="w-12 h-12 absolute opacity-0 sm:opacity-100 sm:static sm:visible bg-white rounded-full p-2 flex-shrink-0">
        <img
          className="w-full h-full"
          src={room?.owner.avatar_url || ""}
          alt={`avatar of ${room!.owner.username}`}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-2">
        <p className="text-white text-xs leading-none">
          {room?.owner.username || ""}
        </p>
        <div className="flex flex-col space-y-1">
          <h2 className="text-pink-500 text-md leading-none font-bold">
            {room?.name || ""}
          </h2>
          <p className="text-white text-sm leading-none">{room!.description}</p>
        </div>
      </div>
      <div className="mt-auto absolute bottom-2 right-2 sm:static">
        <button
          onClick={onClick}
          className="p-1 px-4 text-sm duration-200 text-pink-400 rounded border border-pink-400 hover:border-pink-200 hover:bg-pink-500 hover:text-pink-100"
        >
          join
        </button>
      </div>
    </div>
  );
}

export { RoomDescriptions };
