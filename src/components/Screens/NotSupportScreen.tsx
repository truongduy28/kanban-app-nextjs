import React from "react";

const NotSupportScreen = () => {
  return (
    <div className="fixed inset-0 z-10 bg-[#ffffff50] backdrop-blur-sm flex justify-center items-center">
      <div className="w-max text-center">
        <img src="/images/logo.png" alt="logo" className="w-28 mx-auto mb-5" />
        <p>🚫 🚫 🚫</p>
        <p className="font-medium text-gray-500 text-xl text-center">
          Kanban Zone currently does not support <br />
          small screen devices.
          <br /> Please come back on a larger device!
        </p>
      </div>
    </div>
  );
};

export default NotSupportScreen;
