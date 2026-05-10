"use client";
import { motion } from "framer-motion";

const services = [
  { title: "Orquestación Atlas", desc: "Motor de automatización con agentes inteligentes.", colorClass: "text-neon-purple" },
  { title: "Monitoreo Cuántico", desc: "Dashboards en tiempo real con predicción de fallos.", colorClass: "text-neon-blue" },
  { title: "Asistente VICERO", desc: "Chatbot con IA generativa integrado al ecosistema.", colorClass: "text-neon-gold" },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        ¿Qué hacemos?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-dark-card border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-neon-purple/30 transition-all"
          >
            <h3 className={`text-xl font-semibold ${s.colorClass}`}>{s.title}</h3>
            <p className="text-gray-400 mt-2">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
