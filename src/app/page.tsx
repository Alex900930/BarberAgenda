"use client"
import Agende from "@/components/Agende";
import Footer from "@/ui/Footer";
import Header from "@/ui/Header";
import Localizacion from "@/ui/Localizacion";
import Nav from "@/ui/Nav";
import QuemSomos from "@/ui/Quemsomos";
import Servicios from "@/ui/Servicios";

export default function Home() {

  return (
    <div className="min-h-screen bg-white">
     
      <Nav />
      <Header/>
      <Agende />
       <Servicios />
      <QuemSomos />
      <Localizacion />
        <Footer />
      
      
    
    </div>
  );
}
