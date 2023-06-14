import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useMemo } from "react";
import { AnimatedAvatar, Screen } from "~/feature/animation";
import { useUser } from "~/feature/auth";
import { ChatWidget, useChatListener } from "~/feature/chat";
import { Tab, TabItems } from "~/feature/common";
import { Playlist, Youtube, usePlaylistListener } from "~/feature/playlist";
import { OnlineUserWidget, RoomBanner, useRoomId } from "~/feature/room";
import { useRoomListener } from "~/feature/room";
import { useRoomLayout } from "~/layouts/hooks";

function Room() {
  const roomId = useRoomId();
  const user = useUser();

  const {
    room,
    leaveRoom,
    onlineUsers,
    loading: roomLoading,
  } = useRoomListener({ roomId, user });

  const {
    playlists,
    currentPlaying,
    endPlaylist,
    listenToMusic,
    fullAccess,
    loading: playlistLoading,
  } = usePlaylistListener({
    room,
    user,
  });

  const {
    messages,
    sendMessage,
    loading: messageLoading,
  } = useChatListener({
    room,
    user,
    users: onlineUsers,
  });

  const { setTimer, setTitle, reset } = useRoomLayout({
    title: currentPlaying?.playlist_title,
  });

  const tabItems: TabItems = useMemo(() => {
    return [
      {
        key: "chat",
        icon: <ChatBubbleLeftEllipsisIcon />,
        content: (
          <div className="h-full flex flex-col">
            <RoomBanner room={room} />
            <ChatWidget messages={messages} onSend={sendMessage} />
          </div>
        ),
      },
      {
        key: "users",
        icon: <UserCircleIcon />,
        content: <OnlineUserWidget users={onlineUsers} />,
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
  }, [room, onlineUsers, messages, sendMessage]);

  const loading = roomLoading || playlistLoading || messageLoading;

  return (
    <div className="flex flex-col lg:flex-row flex-1">
      {loading ? (
        <div className="animated-fade-in absolute top-0 left-0 w-full h-full bg-blue-900/50"></div>
      ) : (
        <></>
      )}
      <div className="flex-1 lg:flex-2 relative">
        <Screen
          render={onlineUsers?.map((user, index) => (
            <AnimatedAvatar
              key={index}
              src={user.avatar_url}
              name={user.username}
              prefix={user.is_owner ? "owner" : ""}
              coordinates={user.coordinates}
            />
          ))}
          children={
            currentPlaying?.playlist_id ? (
              <Youtube
                onLoad={(title) => setTitle(title)}
                title={currentPlaying?.playlist_title}
                id={currentPlaying?.playlist_id}
                played_at={currentPlaying?.played_at}
                onTimer={setTimer}
                fullAccess={fullAccess}
                onEnd={async () => await endPlaylist().then(() => reset())}
              />
            ) : !fullAccess ? (
              <h2 className="text-white text-center text-xs mx-auto sm:text-sm">
                WAITING FOR ROOM OWNER PLAY SOME MUSIC . . .
              </h2>
            ) : (
              <Playlist
                playlists={playlists}
                onSelect={({ id }) => listenToMusic(id)}
              />
            )
          }
        />
      </div>
      <div className="flex-1 lg:flex-initial lg:w-96 flex flex-col overflow-hidden bg-gray-900 z-20">
        <Tab defaultActiveKey="chat" items={tabItems} />
      </div>
    </div>
  );
}

export { Room };
