"use client"

import { useState } from 'react';
import MyDatePicker from "@/components/ui/DaysPicker";
import Button from '@/components/Button/Button';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import { TimeSlot } from '@/types/appointment';

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

  const handleAppointmentSuccess = async ({ name, email, phoneNumber }: { name: string; email:string, phoneNumber: string }) => {
    setShowForm(false);
    setSelectedTime(undefined);
    handleDateSelect(selectedDate);

    // Llamada a la API para crear la cita
    try {
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: selectedDate!.toISOString(),
                time: selectedTime,
                clientName: name,
                clientEmail: email,
                clientPhone: phoneNumber,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al crear la cita');
        }

        const appointmentData = await response.json();
        console.log('Cita creada:', appointmentData);

        // Mensaje de confirmación
        alert('¡Cita agendada con éxito!');

        // Genera el mensaje de WhatsApp
        const message = encodeURIComponent(`
            💈 *Confirmação de Agendamento na Barbearia* 💇‍♂️
            
            📋 *Detalhes do Agendamento:*
            - *Nome:* ${name}
            - *Data:* ${selectedDate?.toLocaleDateString('pt-BR')}
            - *Horário:* ${selectedTime}
            
            ✅ Obrigado por nos escolher! Estamos ansiosos para te atender. 😊
        `);

        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
        console.log("mensaje final", whatsappLink);

        // Abrir WhatsApp
        window.open(whatsappLink, '_blank');

    } catch (error) {
        console.error('Error al crear la cita:', error);
        alert('Hubo un problema al agendar la cita. Inténtalo de nuevo.');
    }
};

  return (
    <section id="agenda" className="sm:py-16 pt-[29rem] bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Agende seu Horário</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Selecione uma Data</h3>
            <div className="calendar-container">
              <MyDatePicker onDateSelect={handleDateSelect} />
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            {loading ? (
              <div className="text-center py-8">
                <p>Cargando horarios disponibles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <p>{error}</p>
              </div>
            ) : showForm ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">Complete sus datos</h3>
                <AppointmentForm
                  selectedDate={selectedDate!}
                  selectedTime={selectedTime!}
                  onSuccess={handleAppointmentSuccess}
                  onCancel={() => setShowForm(false)}
                />

              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">
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