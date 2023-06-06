import { ParticipantLists } from "../features/participant";
export interface ChatRoomProps {}

function ChatRoom({ ...rest }: ChatRoomProps) {
  return (
    <div {...rest}>
      ChatRoom
      <ParticipantLists />
    </div>
  );
}

export { ChatRoom };
