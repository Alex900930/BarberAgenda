import React from 'react';
import { MessageCircle, Share2, Phone } from 'lucide-react';
import * as motion from "motion/react-client"
export default function Footer() {
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
                <footer className="py-8 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-center md:text-left md:mb-0">
              <h3 className="font-serif text-xl font-bold">Danilo&apos;s Barbearia Elite</h3>
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
