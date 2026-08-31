"use client";

import { Github, Instagram, MessageCircle, Mail, Heart } from "lucide-react";

const links = {
  produto: [
    { label: "Recursos", href: "#features" },
    { label: "ConsecomTV", href: "#consetv" },
    { label: "Compatibilidade", href: "#compatibility" },
    { label: "Download", href: "#download" },
  ],
  empresa: [
    { label: "Sobre", href: "#" },
    { label: "Blog", href: "#" },
    { label: "GitHub", href: "https://github.com/WmAgencia" },
    { label: "Contato", href: "#" },
  ],
  legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos", href: "#" },
    { label: "Licenças", href: "#" },
  ],
};

const social = [
  { icon: Github, href: "https://github.com/WmAgencia", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com/wmagencia", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/5515981817336", label: "WhatsApp" },
  { icon: Mail, href: "mailto:contato@wmagencia.com.br", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black py-16">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
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
              <div>
                <div className="font-display text-base font-bold text-white">CONTROCOM</div>
                <div className="text-[10px] font-medium tracking-wider text-white/40">
                  by WmAgência
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
              O controle remoto mais avançado do Brasil. Transformando a relação
              entre pessoas e suas TVs desde 2024.
            </p>

            <div className="mt-8 flex gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Produto" links={links.produto} />
            <FooterColumn title="Empresa" links={links.empresa} />
            <FooterColumn title="Legal" links={links.legal} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <div className="text-xs text-white/40">
            © 2024-2026 WmAgência. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            Feito com <Heart className="h-3 w-3 fill-red-500 text-red-500" /> no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
