"use client"

import { useEffect, useState } from 'react';
import MyDatePicker from "@/components/ui/DaysPicker";
import Button from '@/components/Button/Button';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import { TimeSlot } from '@/types/appointment';
import { LoadingSpinner} from './Loading/LoadingSpinner';
import PaymentModal from './PaymentModal/PaymentModal';
import {PaymentAppointmentDetails} from "../types/appointment";

import {redirect} from "next/navigation";

import api from "@/api";

export default function Agende() {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    // Estados existentes
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentAppointmentDetails, setPaymentAppointmentDetails] = useState<PaymentAppointmentDetails | null>(null);

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

    // En lugar de crear directamente la cita, abre el modal de pago
    setPaymentAppointmentDetails({
      date: selectedDate,
      time: selectedTime,
      clientName: name,
      clientEmail: email,
      clientPhone: phoneNumber,
    });
    setShowPaymentModal(true);

  };

  useEffect(() => {
    console.log("Se actualizo el paymentdetails", paymentAppointmentDetails);
  },[paymentAppointmentDetails]);

  // Función para manejar el pago exitoso
  const handlePaymentSuccess = async () => {
    
    const url = await api.message.submit(message);

    redirect(url);

    try {

      if (!paymentAppointmentDetails) {
        throw new Error('No hay detalles de cita');
      }

      const formattedDate = paymentAppointmentDetails.date instanceof Date 
      ? paymentAppointmentDetails.date.toLocaleDateString('pt-BR')
      : paymentAppointmentDetails.date;

      console.log("ESte es el paymentdetails que llego desde el modal", paymentAppointmentDetails);

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentAppointmentDetails,
          paymentStatus: 'parcial'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }

      const appointmentData = await response.json();

      console.log('Datos de la cita creada:', appointmentData);
      
      // Enviar mensaje de WhatsApp
      const message = encodeURIComponent(`
        💈 *Confirmação de Agendamento na Barbearia* 💇‍♂️
        
        📋 *Detalhes do Agendamento:*
        - *Nome:* ${paymentAppointmentDetails.clientName}
        - *Data:* ${formattedDate}
        - *Horário:* ${paymentAppointmentDetails.time}
        
        ✅ Pagamento de reserva confirmado! 
        Valor restante será pago no dia do serviço.
      `);

      const whatsappLink = `https://wa.me/${paymentAppointmentDetails.clientPhone}?text=${message}`;
      window.open(whatsappLink, '_blank');

      // Resetear estados
      setShowPaymentModal(false);
      setPaymentAppointmentDetails(null);
      setShowForm(false);
      setSelectedTime(undefined);

    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert('Hubo un problema al agendar la cita. Inténtalo de nuevo.');
    }
  };

 /*  const handleAppointmentSuccessOld = async () => {
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
        alert('Agendamento confirmado com sucesso!');

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
}; */

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
      {showPaymentModal && paymentAppointmentDetails && (
  <PaymentModal 
    isOpen={showPaymentModal}
    onClose={() => setShowPaymentModal(false)}
    onPaymentSuccess={handlePaymentSuccess}
    appointmentDetails={paymentAppointmentDetails}
  />
)}
    </section>
  );
}