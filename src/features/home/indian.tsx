"use client";

import React, { useState } from "react";
import Header from "./Header";
import ChatArea from "./ChatArea";
import EngineerStatus from "./EngineerStatus";
import MaintenanceScreen from "./MaintenanceScreen";

// Main App Component
const AIIndianApp = () => {
  const [messages, setMessages] = useState([
    {
      text: "インド人じゃないよ。そんなわけないじゃないか。私は高度なAIアシスタントです。何かお手伝いできることはありますか？",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [fatigue, setFatigue] = useState(0);
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [indianState, setIndianState] = useState("typing"); // typing, thinking, tired, sleeping
  const [messageCount, setMessageCount] = useState(0);

  // 返答パターン
  const getIndianResponse = (userMessage: string) => {
    const responses = [
      "Actually, this is very interesting question. Let me explain you properly...",
      "Basically, what you are asking is quite simple. You see, the thing is...",
      "Very good question! Actually I was working on similar issue yesterday only.",
      "Yes yes, I understand your problem. This is very common issue, actually.",
      "Actually, let me tell you one thing - this is exactly what I was discussing with my colleague.",
      "Basically, you need to understand the core concept first. Let me explain...",
      "Actually, this reminds me of one project I was working on. Very similar case.",
      "Yes, this is possible definitely. But you need to be careful about few things...",
      "Actually, in my experience, best approach is to start from basics. Let me tell you...",
      "Basically, what you want to achieve is quite straightforward. Actually...",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse + " " + userMessage.toLowerCase().includes("help")
      ? "I will help you definitely!"
      : "This should solve your problem, actually.";
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isInMaintenance) return;

    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setMessageCount((prev) => prev + 1);

    // 疲労度を増加
    const newFatigue = Math.min(fatigue + 10 + Math.random() * 15, 100);
    setFatigue(newFatigue);

    // インド人の状態を更新
    setIndianState("thinking");

    // 疲労度が100になったら確実にメンテナンス
    if (newFatigue >= 100) {
      setTimeout(() => {
        setIsInMaintenance(true);
        setIndianState("sleeping");
      }, 1000);
      return;
    }

    // 即座に返答
    const response = {
      text: getIndianResponse(currentInput),
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, response]);
    setIndianState("typing");
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // メンテナンス復旧
  const recoverFromMaintenance = () => {
    setIsInMaintenance(false);
    setFatigue(0);
    setIndianState("typing");
    const recoveryMessage = {
      text: "システムが復旧しました！実際のところ、いくつかのサービスを再起動する必要がありました。今度こそすべて正常に動作しています！",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, recoveryMessage]);
  };

  if (isInMaintenance) {
    return <MaintenanceScreen recoverFromMaintenance={recoverFromMaintenance} />;
  }

  return (
    <div className="min-h-screen  relative flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col gap-4 p-2">
        <ChatArea
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isInMaintenance={isInMaintenance}
          messageCount={messageCount}
        />

        <EngineerStatus indianState={indianState} fatigue={fatigue} />
      </div>
    </div>
  );
};

export default AIIndianApp;
