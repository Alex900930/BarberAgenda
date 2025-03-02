'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-8 text-center bg-white shadow-xl rounded-xl"
      >
        <h1 className="text-4xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#ce966e]">
          Acceso Denegado
        </h1>
        <p className="mb-6 text-gray-600">
          No tienes permisos para acceder a esta sección
        </p>
        <Link
          href="/"
          className="bg-[#f97316] text-white px-6 py-2 rounded-full hover:bg-[#ce966e] transition-colors"
        >
          Volver al Inicio
        </Link>
      </motion.div>
    </div>
  )
}