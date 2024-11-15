import React from 'react'

export default function Nav() {
  return (

      <nav className="bg-black text-white py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor">
              <path d="M7 8h10M7 12h10M7 16h10M3 4h18v16H3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 4v16M16 4v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold">Danilo&apos;s Barbearia Elite</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#agenda" className="hover:text-gray-300">Agendar</a>
            <a href="#servicos" className="hover:text-gray-300">Serviços</a>
            <a href="#localizacao" className="hover:text-gray-300">Localização</a>
          </div>
        </div>
      </nav>
  )
}
