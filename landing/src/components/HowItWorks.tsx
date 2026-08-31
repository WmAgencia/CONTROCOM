"use client";

import { motion } from "framer-motion";
import { Wifi, Smartphone, Tv, Zap } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Abra o CONTROCOM",
    description: "Instale o app e abra pela primeira vez. Sem cadastro, sem login.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wifi,
    number: "02",
    title: "Conecte na Wi-Fi",
    description: "Celular e TV na mesma rede. O app encontra sua TV automaticamente.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Tv,
    number: "03",
    title: "TV encontrada",
    description: "Sua Philips 43PFG5100/78 aparece na lista. Toque para conectar.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    number: "04",
    title: "Controle total",
    description: "Use o controle premium. Tudo funciona com latência ultra baixa.",
    color: "from-yellow-500 to-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
            Setup em 30 segundos
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            Configurar é
            <br />
            <span className="gradient-text">ridiculamente fácil.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            Em menos de 30 segundos você sai do zero para o controle total da sua TV.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connector line */}
          <div className="absolute left-1/2 top-12 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 lg:block" />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className={`flex ${idx % 2 === 1 ? "lg:order-2 lg:justify-start" : "lg:justify-end"}`}>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-20 blur-2xl`}
                    />
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black">
                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color}`}
                      >
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-black shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className={idx % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-white/60">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
