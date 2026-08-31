"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "O CONTROCOM funciona com qualquer TV?",
    a: "Funciona com as principais Smart TVs do mercado: Philips, LG, Samsung, Sony, TCL, Roku TV e Fire TV. Mais de 50 modelos já foram testados e validados. A TV precisa estar conectada na mesma rede Wi-Fi que o celular.",
  },
  {
    q: "Preciso de internet para usar?",
    a: "Não. O CONTROCOM usa apenas a rede local (Wi-Fi) para se comunicar com a TV. Sua TV continua funcionando normalmente, mesmo sem internet. O celular também não precisa de internet para o controle funcionar — apenas a conexão Wi-Fi entre os dispositivos.",
  },
  {
    q: "O que é o ConsecomTV?",
    a: "É um sistema completo que vai no pendrive e transforma qualquer TV com entrada USB em uma Smart TV de verdade. Inclui Netflix, YouTube, Disney+, Prime Video, Globoplay e mais de 12 apps prontos para usar. É gratuito e open source.",
  },
  {
    q: "Como instalo o ConsecomTV na TV?",
    a: "É muito simples: 1) Baixe o ZIP e extraia em um pendrive formatado em FAT32. 2) Conecte o pendrive na porta USB da TV. 3) A TV detecta automaticamente e mostra um instalador. 4) Siga os passos na tela. Em menos de 5 minutos você está navegando nos apps.",
  },
  {
    q: "O CONTROCOM é seguro?",
    a: "100% seguro. Não coletamos dados, não temos servidor cloud, tudo funciona localmente na sua rede. O código é aberto e auditável no GitHub. Nunca pedimos permissões invasivas no celular.",
  },
  {
    q: "Funciona no iPhone?",
    a: "Por enquanto o app é exclusivo para Android (7.0+). A versão para iOS está em desenvolvimento e será lançada em breve. Você pode se inscrever para ser avisado quando lançar.",
  },
  {
    q: "Preciso pagar alguma assinatura?",
    a: "Não. O CONTROCOM e o ConsecomTV são 100% gratuitos. Sem assinatura, sem mensalidade, sem pegadinha. O projeto é mantido pela WmAgência.",
  },
  {
    q: "A TV precisa estar ligada para funcionar?",
    a: "Sim, a TV precisa estar ligada para receber comandos. Mas o CONTROCOM funciona mesmo se a TV estiver em modo Standby — basta pressionar o botão POWER no app para ligar a TV.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/70">
            Perguntas frequentes
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl">
            Tire suas <span className="gradient-text">dúvidas.</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="mt-16 space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/10"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform ${
                    open === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/5 px-5 pb-5 pt-4"
                >
                  <p className="text-sm leading-relaxed text-white/60">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
