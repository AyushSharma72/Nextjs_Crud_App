import React from "react";

export default function DashboardLayout({ children, users, points }) {
  // users and points are slots here
  return (
    <div className="flex flex-col items-center">
      {/* page.jsx */}
      <h1 className="mt-10">{children}</h1>

      <div className="flex w-full mt-10 justify-around">
        {/* @users page.jsx */}
        <div className="w-1/4 flex justify-center border border-white h-[200px]">
          {users}
        </div>

        {/* @points page.jsx */}
        <div className="w-1/4 flex justify-center border border-white h-[200px]">
          {points}
        </div>
      </div>
    </div>
  );
}
