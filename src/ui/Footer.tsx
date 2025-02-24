import React from 'react';
import { MessageCircle, Share2, Phone } from 'lucide-react';
import { motion } from "motion/react";
export default function Footer() {
  return (
     <motion.div
     initial={{ opacity: 0, y: 50 }} // Animación inicial
     whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en vista
     transition={{ duration: 0.5 }} // Duración de la animación
     viewport={{ once: true }} // Para que solo se anime una vez
            >
                <footer className="py-8 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-center md:text-left md:mb-0">
              <h3 className="font-serif text-xl font-bold uppercase">Danilo&apos;s 
              <span className="text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#f97316] via-[#e88b49] to-[#ce966e] drop-shadow-lg"> Barbearia Elite</span></h3>
              <p className="text-gray-400">Qualidade e estilo desde 2020</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-300">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Share2 className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
            </motion.div>
  
  )
}
