"use client";

import { motion } from "framer-motion";
import { Download, Tv, Smartphone, Wifi, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 noise" />

      {/* Animated orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse delay-1000" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-[120px] animate-pulse delay-2000" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="default" className="mb-8">
              <Sparkles className="h-3 w-3" />
              <span>Compatível com Philips 43PFG5100/78 e +50 modelos</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block text-white">O controle remoto</span>
            <span className="block">
              <span className="gradient-text">mais avançado</span>
            </span>
            <span className="block text-white">do Brasil.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg md:text-xl"
          >
            Transforme seu celular no controle remoto definitivo.
            <span className="text-white"> Sem pilhas, sem infravermelho, sem limites.</span>{" "}
            Funciona com Philips, LG, Samsung, Sony, TCL e mais.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<Download className="h-4 w-4" />}
              href="/downloads/CONTROCOM.apk"
            >
              Baixar CONTROCOM
            </Button>
            <Button
              variant="gradient"
              size="lg"
              icon={<Tv className="h-4 w-4" />}
              href="/downloads/consetv.zip"
            >
              Baixar ConsecomTV
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            <Stat label="Downloads" value="50K+" />
            <div className="h-8 w-px bg-white/10" />
            <Stat label="TVs compatíveis" value="50+" />
            <div className="h-8 w-px bg-white/10" />
            <Stat label="Avaliação" value="4.9★" />
          </motion.div>
        </div>

        {/* Hero visual - TV + Phone */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-24 max-w-5xl"
        >
          <HeroVisual />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Role para descobrir</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 -m-20 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* TV Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="lg:col-span-8"
        >
          <TVMockup />
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="lg:col-span-4"
        >
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Connection lines */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wifi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007AFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#007AFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 720 300 Q 500 200 280 300"
          stroke="url(#wifi-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.circle
          cx="500"
          cy="250"
          r="4"
          fill="#007AFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-1/4 hidden lg:block"
      >
        <div className="glass-strong rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-green-500/20 p-2">
              <Wifi className="h-3.5 w-3.5 text-green-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Wi-Fi Conectado</div>
              <div className="text-[10px] text-white/50">Latência 12ms</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 bottom-1/4 hidden lg:block"
      >
        <div className="glass-strong rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Tv className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Philips 43PFG5100/78</div>
              <div className="text-[10px] text-white/50">192.168.1.45</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TVMockup() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4 shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/30">
          {/* TV Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6 text-7xl"
            >
              📺
            </motion.div>
            <div className="font-display text-2xl font-bold text-white sm:text-3xl">
              CONTROCOM Connected
            </div>
            <div className="mt-2 text-sm text-white/60">
              Tudo funciona perfeitamente
            </div>

            {/* App grid */}
            <div className="mt-8 grid grid-cols-4 gap-3">
              {[
                { name: "Netflix", color: "from-red-600 to-red-800", letter: "N" },
                { name: "YouTube", color: "from-red-500 to-red-700", letter: "▶" },
                { name: "Prime", color: "from-blue-500 to-blue-700", letter: "P" },
                { name: "Disney+", color: "from-blue-600 to-indigo-700", letter: "D+" },
              ].map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} text-base font-bold text-white shadow-lg`}
                  >
                    {app.letter}
                  </div>
                  <div className="text-[10px] font-medium text-white/70">{app.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* TV light reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* TV Brand badge */}
        <div className="mt-3 flex items-center justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest text-white/50">
            PHILIPS
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="relative rounded-[2.5rem] border-[10px] border-zinc-800 bg-black p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-32 -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-zinc-900 to-black">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-white/60">
            <span>9:41</span>
            <span>5G ●●●</span>
          </div>

          {/* App content */}
          <div className="flex h-full flex-col items-center justify-center px-4 pt-8">
            <div className="text-[10px] uppercase tracking-widest text-white/40">CONTROCOM</div>

            <div className="my-6 flex flex-col items-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
              <div className="text-sm font-semibold text-white">Philips Sala</div>
              <div className="text-[10px] text-white/50">43PFG5100/78</div>
              <div className="mt-2 flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] font-semibold text-green-400">Conectada</span>
              </div>
            </div>

            {/* Mini remote control */}
            <div className="grid grid-cols-3 gap-2">
              {["⏻", "🔇", "CH-", "VOL-", "OK", "VOL+", "CH+", "◀", "▶"].map((emoji, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.05 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Volume bar */}
            <div className="mt-6 w-full">
              <div className="mb-1 flex items-center justify-between text-[10px] text-white/50">
                <span>Volume</span>
                <span>20</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  transition={{ delay: 2, duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
