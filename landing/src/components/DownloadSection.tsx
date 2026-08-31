"use client";

import { motion } from "framer-motion";
import { Download, Tv, Apple, Smartphone, Shield, Star, Check } from "lucide-react";
import { Button } from "./ui/Button";

export function DownloadSection() {
  return (
    <section id="download" className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-pink-950/30" />
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main download card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/80 p-8 backdrop-blur-2xl sm:p-12 lg:p-16"
        >
          {/* Glow effects */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>Avaliação 4.9/5 • 50K+ downloads</span>
              </div>

              <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
                Pronto para
                <br />
                <span className="gradient-text">transformar sua TV?</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
                Baixe agora o CONTROCOM e o ConsecomTV.
                Tudo 100% grátis, sem assinatura, sem pegadinha.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Download className="h-4 w-4" />}
                  href="/downloads/CONTROCOM.apk"
                  className="flex-1 sm:flex-none"
                >
                  Baixar CONTROCOM
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  icon={<Tv className="h-4 w-4" />}
                  href="/downloads/consetv.zip"
                  className="flex-1 sm:flex-none"
                >
                  Baixar ConsecomTV
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  Android 7.0+
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  Pendrive FAT32 8GB+
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  Sem permissões invasivas
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  Open source
                </div>
              </div>
            </div>

            {/* Right - QR Code cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <DownloadCard
                icon={<Smartphone className="h-6 w-6" />}
                title="CONTROCOM"
                subtitle="Controle remoto"
                version="v1.0.0"
                size="8.4 MB"
                platform="Android"
                href="/downloads/CONTROCOM.apk"
              />
              <DownloadCard
                icon={<Tv className="h-6 w-6" />}
                title="ConsecomTV"
                subtitle="Sistema para TV"
                version="v2.1.0"
                size="42 MB"
                platform="Pendrive"
                href="/downloads/consetv.zip"
                variant="gradient"
              />
            </div>
          </div>
        </motion.div>

        {/* App stores banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3">
            <Smartphone className="h-5 w-5 text-green-400" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">
                Disponível para
              </div>
              <div className="text-sm font-semibold text-white">Android 7.0+</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3 opacity-50">
            <Apple className="h-5 w-5 text-white/40" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">
                Em breve
              </div>
              <div className="text-sm font-semibold text-white/60">iOS</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3">
            <Shield className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">
                Verificado
              </div>
              <div className="text-sm font-semibold text-white">Sem malware</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DownloadCard({
  icon,
  title,
  subtitle,
  version,
  size,
  platform,
  href,
  variant = "default",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  version: string;
  size: string;
  platform: string;
  href: string;
  variant?: "default" | "gradient";
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-white/20"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            variant === "gradient"
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : "bg-white/10"
          }`}
        >
          {icon}
        </div>
        <div className="rounded-full bg-green-500/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-green-400">
          Grátis
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[10px] uppercase tracking-wider text-white/40">{subtitle}</div>
        <div className="mt-1 font-display text-xl font-bold text-white">{title}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
        <div>
          <div className="text-[10px] text-white/40">Versão</div>
          <div className="text-xs font-semibold text-white">{version}</div>
        </div>
        <div>
          <div className="text-[10px] text-white/40">Tamanho</div>
          <div className="text-xs font-semibold text-white">{size}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[10px] text-white/40">Plataforma</div>
          <div className="text-xs font-semibold text-white">{platform}</div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-white/60 group-hover:text-white">
          Baixar agora
        </span>
        <div className="rounded-full bg-white p-1.5 text-black transition-transform group-hover:translate-x-1">
          <Download className="h-3 w-3" />
        </div>
      </div>
    </motion.a>
  );
}
