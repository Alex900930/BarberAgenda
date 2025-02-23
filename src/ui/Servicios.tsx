import React from "react";
import Image from "next/image";
import { servicios } from "@/utils/servicios";
import { Clock } from "lucide-react";

export default function HeroServices() {
  return (
    <div>
      {/* Hero Section - Video de Fondo */}
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Asegúrate de que la ruta del video sea correcta */}
          <source src="/assets/video/istockphoto-2154864375-192_srp.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 py-32 text-center text-white">
          <h1 className="text-5xl font-bold">Bem-vindo ao Melhor Corte</h1>
          <p className="mt-4 text-xl">Transforme seu estilo com os nossos serviços</p>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicos" className="py-16 bg-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-white">Nossos Serviços</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicios.map((servico, index) => (
              <div
                key={index}
                className="p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                <div className="relative mb-4">
                  <Image
                    src={servico.imagem}
                    alt={`Imagem de ${servico.nome}`}
                    layout="responsive"
                    width={400}
                    height={250}
                    className="object-cover rounded-md"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-30"></div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{servico.nome}</h3>
                <p className="mb-4 text-gray-600">{servico.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-black">{servico.preco}</span>
                  <span className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {servico.tempo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
