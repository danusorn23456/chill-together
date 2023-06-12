import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Screen } from "~/feature/animation";
import { ChatWidget, useChatListener } from "~/feature/chat";
import { Tab, TabItems } from "~/feature/common";
import { OnlineUserWidget, RoomBanner } from "~/feature/room";
import { useRoomListener } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  // perform realtime subscribe
  // main work of listener is to set state global state of each event
  const { leaveRoom } = useRoomListener();
  useChatListener();

  const tabItems: TabItems = [
    {
      key: "chat",
      icon: <ChatBubbleLeftEllipsisIcon />,
      content: (
        <div className="h-full flex flex-col">
          <RoomBanner />
          <ChatWidget />
        </div>
      ),
    },
    {
      key: "users",
      icon: <UserCircleIcon />,
    },
    {
      key: "leave",
      iconWrapperStyle: {
        marginLeft: "auto",
      },
      icon: <ArrowLeftOnRectangleIcon className="fill-red-500" />,
      onClick: leaveRoom,
    },
  ];

  return (
    <div className="flex flex-1">
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <OnlineUserWidget />
        </div>
        <Screen />
      </div>
      <div className="w-60 lg:w-96 flex flex-col overflow-hidden bg-gray-900">
        <Tab defaultActiveKey="chat" items={tabItems} />
      </div>
    </div>
  );
}

export { Room };
