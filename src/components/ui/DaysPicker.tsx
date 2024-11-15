"use client"
 

import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/style.css";

export default function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
     className="w-full"
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Escolha um dia."
      }
    />
  );
}