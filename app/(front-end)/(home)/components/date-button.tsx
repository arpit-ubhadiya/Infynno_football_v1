'use client'

import { ComponentPropsWithoutRef } from "react";

type DateButtonProps = {
  day: string;
  date: string;
  isActive?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function DateButton({ day, date, isActive = false, onClick }: DateButtonProps) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center py-1 px-3 rounded-[10px] cursor-pointer ${isActive ? "border border-[#c3cc5a]" : "bg-[#2c2c2c]"}`}>
      <span className="text-white text-[12px]">{day}</span>
      <span className="text-white text-[12px] font-medium">{date}</span>
    </button>
  )
}