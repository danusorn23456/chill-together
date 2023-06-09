import { FormEvent, useRef } from "react";
import { useChat } from "..";
import { useRecoilValue } from "recoil";
import { userRecordState } from "~/feature/auth";
import { roomState } from "~/feature/room/store";

export type ChatWidgetSubmit = (message: string) => any;

export interface ChatWidgetProps {}

function ChatWidget({}: ChatWidgetProps) {
  const { messages, sendMessage } = useChat();
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userRecordState);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = inputRef?.current?.value.trim();
    if (!value) {
      return "incase dont'have value";
    }
    sendMessage?.(value);
    form.reset();
  }

  return (
    <div className="w-full h-full bg-gray-950">
      <div className="h-full flex flex-col">
        {/* header */}
        <div
          className="p-4 flex-shrink-0 text-white bg-contain bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${room?.owner.avatar_url})`,
          }}
        >
          <h2 className="text-lg font-bold text-pink-500">{room?.name}</h2>
          <p>{room?.description}</p>
        </div>
        {/* body */}
        <div className="flex-1 w-full overflow-auto relative overflow-x-hidden bg-gray-900 fancy-scroll">
          <div className="absolute top-0 left-0 flex flex-col w-full">
            {messages.map((record) => (
              <div
                key={record.id}
                className="p-1 flex items-center odd:bg-gray-900 even:bg-gray-950 text-white"
              >
                <p className="text-xs text-blue-400">{record.owner.username}</p>
                <p className="text-xs ml-2 leading-none whitespace-normal break-all">
                  {record.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* form */}
        <div className="p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage}>
            <div className="flex">
              <input
                placeholder="write something"
                name="message"
                ref={inputRef}
                className="input rounded-r-none"
                type="text"
              />
              <button className="px-3 rounded-l-none rounded bg-gray-800 hover:bg-gray-700">
                ✍
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { ChatWidget };
