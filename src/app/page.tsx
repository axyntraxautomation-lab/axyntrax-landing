"use client";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";

const Logo3D = dynamic(() => import("@/components/Logo3D"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Navbar con Login */}
      <Navbar />

      {/* Fondo 3D */}
      <div className="absolute inset-0 z-0">
        <Logo3D />
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
      </div>

      {/* Chatbot CECILIA flotante */}
      <Chatbot />

      {/* Botón acceso JARVIS */}
      <a
        href="/dashboard"
        className="fixed bottom-8 left-8 px-6 py-3 bg-[#b380ff]/20 backdrop-blur-md rounded-full border border-[#b380ff]/40 text-[#b380ff] text-sm uppercase tracking-widest hover:bg-[#b380ff]/30 transition-all z-50 shadow-lg"
      >
        Entrar a JARVIS
      </a>
    </main>
  );
}
