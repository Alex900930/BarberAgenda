import React from 'react'
import MyDatePicker from "@/components/ui/DaysPicker";
import { horarios } from '@/utils/horarios';
import Button from '@/components/Button/Button';

export default function Agende() {
  return (
    <section id="agenda" className="sm:py-16 pt-[29rem] bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Agende seu Horário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Selecione uma Data</h3>
              <div className="calendar-container">
                <MyDatePicker  />
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Horários Disponíveis</h3>
              <div className="grid grid-cols-3 gap-2">
                {horarios.map((horario) => (
                  <Button
                    key={horario}
                    title={horario}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
