import React from "react";

const Header = () => {
  return (
    <div className="text-white px-4 py-2.5 flex items-center justify-between">
      <div className="grid gap-0.5">
        <h1 className="text-xl font-bold">AI Indian</h1>
        <p className="text-gray-200 text-xs">Advanced AI Assistant</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse" />
        <span className="text-xs font-medium">Online</span>
      </div>
    </div>
  );
};

export default Header;