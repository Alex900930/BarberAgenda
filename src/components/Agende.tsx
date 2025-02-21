"use client"

import {useState } from 'react';
import MyDatePicker from "@/components/ui/DaysPicker";
import Button from '@/components/Button/Button';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import { TimeSlot } from '@/types/appointment';
import { LoadingSpinner} from './Loading/LoadingSpinner';

export default function Agende() {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
    setShowForm(false);
    setError('');

    if (date) {
      setLoading(true);
      try {
        const response = await fetch(`/api/available-slots?date=${date.toISOString()}`);
        console.log("response", response);
        if (!response.ok) {
          throw new Error('Error al obtener horarios disponibles');
        }
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (error) {
        setError('Error al cargar horarios disponibles');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setAvailableSlots([]);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleAppointmentSuccess = ({ name, email, phoneNumber }: { name: string; email:string, phoneNumber: string }) => {

      console.log("Informacion que llego del usuario", name, email, phoneNumber);

  };
 
  return (
    <section id="agenda" className="sm:py-16 pt-[29rem] bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Agende seu Horário</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="p-6 rounded-lg shadow-lg bg-gray-50">
            <h3 className="mb-4 text-xl font-semibold">Selecione uma Data</h3>
            <div className="calendar-container">
              <MyDatePicker onDateSelect={handleDateSelect} />
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-gray-50">
            {loading ? (
              <div className="py-8 text-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-600">
                <p>{error}</p>
              </div>
            ) : showForm ? (
              <div>
                <h3 className="mb-4 text-xl font-semibold">Complete sus datos</h3>
                <AppointmentForm
                  selectedDate={selectedDate!}
                  selectedTime={selectedTime!}
                  onSuccess={handleAppointmentSuccess}
                  onCancel={() => setShowForm(false)}
                />

              </div>
            ) : (
              <>
                <h3 className="mb-4 text-xl font-semibold">
                  {selectedDate 
                    ? "Horários Disponíveis" 
                    : "Seleccione una fecha para ver horarios disponibles"}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      title={slot.time}
                      disabled={!slot.available}
                      selected={selectedTime === slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}