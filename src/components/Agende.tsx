"use client"
import { useState } from 'react';
import MyDatePicker from '@/components/ui/DaysPicker'
import Button from '@/components/Button/Button'
import AppointmentForm from "@/components/Appointments/AppointmentForm"
import { TimeSlot } from "@/types/appointment"
import { LoadingSpinner} from './Loading/LoadingSpinner';
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 120 }
  }
}

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200 }
  }
}

export default function Agende() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [showForm, setShowForm] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPastDateDialog, setShowPastDateDialog] = useState(false);

  const handleDateSelect = async (date: Date | undefined) => {
    
    setSelectedDate(date);
    setSelectedTime(undefined);
    setShowForm(false);
    setError('');

    if (date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        const selectedDateNormalized = new Date(date);
        selectedDateNormalized.setHours(0, 0, 0, 0);

        if (selectedDateNormalized < today) {
          setShowPastDateDialog(true);
          setAvailableSlots([]); 
          return;
        }
        
      setLoading(true);
      try {
        const dateString = date.toISOString().split('T')[0];
       
        const response = await fetch(`/api/available-slots?date=${dateString}`);
    
        if (!response.ok) throw new Error(await response.text());
    
        const slots = await response.json();
     
        setAvailableSlots(slots.filter((slot: TimeSlot) => slot.available));
        
      } catch (error) {
        setError('Error al cargar horarios');
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

  const handleAppointmentSuccess = async (clientInfo: {
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    if (!selectedDate || !selectedTime) return;
  
    try {
      // Normalizar fecha a UTC
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(0, 0, 0, 0); // Asegurar hora UTC
      
      // 1. Guardar la cita en la base de datos
      const appointmentResponse = await fetch("/api/appointments", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          date: appointmentDate.toISOString(),
          time: selectedTime,
          clientName: clientInfo.name,
          clientEmail: clientInfo.email,
          clientPhone: clientInfo.phoneNumber
        })
      });
  
      const responseData = await appointmentResponse.json();
      
      if (!appointmentResponse.ok) {
        throw new Error(responseData.message || "Error al guardar la cita");
      }
  
      // 2. Redirigir a WhatsApp
      const formattedDate = `${appointmentDate.toISOString().split("T")[0]} ${selectedTime}`;
      
      const whatsappMessage = `Olá! Gostaria de confirmar meu horário agendado:
  Fecha: ${formattedDate}
  Nombre: ${clientInfo.name}
  Email: ${clientInfo.email}
  Teléfono: ${clientInfo.phoneNumber}`;
  
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${process.env.OWNER_PHONE_NUMBER}?text=${encodedMessage}`;
      
      // Abrir en nueva pestaña
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
  
      // 3. Resetear estado
      toast.success('Horário agendado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
  
      // Actualizar slots disponibles
      /* const dateKey = appointmentDate.toISOString().split("T")[0]; */
      const updatedSlots = availableSlots.filter(slot => slot.time !== selectedTime);
      setAvailableSlots(updatedSlots);
      
      // Resetear formulario
      setShowForm(false);
      setSelectedTime(undefined);
       // Actualizar la página completa
       window.location.reload();
  
    } catch (error) {
      console.error("Error en el proceso:", error);
      toast.error(error instanceof Error ? error.message : 'Error al procesar la cita', {
        position: "top-right",
        theme: "colored",
        autoClose: 5000
      });
    }
  };

  return (
    <motion.section
      id="agenda"
      className="sm:py-16 pt-12 pb-12 bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <div className="container px-4 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2 
            className="mb-12 font-serif text-4xl font-extrabold text-center text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#222831] via-[#393E46] to-[#00ADB5] drop-shadow-lg"
            variants={itemVariants}
          >
            Agende 
            <motion.span 
              className='text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#f97316] via-[#e88b49] to-[#ce966e] drop-shadow-lg'
              variants={itemVariants}
            >
              {' '}seu Horário
            </motion.span>
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Date Picker Card */}
          <motion.div 
            className="p-6 rounded-lg shadow-lg bg-gray-50"
            variants={cardVariants}
          >
            <h3 className="mb-4 font-serif text-xl font-semibold text-gray-800">
              Escolha uma Data
            </h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MyDatePicker onDateSelect={handleDateSelect} />
            </motion.div>
          </motion.div>

          {/* Time Slots Card */}
          <motion.div 
  className="p-6 rounded-lg shadow-lg bg-gray-50"
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  key="main-card"
>
    {loading ? (
      <motion.div
        key="loading"
        className="py-8 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ 
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.2 }
        }}
      >
        <LoadingSpinner />
      </motion.div>
    ) : error ? (
      <motion.div
        key="error"
        className="py-8 text-center text-red-600"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, mass: 0.5 }}
      >
        {error}
      </motion.div>
    ) : showForm ? (
     
        <AppointmentForm
          selectedDate={selectedDate!}
          selectedTime={selectedTime!}
          onSuccess={handleAppointmentSuccess}
          onCancel={() => setShowForm(false)}
        />
      
    ) : (
      <motion.div 
        key="slots"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        className="w-full"
      >
        <h3 className="mb-4 font-serif text-xl font-semibold text-gray-800">
          {selectedDate ? "Horários Disponíveis" : "Selecione uma data"}
        </h3>
        <motion.div 
          className="grid grid-cols-3 gap-2"
          layout
        >
          {availableSlots.map((slot, index) => (
            <motion.div
              key={slot.time}
              variants={itemVariants}
              custom={index}
              layout
            >
              <Button
                title={slot.time}
                disabled={!slot.available}
                selected={selectedTime === slot.time}
                onClick={() => handleTimeSelect(slot.time)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )}
 
</motion.div>
        </motion.div>

        {/* Past Date Dialog */}
        <AnimatePresence mode="sync">
          {showPastDateDialog && (
            <Dialog open={showPastDateDialog} onOpenChange={setShowPastDateDialog}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Data inválida</DialogTitle>
                    <DialogDescription>
                      Selecione uma data futura
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button 
                      title='Aceptar' 
                      onClick={() => setShowPastDateDialog(false)}
                    />
                  </DialogFooter>
                </DialogContent>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>

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
        />
      </div>
    </motion.section>
  );
}