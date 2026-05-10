"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-purple via-neon-blue to-neon-gold bg-clip-text text-transparent mb-4"
      >
        Axyntrax Automation
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl"
      >
        Orquestación inteligente con <span className="text-neon-blue">Atlas</span>. Automatización, monitoreo y decisiones en tiempo real para la era 2026.
      </motion.p>
    </section>
  );
}
