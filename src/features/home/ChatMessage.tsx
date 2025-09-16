// import { formatDate } from "date-fns";
import React from "react";

export type ChatMessageType = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-5 py-4 rounded-3xl ${
          message.isUser
            ? "bg-gray-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-700 border border-gray-200/50"
        }`}
        style={{
          boxShadow: message.isUser
            ? "0 4px 15px -2px rgba(0, 0, 0, 0.08)"
            : "0 2px 10px -1px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-relaxed">{message.text}</p>
          {/* <p className="text-xs opacity-60">{formatDate(message.timestamp, "MM/dd HH:mm")}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
