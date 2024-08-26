import Link from "next/link";
import React from "react";

const GamePoinst = () => {
  return (
    <>
      <div>GamePoinst</div>
      <Link href="/dashboard" className="text-blue-600">Points</Link>
    </>
  );
};

export default GamePoinst;
