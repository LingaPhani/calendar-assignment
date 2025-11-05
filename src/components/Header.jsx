import React from "react";

export default function Header({ monthLabel, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          ◀
        </button>
        <h2 className="text-xl font-bold text-blue-300">{monthLabel}</h2>
        <button
          onClick={onNext}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          ▶
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Today:{" "}
        <span className="font-medium text-blue-400">
          {new Date().toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

