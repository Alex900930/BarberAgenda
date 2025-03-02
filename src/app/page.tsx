"use client"
import Agende from "@/components/Agende";
import CalendarBR from "@/ui/CalendarBR";
import Footer from "@/ui/Footer";
import Header from "@/ui/Header";
import Localizacion from "@/ui/Localizacion";
import Nav from "@/ui/Nav";
import QuemSomos from "@/ui/Quemsomos";
import Servicios from "@/ui/Servicios";
import { useState } from "react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Nav setIsAdmin={setIsAdmin} />
      <Header/>
      <Agende />
      {isAdmin && <CalendarBR />}
      <Servicios />
      <QuemSomos />
      <Localizacion />
      <Footer />
    </div>
  );
}