import React from "react";

export default function CircularProgress({ percentage, color, icon }) {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 1;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center relative">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span
        className={`absolute text-xs font-semibold bg-zinc-200/50 h-[65%] text-[${color}]  w-[65%] rounded-full flex items-center justify-center`}
      >
        {icon ? icon : `${percentage}%`}
      </span>
    </div>
  );
}
