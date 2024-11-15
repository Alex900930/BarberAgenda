import  Button from "../components/Button/Button";


export default function Header() {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6">Danilo's Barbearia Elite</h1>
          <p className="text-xl mb-8">Estilo e Profissionalismo em Cada Corte</p>
          <Button title="Agende seu Horário" />
        </div>
      </section>
  )
}
