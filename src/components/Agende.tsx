"use client"

import {useState } from 'react';
import MyDatePicker from "@/components/ui/DaysPicker";
import Button from '@/components/Button/Button';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import { TimeSlot } from '@/types/appointment';
import { LoadingSpinner} from './Loading/LoadingSpinner';
import { ToastContainer, toast, Bounce  } from 'react-toastify';
/* import * as motion from "motion/react-client" */

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

  const handleAppointmentSuccess = async ({
    name,
    email,
    phoneNumber,
  }: {
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    if (!selectedDate || !selectedTime) {
      console.error("Fecha y hora no seleccionadas");
      return;
    }
  
    const appointmentData = {
      date: selectedDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      time: selectedTime,
      clientName: name,
      clientEmail: email,
      clientPhone: phoneNumber,
    };
  
    console.log("Enviando cita a la API:", appointmentData);
  
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        throw new Error("Error al agendar la cita");
      }
  
      const data = await response.json();
      console.log("Cita creada con éxito:", data);
  
      toast.success('Cita criada com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("Hubo un error al agendar la cita");
    }
  };
  
  return (
      <section
        id="agenda"
        className="sm:py-16 pt-12 pb-12  bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7]"
      >
            <div className="container px-4 mx-auto">
            <h2 className="mb-12 font-serif text-4xl font-extrabold text-center text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#222831] via-[#393E46] to-[#00ADB5] drop-shadow-lg">
        Agende seu Horário
      </h2>

<div className="grid grid-cols-1 gap-8 md:grid-cols-2">

<div className="p-6 rounded-lg shadow-lg bg-gray-50">
    <h3 className="mb-4 font-serif text-xl font-semibold text-gray-800">Escolha uma Data</h3>
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
        <h3 className="mb-4 font-serif text-xl font-semibold text-gray-800">
          Complete seus Dados
        </h3>
        <AppointmentForm
          selectedDate={selectedDate!}
          selectedTime={selectedTime!}
          onSuccess={handleAppointmentSuccess}
          onCancel={() => setShowForm(false)}
        />
      </div>
    ) : (
      <>
        <h3 className="mb-4 font-serif text-xl font-semibold text-gray-800">
          {selectedDate
            ? "Horários Disponíveis"
            : "Selecione uma data para ver os horários disponíveis"}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
    </section>
           

  );
}