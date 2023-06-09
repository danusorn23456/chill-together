import { ChatForm, useChat } from "~/feature/chat";
import { OnlineUserTab, Screen, useRoom } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  const { onlineUsers } = useRoom();
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-1">
      <div className="flex-1 relative">
        <OnlineUserTab users={onlineUsers} />
        <Screen users={onlineUsers} />
      </div>
      <div className="w-60 lg:w-96">
        <ChatForm onSubmit={sendMessage} messages={messages} />
      </div>
    </div>
  );
}

export { Room };
