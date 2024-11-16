"use client"
 

import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { pt } from "react-day-picker/locale";
import "react-day-picker/style.css";

interface MyDatePickerProps {
  onDateSelect: (date: Date | undefined) => void;
}

export default function MyDatePicker({ onDateSelect }: MyDatePickerProps) {
  const [selected, setSelected] = useState<Date>();

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);
    onDateSelect(date);
  };

  return (
    <DayPicker
      locale={pt}
      className="w-full"
      mode="single"
      selected={selected}
      onSelect={handleDateSelect}
      showOutsideDays
      footer={
        selected ? `Data selecionada: ${selected.toLocaleDateString()}` : "Escolha um dia."
      }
    />
  );
}