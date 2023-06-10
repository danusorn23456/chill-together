import { GetRoomByIdResponseSuccess } from "../services";

function RoomBanner(room: GetRoomByIdResponseSuccess) {
  return (
    <div
      className="p-4 flex-shrink-0 text-white bg-contain bg-no-repeat bg-right"
      style={{
        backgroundImage: `url(${room?.owner?.avatar_url})`,
      }}
    >
      <h2 className="text-lg font-bold text-pink-500">{room?.name}</h2>
      <p>{room?.description}</p>
    </div>
  );
}

export { RoomBanner };
