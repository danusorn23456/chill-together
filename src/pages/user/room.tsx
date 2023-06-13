import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Screen } from "~/feature/animation";
import { ChatWidget, useChatListener } from "~/feature/chat";
import { Tab, TabItems } from "~/feature/common";
import { YoutubeScreen, useMediaListener } from "~/feature/media";
import { OnlineUserWidget, RoomBanner } from "~/feature/room";
import { useRoomListener } from "~/feature/room";

/** This is a functional component called `Room` that renders a room page with various features such as
media player, chat widget, and online user list. It also manages the global state of these features
using custom hooks `useRoomListener`, `useMediaListener`, and `useChatListener` */

function Room() {
  // manage room feature global state
  const { leaveRoom } = useRoomListener();
  // manage media feature global state
  useMediaListener();
  // manage chat feature global state
  useChatListener();
  // after listener you can access global state of all feature everywhere

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
      content: <OnlineUserWidget />,
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
    <div className="flex flex-col md:flex-row flex-1">
      <div className="flex-1 md:flex-2 relative">
        <Screen>
          <YoutubeScreen />
        </Screen>
      </div>
      <div className="flex-1 md:flex-initial md:w-96 flex flex-col overflow-hidden bg-gray-900 z-20">
        <Tab defaultActiveKey="chat" items={tabItems} />
      </div>
    </div>
  );
}

export { Room };
