import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { Screen } from "~/feature/animation";
import { userState } from "~/feature/auth";
import { ChatWidget, useChatListener } from "~/feature/chat";
import { Tab, TabItems } from "~/feature/common";
import { YoutubeScreen, musicState, useMediaListener } from "~/feature/media";
import {
  OnlineUserWidget,
  RoomBanner,
  roomState,
  usersInRoomState,
} from "~/feature/room";
import { useRoomListener } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  // perform realtime subscribe
  // main work of listener is to set state global state of each event
  const { leaveRoom } = useRoomListener();
  useMediaListener();
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
