import React from "react";
import { FaPlay } from "react-icons/fa";

export default function Button() {
  return (
    <div>
      {" "}
      <button className="bg-red-600 uppercase flex items-center gap-x-2 text-xs text-white px-6 py-3  hover:bg-red-700 transition-colors">
        <FaPlay />
        Play Now
      </button>
    </div>
  );
}
