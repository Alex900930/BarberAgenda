'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirigir directamente al calendario
    router.push('/CalendarBr')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8F9FA] to-[#DDE1E7] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center mb-8"
        >
          <Image 
            src="/assets/img/Logo1.png" 
            alt="Logo" 
            className="w-16 h-16 mb-4"
            width={64}
            height={64}
          />
          <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#ce966e]">
            Acceso Demostración
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-serif text-gray-700">
              Email (demo)
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
              disabled
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-serif text-gray-700">
              Contraseña (demo)
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
              disabled
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#f97316] to-[#ce966e] text-white py-3 rounded-xl font-serif font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Calendario
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => router.push('/')}
            className="text-[#f97316] hover:text-[#ce966e] font-serif transition-colors"
          >
            ← Volver al inicio
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}