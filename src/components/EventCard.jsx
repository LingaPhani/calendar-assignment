import React from "react";

const COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-sky-100 text-sky-700",
];

function colorForId(id) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return COLORS[sum % COLORS.length];
}

export default function EventCard({ event }) {
  const colorClass = colorForId(event.id || event.title);
  return (
    <div
      className={`px-2 py-1 rounded-md text-[11px] font-medium truncate shadow-sm ${colorClass}`}
      title={`${event.title} ${event.start}`}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="truncate">{event.title}</span>
        <span className="text-[10px] opacity-70">{event.start}</span>
      </div>
    </div>
  );
}
