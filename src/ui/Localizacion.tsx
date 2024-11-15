import React from 'react';
import {  Clock, MapPin } from 'lucide-react';

export default function Localizacion() {
  return (
    <section id="localizacao" className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Nossa Localização</h2>
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-black mr-2" />
          <p className="text-lg">Rua Da Palha, 123 - Caninde, CE</p>
        </div>
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-black mr-2" />
          <p className="text-lg">Seg - Sab: 09:00 - 19:00</p>
        </div>
      </div>
    </div>
  </section>
  )
}
