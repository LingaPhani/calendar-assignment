import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-neutral-900 rounded-2xl shadow-2xl border border-gray-800 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-400">
          Calendar
        </h1>
        <Calendar />
      </div>
    </div>
  );
}
