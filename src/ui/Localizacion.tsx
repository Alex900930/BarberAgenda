import React from "react";
import { Clock, MapPin } from "lucide-react";

export default function Localizacao() {
  return (
    <section id="localizacao" className="py-16 bg-white">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800 font-poppins">
          Nossa Localização 📍
        </h2>
        <div className="max-w-2xl p-8 mx-auto rounded-lg shadow-lg bg-gray-50">
          {/* Dirección */}
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-2 text-primary" />
            <p className="text-lg text-gray-700">
              Rua Da Palha, 123 - Canindé, CE
            </p>
          </div>
          {/* Horario */}
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-2 text-primary" />
            <p className="text-lg text-gray-700">Seg - Sab: 09:00 - 19:00</p>
          </div>
          {/* Botón para ver en el mapa */}
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps?q=Rua+Da+Palha,+123+-+Caninde,+CE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-lg font-semibold text-white transition duration-300 transform rounded-lg bg-primary hover:bg-orange-600 hover:scale-105"
            >
              Ver no Mapa 🗺️
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
