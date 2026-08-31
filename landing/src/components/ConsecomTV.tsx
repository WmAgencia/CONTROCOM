"use client";

import { motion } from "framer-motion";
import { Tv, Usb, Play, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

const supportedApps = [
  { name: "Netflix", color: "from-red-600 to-red-800", letter: "N" },
  { name: "YouTube", color: "from-red-500 to-red-700", letter: "▶" },
  { name: "Prime Video", color: "from-blue-500 to-blue-800", letter: "prime" },
  { name: "Disney+", color: "from-blue-600 to-indigo-800", letter: "D+" },
  { name: "HBO Max", color: "from-purple-600 to-purple-900", letter: "HBO" },
  { name: "Globoplay", color: "from-red-500 to-orange-600", letter: "G" },
  { name: "Spotify", color: "from-green-500 to-green-700", letter: "♪" },
  { name: "Twitch", color: "from-purple-500 to-purple-700", letter: "T" },
  { name: "Apple TV+", color: "from-zinc-700 to-black", letter: "tv+" },
  { name: "Paramount+", color: "from-blue-500 to-blue-700", letter: "P+" },
  { name: "Pluto TV", color: "from-zinc-600 to-zinc-800", letter: "pluto" },
  { name: "Star+", color: "from-blue-700 to-indigo-900", letter: "★" },
];

const steps = [
  {
    number: "01",
    title: "Baixe o ConsecomTV",
    description: "Baixe o arquivo ZIP e extraia em um pendrive USB formatado em FAT32.",
  },
  {
    number: "02",
    title: "Conecte na TV",
    description: "Insira o pendrive em qualquer porta USB da sua Smart TV Philips.",
  },
  {
    number: "03",
    title: "Siga as instruções",
    description: "A TV detecta automaticamente. Selecione 'Instalador' no menu de fontes.",
  },
  {
    number: "04",
    title: "Pronto!",
    description: "Agora você tem Netflix, YouTube, Disney+ e mais, sem assinatura de TV paga.",
  },
];

export function ConsecomTV() {
  return (
    <section id="consetv" className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <TVWithUSBVisual />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-10 hidden lg:block"
            >
              <div className="glass-strong rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-500/20 p-2">
                    <Usb className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">USB Detectado</div>
                    <div className="text-[10px] text-white/50">Pendrive 16GB</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-400">
              <Usb className="h-3 w-3" />
              Sistema exclusivo
            </div>

            <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
              <span className="gradient-text">ConsecomTV</span>
              <br />
              no seu pendrive.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
              Um sistema completo que transforma qualquer TV com entrada USB em uma Smart TV
              de verdade. Netflix, YouTube, Disney+, Prime Video e mais de 12 apps prontos para usar.
              Sem assinatura de TV paga, sem complicação.
            </p>

            {/* App grid */}
            <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {supportedApps.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} text-[10px] font-bold text-white shadow-lg`}
                  >
                    {app.letter}
                  </div>
                  <div className="text-[10px] font-medium text-white/60">{app.name}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button
                variant="gradient"
                size="lg"
                icon={<Tv className="h-4 w-4" />}
                href="/downloads/consetv.zip"
              >
                Baixar ConsecomTV (Grátis)
              </Button>
              <div className="mt-3 text-xs text-white/40">
                ✓ Compatível com Philips 43PFG5100/78 e outras TVs com USB
              </div>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="mb-12 text-center">
            <h3 className="font-display text-3xl font-bold sm:text-4xl">
              Instalação em <span className="gradient-text">4 passos simples</span>
            </h3>
            <p className="mt-4 text-white/60">
              Da embalagem ao primeiro filme em menos de 5 minutos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="font-display text-5xl font-bold text-white/10 transition-colors group-hover:text-white/20">
                  {step.number}
                </div>
                <h4 className="mt-4 text-lg font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>

                {idx < steps.length - 1 && (
                  <ChevronRight className="absolute right-4 top-4 h-4 w-4 text-white/20" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TVWithUSBVisual() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4 shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40">
          {/* TV Screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 text-7xl"
            >
              📺
            </motion.div>

            <div className="font-display text-3xl font-bold text-white sm:text-4xl">
              ConsecomTV
            </div>
            <div className="mt-2 text-sm text-white/60">
              Sistema carregado do pendrive
            </div>

            {/* Apps carousel */}
            <div className="mt-8 flex gap-4 overflow-hidden">
              {[
                { name: "Netflix", color: "from-red-600 to-red-800", letter: "N" },
                { name: "YouTube", color: "from-red-500 to-red-700", letter: "▶" },
                { name: "Prime", color: "from-blue-500 to-blue-700", letter: "P" },
              ].map((app) => (
                <motion.div
                  key={app.name}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${app.color} text-xl font-bold text-white shadow-2xl`}
                  >
                    {app.letter}
                  </div>
                  <div className="text-xs font-medium text-white/70">{app.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* TV Bottom with USB */}
        <div className="mt-3 flex items-center justify-between px-4">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest text-white/50">
            PHILIPS
          </div>

          {/* USB Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1.5 text-[10px] font-semibold text-blue-400"
          >
            <Usb className="h-3 w-3" />
            USB Connected
          </motion.div>
        </div>
      </div>

      {/* USB Stick visualization */}
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-2 right-8 hidden lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-12 rounded-l-md bg-gradient-to-r from-zinc-700 to-zinc-600" />
          <div className="h-8 w-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50">
            <div className="flex h-full items-center justify-center text-[8px] font-bold text-white">
              USB
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
