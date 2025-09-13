import React from "react";

const MaintenanceScreen = ({ recoverFromMaintenance }: { recoverFromMaintenance: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-6">
      <div
        className="bg-white border border-gray-150 rounded-3xl p-10 max-w-md w-full text-center"
        style={{ boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="text-6xl mb-6">🔧</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">System Maintenance</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          AI system is currently under maintenance.
          <br />
          Please wait while we update our services...
        </p>
        <div className="text-8xl mb-6">😴</div>
        <p className="text-sm text-gray-500 mb-8">Our engineer is taking a well-deserved break</p>
        <button
          onClick={recoverFromMaintenance}
          className="bg-gray-600 text-white px-8 py-3 rounded-3xl hover:bg-gray-700 transition-all duration-200 font-medium"
          style={{ boxShadow: "0 4px 15px -2px rgba(0, 0, 0, 0.1)" }}
        >
          Wake Up System
        </button>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
