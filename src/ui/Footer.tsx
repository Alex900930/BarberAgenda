import React from 'react';
import { MessageCircle, Share2, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Danilo&apos;s Barbearia Elite</h3>
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
  )
}
