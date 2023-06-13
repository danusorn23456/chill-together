import { MouseEventHandler } from "react";
import { GetRoomByIdResponseSuccess } from "../services";

export interface RoomDescreiptionsProps {
  isMe?: boolean;
  room: Required<GetRoomByIdResponseSuccess>;
  onClick: MouseEventHandler;
}

/**
 * This is a TypeScript React component that renders a room description with an option to join the
 * room.
 * @param {RoomDescreiptionsProps}  - - `isMe`: a boolean value indicating whether the current user is
 * the owner of the room
 * @returns This code is returning a React functional component called `RoomDescriptions`. It takes in
 * props such as `isMe`, `room`, and `onClick`, and returns a JSX element that renders a room
 * description with the owner's username, room name, room description, and a button to join the room.
 * The component also conditionally applies CSS classes based on the `isMe` prop.
 */
function RoomDescriptions({
  isMe,
  room,
  onClick = () => {},
}: RoomDescreiptionsProps) {
  return (
    <div
      className={[
        isMe ? "border-dashed" : "",
        "border border-gray-700 flex justify-between sm:items-center flex-col sm:flex-row p-4 rounded w-full max-w-xl bg-gray-900 sm:space-x-4 relative",
      ].join(" ")}
    >
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
          join {isMe ? "my room" : ""}
        </button>
      </div>
    </div>
  );
}

export { RoomDescriptions };
