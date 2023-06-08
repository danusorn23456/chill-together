import { FormEvent, useRef } from "react";
import { APIgetMessagesResult } from "./api-get-messages";

export type ChatFormSubmit = (message: string) => any;

export interface ChatFormProps {
  messages: APIgetMessagesResult;
  onSubmit?: ChatFormSubmit;
}

function ChatForm({ messages, onSubmit }: ChatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!inputRef.current) {
      return console.warn("input node not found");
    }
    onSubmit?.(inputRef.current.value);
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
            <div id={record.id}>{record.message}</div>
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
