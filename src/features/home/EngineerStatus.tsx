import React from "react";

const EngineerStatus = ({ indianState, fatigue }: { indianState: string; fatigue: number }) => {
  const getIndianAnimation = () => {
    switch (indianState) {
      case "thinking":
        return "animate-pulse";
      case "tired":
        return "animate-bounce";
      case "sleeping":
        return "opacity-50";
      default:
        return "";
    }
  };

  const getIndianEmoji = () => {
    switch (indianState) {
      case "thinking":
        return "🤔";
      case "tired":
        return "😩";
      case "sleeping":
        return "😴";
      default:
        return "👨‍💻";
    }
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-sm p-4 flex items-center justify-center h-full"
      style={{ boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="text-center grid gap-2">
        {/* 絵文字 */}
        <div className={`text-5xl ${getIndianAnimation()}`}>{getIndianEmoji()}</div>

        {/* 疲労度 */}
        <div className="text-sm text-gray-600 font-semibold">Fatigue: {Math.round(fatigue)}%</div>

        {/* ゲージ */}
        <div className="w-48 bg-gray-200 rounded-full h-3 mx-auto">
          <div
            className="bg-gray-600 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${fatigue}%` }}
          ></div>
        </div>
        {fatigue > 70 && <div className="text-sm text-gray-500">😰 Tired</div>}
      </div>
    </div>
  );
};

export default EngineerStatus;