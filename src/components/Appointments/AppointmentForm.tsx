"use client"

import { useState } from 'react';

interface AppointmentFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  selectedDate,
  selectedTime,
  onSuccess,
  onCancel
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(), // Aseguramos que la fecha se envíe en formato ISO
          time: selectedTime,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cita');
      }

      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la cita');
      console.error('Error al crear la cita:', error);
    } finally {
      setLoading(false);
    }
  };

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
          onChange={(e) => setFormData(prev => ({
            ...prev,
            clientName: e.target.value
          }))}
        />
      </div>

      <div>
        <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="clientEmail"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientEmail}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            clientEmail: e.target.value
          }))}
        />
      </div>

      <div>
        <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="clientPhone"
          type="tel"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientPhone}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            clientPhone: e.target.value
          }))}
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