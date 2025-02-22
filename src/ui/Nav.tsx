import React from 'react';
import Logo1 from "../../public/assets/img/Logo1.png";
import Image from 'next/image';

export default function Nav() {
  return (

      <nav className="fixed top-0 z-50 w-full py-4 text-white bg-black">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-2">
            {/* <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor">
              <path d="M7 8h10M7 12h10M7 16h10M3 4h18v16H3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 4v16M16 4v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> */}
            <Image
                className="w-8 h-8 text-white"
                src={Logo1}
                alt='Logo'
                width={32}
                height={32}
            />
            <span className="text-xl font-bold">Danilo&apos;s Barbearia Elite</span>
          </div>
          <div className="hidden space-x-6 md:flex">
            <a href="#agenda" className="hover:text-gray-300">Agendar</a>
            <a href="#servicos" className="hover:text-gray-300">Serviços</a>
            <a href="#localizacao" className="hover:text-gray-300">Localização</a>
          </div>
        </div>
      </nav>
  )
}
