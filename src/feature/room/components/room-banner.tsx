import { useRecoilValue } from "recoil";
import { roomState } from "..";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

function RoomBanner() {
  const room = useRecoilValue(roomState);
  const navigate = useNavigate();
  function leaveRoom() {
    navigate(RoutePath.LOBBY);
  }

  return (
    <div className="flex flex-col items-start p-4 flex-shrink-0 relative">
      <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
      <h2 className="z-20 leading-none text-lg font-bold text-pink-500">
        {room?.name}
      </h2>
      <p className="z-20 text-white">{room?.description}</p>
      <button
        onClick={leaveRoom}
        className="z-20 mt-2 border px-3 rounded text-sm text-red-500 border-red-500 hover:bg-white hover:text-red-500 [&:hover_+_img]:translate-y-1"
      >
        leave
      </button>
      <img
        className="z-0 duration-200 absolute top-1/2 -translate-y-1/2 right-4 w-20 h-20"
        src={room?.owner.avatar_url}
      />
    </div>
  );
}

export { RoomBanner };
