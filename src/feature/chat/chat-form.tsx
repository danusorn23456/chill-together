import React from "react";

export interface ChatFormProps {}

function ChatForm({}: ChatFormProps) {
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="h-full flex flex-col">
        {/* header */}
        <div className="p-4">header</div>
        {/* body */}
        <div className="p-4 flex-1 bg-white w-full">a</div>
        {/* form */}
        <div className="p-4">
          <form>
            <input className="input" type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}

export { ChatForm };
