"use client";

import { motion } from "framer-motion";
import { Wifi, Zap, Smartphone, Heart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Conexão Wi-Fi direta",
    description:
      "Conecta diretamente com sua Smart TV pela rede local. Latência ultra baixa, resposta em milissegundos.",
    color: "from-blue-500 to-cyan-500",
    badge: "Instantâneo",
  },
  {
    icon: Zap,
    title: "Latência sub-20ms",
    description:
      "Mais rápido que o controle físico. Cada toque é processado em tempo real, sem atrasos perceptíveis.",
    color: "from-yellow-500 to-orange-500",
    badge: "Ultra rápido",
  },
  {
    icon: Smartphone,
    title: "Interface premium",
    description:
      "Design iOS-inspired, gestos nativos, feedback háptico. Parece um app da Apple, não um controle remoto.",
    color: "from-purple-500 to-pink-500",
    badge: "iOS-level",
  },
  {
    icon: Heart,
    title: "Compatibilidade universal",
    description:
      "Funciona com Philips, LG, Samsung, Sony, TCL, Roku TV, Fire TV. Mais de 50 modelos testados.",
    color: "from-pink-500 to-rose-500",
    badge: "50+ modelos",
  },
  {
    icon: Shield,
    title: "100% privado",
    description:
      "Sem cloud, sem telemetria, sem rastreamento. Tudo funciona local na sua rede. Seus dados ficam com você.",
    color: "from-green-500 to-emerald-500",
    badge: "Zero cloud",
  },
  {
    icon: Sparkles,
    title: "Atalhos inteligentes",
    description:
      "Netflix, YouTube, Prime Video, Disney+ com um toque. Abre direto no app, sem navegar menus.",
    color: "from-indigo-500 to-violet-500",
    badge: "Smart",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
            <Sparkles className="h-3 w-3" />
            Recursos premium
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            Tudo que um controle remoto
            <br />
            <span className="gradient-text">deveria ser</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            Construímos o CONTROCOM para ser o controle remoto que você sempre quis.
            Cada detalhe pensado para eliminar fricção e entregar a melhor experiência possível.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              {/* Hover glow */}
              <div
                className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
