'use client'

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TimeSlotPickerProps {
  selectedDate: Date;
  disabledHours: { [key: string]: string[] };
  onDisableHours: (date: Date, slots: string[]) => void;
}

const TimeSlotPicker = ({
  selectedDate,
  disabledHours,
  onDisableHours
}: TimeSlotPickerProps) => {
  const [availableSlots, setAvailableSlots] = useState<{time: string; available: boolean;}[]>([]);
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`/api/available-slots?date=${dateStr}`);
      const data = await res.json();
      setAvailableSlots(data);
    };
    
    fetchAvailability();
  }, [selectedDate]);

  const handleSlotClick = (time: string) => {
    if (isOwnerMode) {
      setSelectedSlots(prev => 
        prev.includes(time) 
          ? prev.filter(t => t !== time) 
          : [...prev, time]
      );
    } 
  };

  const handleSaveDisabled = async () => {
    try {
      // 1. Crear citas reservadas para el dueño
      await onDisableHours(selectedDate, selectedSlots);
      
      // 2. Actualizar UI sin recargar la página
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`/api/available-slots?date=${dateStr}`);
      const data = await res.json();
      setAvailableSlots(data);
      
      setSelectedSlots([]);
    } catch (error) {
      console.error("Error al guardar horarios:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 mt-4 border-t"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Horários disponíveis - {format(selectedDate, 'dd/MM/yyyy')}
        </h3>
        
        <button
          onClick={() => setIsOwnerMode(!isOwnerMode)}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
         {isOwnerMode ? 'Modo Cliente' : 'Modo Gestor'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {availableSlots.map((slot) => {
          const isBooked = !slot.available;
          const isDisabled = disabledHours[format(selectedDate, 'yyyy-MM-dd')]?.includes(slot.time);
          
          return (
            <motion.button
              key={slot.time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSlotClick(slot.time)}
              disabled={isBooked || isDisabled}
              className={`p-2 rounded text-sm ${
                (isBooked || isDisabled) 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : selectedSlots.includes(slot.time) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {slot.time}
            </motion.button>
          );
        })}
      </div>

      {isOwnerMode && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onDisableHours(selectedDate, ['all'])}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Desativar Todo o Dia
          </button>
          <button
            onClick={handleSaveDisabled}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
           Salvar Horas Selecionadas
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TimeSlotPicker;