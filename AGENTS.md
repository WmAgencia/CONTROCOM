# CONTROCOM - Agente

## Visão Geral
CONTROCOM é um aplicativo de controle remoto universal para Smart TVs, desenvolvido com React Native/Expo.

## Comandos de Build
```bash
cd CONTROCOM
npm install
npx expo prebuild --platform android
npx expo run:android
```

## Estrutura do Projeto
- `App.tsx` - Navegação principal e lógica de roteamento
- `src/screens/` - Todas as telas do app
- `src/services/` - RemoteService (comunicação) e DeviceDiscoveryService (descoberta)
- `src/store/` - Zustand stores para dispositivos e configurações
- `src/components/` - Componentes reutilizáveis (RemoteButton, DPad, etc.)
- `src/types/` - TypeScript types e enums

## Funcionalidades Implementadas
1. Modo Demo - Funciona 100%
2. Descoberta de dispositivos - Simulada com IPs
3. Tela de controle remoto com DPad
4. Botões de mídia (play, pause, rewind, forward)
5. Atalhos para Netflix, YouTube, Prime Video
6. Teclado numérico
7. Configurações de vibração e som
8. Tela de diagnóstico

## Protocolos de TV (A IMPLEMENTAR)
- Philips: Usa protocolo REST na porta 1925
- LG: WebOS API
- Samsung: Tizen API

## Notas de Desenvolvimento
- React Native 0.86.2 com Expo SDK 57
- Target: Android (package: com.wmagencia.controcom)
- Navegação: @react-navigation/native-stack
- Estado: Zustand com persistência AsyncStorage
