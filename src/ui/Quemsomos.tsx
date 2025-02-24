import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function QuemSomos() {
  return (
    <div>
         <motion.div
               initial={{ opacity: 0, y: 50 }} // Animación inicial
               whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en vista
               transition={{ duration: 0.5 }} // Duración de la animación
               viewport={{ once: true }} // Para que solo se anime una vez
            >
               <section id="quemsomos" className="py-16 bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7]">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Imagen que ocupa 2 columnas en pantallas grandes */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Image
                src="/assets/img/hombre-salon-peluqueria-haciendo-corte-pelo-barba_1303-20935.jpg"
                alt="Corte Masculino"
                width={1000}
                height={600}
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-12 text-center md:text-left lg:col-span-1">
                <motion.h2 
                 className="mb-4 font-serif text-4xl font-bold text-gray-800 uppercase transition duration-500 transform font-poppins hover:scale-105"
                 initial={{ y: -150 }} // Animación inicial
                 whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en vista
                 transition={{ duration: 0.5 }} // Duración de la animación
                 viewport={{ once: true }} // Para que solo se anime una v
                 >
                    Nossa <span className="text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#f97316] via-[#e88b49] to-[#ce966e] drop-shadow-lg">História</span> ✨
                </motion.h2>
                <p className="mb-4 text-xl font-semibold transition duration-500 transform text-primary hover:scale-105">
                    Começa em 2018 ⏳
                </p>
                <p className="mb-8 text-lg text-gray-600 transition duration-500 transform opacity-90 hover:opacity-100 hover:scale-105">
                    Com uma variedade de estilos, buscamos proporcionar uma experiência satisfatória aos nossos clientes. 💇‍♂️
                </p>
                <p className="mb-8 text-lg text-gray-600 transition duration-500 transform opacity-90 hover:opacity-100 hover:scale-105">
                    Oferecemos desde cortes simples ✂️ até os mais elaborados e sofisticados, além de uma linha completa de produtos para cuidados masculinos. 🧴
                </p>
                <p className="mb-8 text-lg text-gray-600 transition duration-500 transform opacity-90 hover:opacity-100 hover:scale-105">
                    Nosso espaço proporciona entretenimento durante a espera 🎮, em um ambiente confortável e familiar 🏠, onde cada corte se torna uma experiência incrível. 🌟
                </p>
        </div>

        
        </div>
      </div>
    </section>
            </motion.div>
    </div>
   
   
  );
}
