import Link from "next/link";
import React from "react";

const Points = () => {
  return (
    <>
      <div>Points of the users</div>
      <Link href="/dashboard/gamepoints" className="text-blue-600">Gamepoints</Link>
    </>
  );
};

export default Points;
