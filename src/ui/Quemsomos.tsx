import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client"

export default function QuemSomos() {
  return (
    <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
               <section id="quemsomos" className="py-16 bg-gray-100">
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
                <h2 className="mb-4 font-serif text-4xl font-bold text-gray-800 transition duration-500 transform font-poppins hover:scale-105">
                    Nossa História ✨
                </h2>
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
   
  );
}
