import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import DayCell from "./DayCell";
import eventsData from "../events.json";

function groupEventsByDate(events) {
  const map = {};
  events.forEach((e) => {
    const dateKey = e.date;
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(e);
  });
  return map;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventsByDate, setEventsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const grouped = groupEventsByDate(eventsData);
    Object.keys(grouped).forEach((k) => {
      grouped[k].sort((a, b) => a.start.localeCompare(b.start));
    });
    setEventsByDate(grouped);
  }, []);

  const handleMonthChange = (e) => setCurrentMonth(Number(e.target.value));
  const handleYearChange = (e) => setCurrentYear(Number(e.target.value));

  // Generate dynamic calendar dates
  const firstDay = new Date(currentYear, currentMonth, 1);
  const monthStart = startOfMonth(firstDay);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const rows = [];
  let day = startDate;
  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    rows.push(week);
  }

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const years = Array.from({ length: 15 }, (_, i) => 2020 + i);

  const selectedEvents = eventsByDate[selectedDate] || [];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-400">Month:</label>
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="bg-neutral-800 border border-gray-700 rounded-md px-3 py-1 text-blue-400 focus:outline-none"
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-400">Year:</label>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="bg-neutral-800 border border-gray-700 rounded-md px-3 py-1 text-blue-400 focus:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-400">
          Today:{" "}
          <span className="font-medium text-blue-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      
      {/* Calendar grid section (border only around days) */}
<div className="space-y-2">
  {/* Days header + grid inside border box */}
  <div className="rounded-xl border border-gray-700 bg-neutral-950 shadow-inner p-3">
    {/* Weekday headers */}
    <div className="grid grid-cols-7 text-center text-blue-400 font-semibold border-b border-gray-700 pb-2 mb-3">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>

    {/* Calendar grid */}
    <div className="grid grid-cols-7 gap-3">
      {rows.flat().map((date, idx) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const dayEvents = eventsByDate[dateStr] || [];
        return (
          <DayCell
            key={idx}
            date={date}
            isCurrentMonth={isSameMonth(date, monthStart)}
            isToday={isSameDay(date, new Date())}
            isSelected={selectedDate === dateStr}
            onSelect={() => setSelectedDate(dateStr)}
            events={dayEvents}
          />
        );
      })}
    </div>
  </div>
</div>


      {/* Events section */}
      <div className="bg-neutral-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">
          Events on {selectedDate}
        </h3>

        {selectedEvents.length > 0 ? (
          <ul className="space-y-2">
            {selectedEvents.map((ev) => (
              <li
                key={ev.id}
                className="p-3 bg-neutral-700 rounded-lg flex justify-between text-sm hover:bg-neutral-600 transition"
              >
                <span>{ev.title}</span>
                <span className="text-gray-300">{ev.start}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No events scheduled.</p>
        )}
      </div>
    </div>
  );
}
