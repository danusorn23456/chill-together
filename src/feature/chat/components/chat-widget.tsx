import { FormEvent, useRef } from "react";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import { useUser } from "~/feature/auth";
import { roomIdState } from "~/feature/room/store";
import { supabase } from "~/service/supabase";
import { messagesState } from "../store";

export type ChatWidgetSubmit = (message: string) => any;

export interface ChatWidgetProps {}

function ChatWidget({}: ChatWidgetProps) {
  const user = useUser();
  const roomId = useRecoilValue(roomIdState);
  const messages = useRecoilValue(messagesState);

  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const message = inputRef?.current?.value.trim();

    if (!message) return console.log("message not found");

    const { error } = await supabase.from("messages").insert({
      id: v4(),
      room_id: roomId!,
      created_by: user.id,
      message: message,
    });

    console.log(
      `%c ${error ? "failed" : "success"} to send message`,
      "background:green;color:white;padding:4px;"
    );

    form.reset();
  }

  return (
    <div className="w-full h-full bg-gray-950">
      <div className="h-full flex flex-col">
        {/* body */}
        <div className="flex-1 w-full overflow-auto relative overflow-x-hidden bg-gray-900 fancy-scroll">
          <div className="absolute top-0 left-0 flex flex-col w-full">
            {messages?.map((record) => (
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
