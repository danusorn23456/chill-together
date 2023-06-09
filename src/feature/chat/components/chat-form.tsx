import { FormEvent, useRef } from "react";
import { Avatar } from "../../common";
import { useChat } from "..";
import { useRecoilValue } from "recoil";
import { userRecordState } from "~/feature/auth";

export type ChatFormSubmit = (message: string) => any;

export interface ChatFormProps {}

function ChatForm({}: ChatFormProps) {
  const { messages, sendMessage } = useChat();
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
    <div className="w-full h-full bg-gray-900">
      <div className="h-full flex flex-col">
        {/* header */}
        <div className="p-4 flex-shrink-0">header</div>
        {/* body */}
        <div className="flex-1 bg-white w-full overflow-auto relative overflow-x-hidden">
          <div className="absolute top-0 left-0 flex flex-col">
            {messages.map((record) => (
              <div
                key={record.id}
                className="p-1 flex items-center odd:bg-zinc-800 even:bg-gray-950 text-white"
              >
                <p className="text-sm">{record.owner.username}</p>
                <p className="text-sm indent-4 leading-none whitespace-normal break-all">
                  {record.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* form */}
        <div className="p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage}>
            <input ref={inputRef} className="input" type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}

export { ChatForm };
