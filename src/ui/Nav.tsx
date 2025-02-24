"use client"
import { useState } from 'react';
import Logo1 from "../../public/assets/img/Logo1.png";
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import * as motion from "motion/react-client"

export default function Nav() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navigation = [
    { name: 'Agendar', href: '#agenda' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'QuemSomos', href: '#quemsomos' },
  ]

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
                 <nav className="fixed top-0 z-50 w-full py-4 text-white bg-black">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-2">
            <Image
                className="w-8 h-8 text-white"
                src={Logo1}
                alt='Logo'
                width={32}
                height={32}
            />
            <h3 className="font-serif text-xl font-bold uppercase">Danilo&apos;s 
            <span className="text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#f97316] via-[#e88b49] to-[#ce966e] drop-shadow-lg"> Barbearia Elite</span></h3>
            
          </div>
          <div className="hidden space-x-6 md:flex">
            <a href="#agenda" className="font-serif hover:text-gray-300">Agendar</a>
            <a href="#quemsomos" className="font-serif hover:text-gray-300">QuemSomos</a>
            <a href="#servicos" className="font-serif hover:text-gray-300">Serviços</a>
            <a href="#localizacao" className="font-serif hover:text-gray-300">Localização</a>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => {
                console.log('mobileMenuOpen', mobileMenuOpen);
                setMobileMenuOpen(true);
              }}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="text-white size-6" />
            </button>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu open state. */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  alt=""
                  src={Logo1}
                  className="w-auto h-8"
                  width={32}
                  height={32}
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </nav>
              </motion.div>
     
  )
}
