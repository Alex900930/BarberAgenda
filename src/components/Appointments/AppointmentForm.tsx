"use client";

import { useState, useEffect } from 'react';

interface AppointmentFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSuccess: (data: { name: string; email:string; phoneNumber: string }) => void;
  onCancel: () => void;
}

const INITIAL_FORM_STATE = {
  clientName: '',
  clientEmail: '',
  clientPhone: ''
};

export default function AppointmentForm({
  selectedDate,
  selectedTime,
  onSuccess,
  onCancel
}: AppointmentFormProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const formatDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  };

  const formatPhoneNumber = (phone: string) => {
    try {
      console.log('Número de teléfono original:', phone);
      
      // Eliminar todos los caracteres no numéricos
      let cleaned = phone.replace(/\D/g, '');
      console.log('Número limpio:', cleaned);
      
      // Asegurarse de que tenga el código de país
      if (!cleaned.startsWith('55')) {
        cleaned = '55' + cleaned;
      }
      console.log('Número final formateado:', cleaned);
      
      return cleaned;
    } catch (error) {
      console.error('Error al formatear teléfono:', error);
      return '';
    }
  };

  const createClientMessage = () => {
    try {
      const formattedDate = formatDate(selectedDate);
      const message = `¡Hola! He confirmado mi cita en la barbería:
- Nombre: ${formData.clientName}
- Fecha: ${formattedDate}
- Hora: ${selectedTime}

¡Gracias!`;
      
      console.log('Mensaje creado:', message);
      return message;
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      return '';
    }
  };

  const createWhatsAppUrl = () => {
    try {
      console.log('Creando URL de WhatsApp...');
      console.log('Datos del formulario:', formData);
      
      const message = createClientMessage();
      console.log('Mensaje generado:', message);
      
      const formattedPhone = formatPhoneNumber(formData.clientPhone);
      console.log('Teléfono formateado:', formattedPhone);
      
      if (!message || !formattedPhone) {
        throw new Error('Datos inválidos para crear URL de WhatsApp');
      }

      const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      console.log('URL de WhatsApp generada:', url);
      return url;
    } catch (error) {
      console.error('Error al crear URL de WhatsApp:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const url = createWhatsAppUrl();
      if (url) {
        console.log('Actualizando whatsappUrl...');
        setWhatsappUrl(url); // Esto debe activar el useEffect
      }
       
      const formattedPhone = formatPhoneNumber(formData.clientPhone);
      const name =`${formData.clientName}`;
      const email = `${formData.clientEmail}`;
      
      onSuccess({ name, email, phoneNumber: formattedPhone });
      

    } catch (error) {
      const errorMessage = (error as Error).message || 'Error al crear la cita';
     setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log('useEffect ejecutado. whatsappUrl:', whatsappUrl);
    
    if (whatsappUrl) {
      console.log('Abriendo WhatsApp inmediatamente...');
      window.open(whatsappUrl, '_blank');
      setWhatsappUrl(null); // Evitar múltiples intentos de abrir la misma URL
    }
    
  }, [whatsappUrl]);
  

  // Agregamos un useEffect adicional para monitorear cambios en formData
  useEffect(() => {
    console.log('formData actualizado:', formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="clientName"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="clientEmail"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientEmail}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="clientPhone"
          type="text"
          required
          title="Ingrese un número de teléfono válido"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientPhone}
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Confirmando...' : 'Confirmar Cita'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}