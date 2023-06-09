import { ChatForm } from "~/feature/chat";
import { OnlineUserTab, Screen, useRoomListener } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  useRoomListener();

  return (
    <div className="flex flex-1">
      <div className="flex-1 relative">
        <OnlineUserTab />
        <Screen />
      </div>
      <div className="w-60 lg:w-96">
        <ChatForm />
      </div>
    </div>
  );
}

export { Room };
