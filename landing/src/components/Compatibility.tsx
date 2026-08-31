"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const brands = [
  {
    name: "Philips",
    models: ["43PFG5100/78", "50PUG6700/78", "55OLED803/12", "65PUS7803/12", "32PHS6605/12"],
    featured: true,
  },
  {
    name: "LG",
    models: ["OLED55C1", "43UN7300", "50UP7500", "65NANO90", "32LM6300"],
  },
  {
    name: "Samsung",
    models: ["QN90B", "TU8000", "Q60A", "The Frame", "Crystal UHD"],
  },
  {
    name: "Sony",
    models: ["X90J", "A80K", "X85K", "Bravia 7", "OLED A95K"],
  },
  {
    name: "TCL",
    models: ["P725", "C725", "P615", "QLED C815", "4K P715"],
  },
  {
    name: "Roku TV",
    models: ["Roku Express", "Roku Ultra", "Roku Streambar", "TCL Roku", "Hisense Roku"],
  },
];

export function Compatibility() {
  return (
    <section id="compatibility" className="relative py-32">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400">
            <Check className="h-3 w-3" />
            100% testado
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            Funciona com sua TV.
            <br />
            <span className="gradient-text">Todas elas.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            Testado e validado em mais de 50 modelos. Suporte nativo aos principais protocolos do mercado.
          </p>
        </motion.div>

        {/* Brand grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border p-6 transition-all ${
                brand.featured
                  ? "border-blue-500/30 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
              }`}
            >
              {brand.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="rounded-b-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Sua TV
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${
                    brand.featured
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "bg-white/5 text-white/80"
                  }`}
                >
                  {brand.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{brand.name}</h3>
                  <div className="text-xs text-white/40">
                    {brand.models.length} modelos suportados
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                {brand.models.map((model) => (
                  <div
                    key={model}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-1.5 text-xs text-white/70"
                  >
                    <Check
                      className={`h-3 w-3 ${
                        brand.featured ? "text-blue-400" : "text-green-400"
                      }`}
                    />
                    {model}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee of more brands */}
        <div className="mt-20 overflow-hidden mask-fade-r">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[
              ...brands.map((b) => b.name),
              ...brands.map((b) => b.name),
              ...brands.map((b) => b.name),
            ].map((name, i) => (
              <div
                key={i}
                className="font-display text-4xl font-bold text-white/10 sm:text-5xl"
              >
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
