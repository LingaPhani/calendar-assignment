import React from "react";
import { format } from "date-fns";

export default function DayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  onSelect,
  events,
}) {
  const dayNum = format(date, "d");

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg p-2 h-[75px] border text-sm flex flex-col justify-between cursor-pointer
        transition-all duration-200 ease-in-out transform
        ${
          isSelected
            ? "border-blue-400 bg-blue-900/50 scale-105 shadow-lg shadow-blue-500/20"
            : isToday
            ? "border-blue-500 bg-neutral-800"
            : "border-gray-800 bg-neutral-900"
        }
        ${
          !isCurrentMonth
            ? "opacity-30"
            : "hover:border-blue-500 hover:bg-blue-950/40 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <span
          className={`font-semibold text-sm ${
            isToday ? "text-blue-400" : "text-blue-300"
          }`}
        >
          {dayNum}
        </span>
      </div>

      <div className="text-xs text-gray-400 truncate">
        {events.length > 0 && `${events.length} event${events.length > 1 ? "s" : ""}`}
      </div>
    </div>
  );
}

