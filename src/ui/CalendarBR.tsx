'use client'

import { useState, useEffect } from 'react';
import { DayPicker, Formatters } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import TimeSlotPicker from './TimeSlotPicker';
import { motion } from 'framer-motion';
import {TimeSlot} from '@/types';

interface BookedDate {
  date: string;
  times: string[];
}

interface DisabledHours {
  [date: string]: string[];
}

const CalendarBR = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [disabledHours, setDisabledHours] = useState<DisabledHours>({});

 /*  const [availableSlots, setAvailableSlots] = useState([]); */

  // Nuevo método para obtener disponibilidad
const fetchAvailableSlots = async (date: Date) => {
  try {
    const dateKey = format(date, 'yyyy-MM-dd');
    const res = await fetch(`/api/available-slots?date=${dateKey}`);
    const data = await res.json();
    console.log(data);
  /*   setAvailableSlots(data); */
  } catch (error) {
    console.error('Error al obtener disponibilidad:', error);
  }
};

  // Obtener fechas reservadas
  const fetchBookedDates = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setBookedDates(data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  // Obtener horas deshabilitadas
  const fetchDisabledHours = async () => {
    try {
      const res = await fetch('/api/disabled-hours');
      const data = await res.json();
      setDisabledHours(data);
    } catch (error) {
      console.error('Error al obtener horarios deshabilitados:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
    fetchDisabledHours();
    if (selectedDate) fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  
  const formatters: Formatters = {
    formatDay: (date: Date) => format(date, 'd', { locale: ptBR }),
    formatCaption: (date: Date) => 
      `${format(date, 'd', { locale: ptBR })} de ${format(date, 'MMMM', { locale: ptBR })}`,
    
    // Funciones dummy para propiedades requeridas
    formatMonthDropdown: () => '',
    formatYearDropdown: () => '',
    formatWeekNumber: () => '',
    formatWeekdayName: () => '',
    formatMonthCaption: () => '',
    formatWeekNumberHeader: () => '',
    formatYearCaption: () => ''
  };

  // Manejar deshabilitación de horas

  // app/owner-page.tsx (o donde uses el TimeSlotPicker)
  const handleDisableHours = async (date: Date, slots: string[]) => {
    try {
      if (slots.includes('all')) {
        const dateStr = format(date, 'yyyy-MM-dd');
        const response = await fetch(`/api/available-slots?date=${dateStr}`);
        const data = await response.json();
        slots = data.map((slot: TimeSlot) => slot.time);
      }
  
      await Promise.all(
        slots.map(async (time) => {
          const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              date: date.toISOString(),
              time,
              clientName: "Dono da Barbearia",
              clientEmail: "owner@barberia.com",
              clientPhone: process.env.OWNER_PHONE_NUMBER || '+5585989329627',
              isOwnerReservation: true
            })
          });
          
          if (!response.ok) throw new Error('Error al crear reserva');
        })
      );
      
      // Actualizar la página completa
      window.location.reload();
  
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // Determinar si una fecha está deshabilitada
  const isDateDisabled = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return disabledHours[dateKey]?.includes('all');
  };

  return (
    <motion.div
      id="admin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7] px-4 sm:px-8 py-6 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="p-4 bg-white rounded-lg shadow-lg sm:p-6 sm:shadow-2xl sm:rounded-xl">
          <h1 className="text-2xl sm:text-3xl font-serif text-center mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#222831] to-[#00ADB5]">
            Painel Administrativo
          </h1>

          <div className="border border-[#f97316]/10 rounded-lg p-2 sm:p-4 mb-6 sm:mb-8 overflow-x-auto">
            <DayPicker
              locale={ptBR}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              formatters={formatters}
              modifiers={{
                disabled: (date) => isDateDisabled(date),
                booked: (date) => 
                  bookedDates.some(d => d.date === format(date, 'yyyy-MM-dd'))
              }}
              modifiersClassNames={{
                booked: 'bg-red-100 hover:bg-red-100 text-red-500 font-medium',
                disabled: 'opacity-50 cursor-not-allowed grayscale'
              }}
              className="text-sm sm:text-base text-gray-800 [--rdp-cell-size:32px] sm:[--rdp-cell-size:40px]"
              styles={{
                head_cell: {
                  color: '#6b7280',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                },
                day: {
                  borderRadius: '6px',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem'
                },
                caption_label: {
                  fontSize: '1rem'
                },
                nav_button: {
                  width: '1.5rem',
                  height: '1.5rem'
                }
              }}
            />
          </div>

          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#f97316]/10"
            >
              <TimeSlotPicker
                selectedDate={selectedDate}
                disabledHours={disabledHours}
                onDisableHours={handleDisableHours}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarBR;