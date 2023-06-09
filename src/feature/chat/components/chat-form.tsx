import { FormEvent, useRef } from "react";
import { Avatar } from "../../common";
import { GetMessagesResult } from "../services";

export type ChatFormSubmit = (message: string) => any;

export interface ChatFormProps {
  messages: GetMessagesResult;
  onSubmit?: ChatFormSubmit;
}

function ChatForm({ messages, onSubmit }: ChatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = inputRef?.current?.value.trim();
    if (!value) {
      return "incase dont'have value";
    }
    onSubmit?.(value);
    form.reset();
  }

  return (
    <div className="w-full h-full bg-gray-900">
      <div className="h-full flex flex-col">
        {/* header */}
        <div className="p-4">header</div>
        {/* body */}
        <div className="p-4 flex-1 bg-white w-full">
          {messages.map((record) => (
            <div key={record.id}>
              <Avatar
                src={record.owner.avatar_url}
                alt={record.owner.username}
                width={32}
                height={32}
              />
              <div>{record.message}</div>
            </div>
          ))}
        </div>
        {/* form */}
        <div className="p-4">
          <form onSubmit={handleSendMessage}>
            <input ref={inputRef} className="input" type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}

export { ChatForm };
