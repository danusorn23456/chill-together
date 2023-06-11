import { Screen } from "~/feature/animation";
import { ChatWidget, useChatListener } from "~/feature/chat";
import { OnlineUserWidget, RoomBanner } from "~/feature/room";
import { useRoomListener } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  // perform realtime subscribe
  // main work of listener is to set state global state of each event
  useRoomListener();
  useChatListener();

  return (
    <div className="flex flex-1">
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <OnlineUserWidget />
        </div>
        <Screen />
      </div>
      <div className="w-60 lg:w-96 flex flex-col overflow-hidden bg-gray-900">
        <RoomBanner />
        <ChatWidget />
      </div>
    </div>
  );
}

export { Room };
