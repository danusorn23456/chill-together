import { UUID } from "~/service/supabase";
import { useRooms } from "../hooks/use-rooms";
import lobbyBg from "~/assets/lobby.jpg";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

export interface RoomListsProps {}

function RoomLists({ ...rest }: RoomListsProps) {
  const rooms = useRooms();
  const navigate = useNavigate();

  function handleJoinRoom(id: UUID) {
    navigate(RoutePath.ROOM + "/" + id);
  }

  return (
    <div
      {...rest}
      className="w-full h-full bg-zinc-900"
      style={{
        backgroundImage: `url(${lobbyBg}) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col space-y-4 items-center p-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-4 rounded w-full max-w-xl bg-black/50 backdrop-blur-sm flex justify-between items-center space-x-4"
          >
            <div className="flex flex-col space-y-2 items-center">
              <img
                className="w-12 h-12 bg-white rounded-full"
                src={room.owner.avatar_url}
                alt={`avatar of ${room.owner.username}`}
              />
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              <p className="text-white text-xs leading-none">
                {room.owner.username}
              </p>
              <div className="flex flex-col space-y-1">
                <h2 className="text-white text-lg leading-none font-bold">
                  {room.name}
                </h2>
                <p className="text-white leading-none">{room.description}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleJoinRoom(room.id)}
                className="button"
              >
                join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RoomLists };
