import { ChatForm } from "~/feature/chat/chat-form";
import { OnlineUserTab, Screen, useRoomListener } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  // this function will subscribe realtime database every action ex: user join sync leave
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
