# CONTROCOM Landing Page

Landing page profissional para o **CONTROCOM** - controle remoto inteligente para Smart TVs + sistema **ConsecomTV** para pendrive.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

## Recursos da Landing

- ✨ Hero cinematográfico com mockups TV + Phone
- 🎯 6 feature cards com hover animations
- 📺 Seção ConsecomTV com TV mockup animada
- ✅ Compatibilidade com 6 marcas (Philips, LG, Samsung, Sony, TCL, Roku)
- 📋 Como funciona em 4 passos visuais
- ⬇️ Seção de download com 2 cards
- ❓ FAQ accordion
- 🎨 Footer completo

## Estrutura

```
landing/
├── src/
│   ├── app/
│   │   ├── globals.css      # Design system
│   │   ├── layout.tsx       # Layout + fonts
│   │   └── page.tsx         # Página principal
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ConsecomTV.tsx
│   │   ├── Compatibility.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── DownloadSection.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Badge.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   └── downloads/
│       ├── CONTROCOM.apk    # APK do controle remoto
│       └── consetv.zip      # Sistema para TV
├── tailwind.config.ts
├── next.config.mjs
├── vercel.json
└── package.json
```

## Como Rodar

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Build de produção
```

## Deploy na Vercel

```bash
vercel --prod
```

## Design System

### Cores
- Background: `#000000`
- Surface: `#0a0a0a`
- Primary: `#007AFF` (azul iOS)
- Accent: gradientes de cyan, roxo e rosa

### Tipografia
- **Inter** - Sans-serif principal
- **Space Grotesk** - Display headings
- **JetBrains Mono** - Code

### Animações
- Fade in/out
- Slide in
- Scale in
- Float
- Pulse glow
- Marquee
- Shimmer
- Gradient shift

## Performance

- Lazy loading de imagens
- Animações otimizadas com GPU
- CSS-in-JS via Tailwind
- Sem libs pesadas desnecessárias

## Licença

MIT © 2024-2026 WmAgência
