"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/Button";

const navItems = [
  { label: "Recursos", href: "#features" },
  { label: "ConsecomTV", href: "#consetv" },
  { label: "Compatibilidade", href: "#compatibility" },
  { label: "Como funciona", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <motion.div
          style={{ backgroundColor: `rgba(0,0,0,${bgOpacity.get()})` }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.08] bg-black/60 px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 sm:px-6"
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                  <path
                    d="M2 8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="7" cy="12" r="1.5" fill="currentColor" />
                  <path
                    d="M12 9L15 12L12 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-white">
                CONTROCOM
              </span>
              <span className="text-[10px] font-medium tracking-wider text-white/40">
                by WmAgência
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="gradient"
              size="sm"
              icon={<Download className="h-3.5 w-3.5" />}
              href="#download"
            >
              Baixar Agora
            </Button>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.div>

        {/* Mobile menu drawer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                <Button
                  variant="gradient"
                  size="sm"
                  icon={<Download className="h-3.5 w-3.5" />}
                  href="#download"
                >
                  Baixar Agora
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
