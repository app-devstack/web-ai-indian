import React, { KeyboardEvent, useEffect, useRef } from "react";
import ChatMessage, { ChatMessageType } from "./ChatMessage";

export type ChatAreaProps = {
  messages: ChatMessageType[];
  inputValue: string;
  setInputValue: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: KeyboardEvent) => void;
  isInMaintenance: boolean;
  messageCount: number;
};

const ChatArea = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isInMaintenance,
  messageCount,
}: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="overflow-y-auto flex-1 bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col"
      style={{ boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.08)" }}
    >
      {/* メッセージ表示エリア */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white rounded-t-3xl">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="p-6 bg-white rounded-b-3xl">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              console.log(e.target);
              setInputValue((e.target as HTMLInputElement)?.value || "");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Ask AI Indian anything..."
            className="flex-1 border border-gray-200 rounded-3xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 text-sm"
            disabled={isInMaintenance}
            style={{ boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.04)" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isInMaintenance || inputValue.trim() === ""}
            className="bg-gray-600 text-white px-8 py-3 rounded-3xl hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
            style={{ boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)" }}
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-3">
          Messages sent: {messageCount} | Status: {isInMaintenance ? "Maintenance" : "Active"}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
