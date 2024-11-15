import React from 'react'
import { servicos } from '@/utils/servicios';
import { Clock } from 'lucide-react';

export default function Servicios() {
  return (
    <section id="servicos" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicos.map((servico, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{servico.nome}</h3>
            <p className="text-gray-600 mb-4">{servico.descricao}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-black">{servico.preco}</span>
              <span className="text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {servico.tempo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
