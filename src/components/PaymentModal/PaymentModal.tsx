"use client"

import { useState } from 'react';
import {PaymentAppointmentDetails} from "../../../src/types/appointment";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
    appointmentDetails: PaymentAppointmentDetails | null;
  }
  
  const PaymentModal: React.FC<PaymentModalProps> = ({ 
    isOpen, 
    onClose, 
    onPaymentSuccess, 
    appointmentDetails 
  }) => {
    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | null>(null);
  
    // Si no está abierto, no renderizar nada
    if (!isOpen) return null;
  
    // Si no hay detalles de la cita, mostrar error
    if (!appointmentDetails) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p>Error: No hay detalles de la cita</p>
            <button 
              onClick={onClose} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      );
    }
  
    const handlePayment = () => {
      // Lógica de pago
      if (paymentMethod) {
    
        onPaymentSuccess();
      } else {
        alert('Por favor, seleccione un método de pago');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Confirmar Pago</h2>
          
          <div className="mb-4">
            <p><strong>Nombre:</strong> {appointmentDetails.name}</p>
            <p><strong>Fecha:</strong> {
              appointmentDetails.date instanceof Date 
                ? appointmentDetails.date.toLocaleDateString('pt-BR') 
                : appointmentDetails.date
            }</p>
            <p><strong>Hora:</strong> {appointmentDetails.time}</p>
          </div>
  
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Seleccione método de pago:</h3>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === 'pix' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200'
                }`}
                onClick={() => setPaymentMethod('pix')}
              >
                PIX
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === 'card' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                Tarjeta
              </button>
            </div>
          </div>
  
          <div className="flex justify-between">
            <button 
              onClick={onClose} 
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button 
              onClick={handlePayment}
              disabled={!paymentMethod}
              className={`px-4 py-2 rounded ${
                paymentMethod 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentModal;