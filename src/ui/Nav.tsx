"use client"
import { useState } from 'react';
import Logo1 from "../../public/assets/img/Logo1.png";
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from "framer-motion"

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: 0.3
    }
  }
}

const menuItemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100
    }
  })
}

const mobileMenuVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3
    }
  },
  exit: {
    x: '100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.2
    }
  }
}

interface NavProps {
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ setIsAdmin  } : NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Agendar', href: '#agenda' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'QuemSomos', href: '#quemsomos' },
    { name: 'Gestor', href: '#admin', isAdmin: true },
  ];

  const handleAdminToggle = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <motion.nav 
      className="fixed top-0 z-50 w-full py-4 text-white bg-black"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image
            className="w-8 h-8 text-white"
            src={Logo1}
            alt='Logo'
            width={32}
            height={32}
          />
          <h3 className="font-serif text-xl font-bold uppercase">
            Danilo&apos;s 
            <span className="text-transparent uppercase tracking-wide bg-clip-text bg-gradient-to-r from-[#f97316] via-[#e88b49] to-[#ce966e] drop-shadow-lg">
              {' '}Barbearia Elite
            </span>
          </h3>
        </motion.div>

        {/* Menú Desktop */}
        <div className="hidden space-x-6 md:flex">
          {navigation.map((item) => (
            <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              if (item.name === 'Gestor') {
                e.preventDefault();
                handleAdminToggle();
              }
            }}
            className="relative font-serif hover:text-gray-300"
            whileHover={{ 
              scale: 1.05,
              color: '#e88b49'
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {item.name}
          </motion.a>
          ))}
        </div>

        {/* Botón Mobile */}
        <motion.div
          className="flex md:hidden"
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon aria-hidden="true" className="text-white size-6" />
          </button>
        </motion.div>
      </div>

      {/* Menú Mobile */}
      <AnimatePresence mode="sync">
        {mobileMenuOpen && (
          <Dialog static open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white"
            >
              <div className="flex items-center justify-between p-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src={Logo1}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="font-serif text-xl font-bold text-black">
                    Barbearia Elite
                  </span>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-700 rounded-full"
                >
                  <XMarkIcon className="size-6" />
                </motion.button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                className="px-6 py-4"
              >
                {navigation.map((item, i) => (
                  <motion.a
                  key={item.name}
                  variants={menuItemVariants}
                  custom={i}
                  href={item.href}
                  onClick={(e) => {
                    if (item.name === 'Gestor') {
                      e.preventDefault();
                      handleAdminToggle();
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="block px-4 py-3 mb-2 -mx-3 text-lg font-semibold text-gray-900 rounded-lg hover:bg-gray-100"
                  whileHover={{ 
                    x: 10,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  {item.name}
                </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}