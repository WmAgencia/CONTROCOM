# Guia de Instalação - ConsecomTV

## Requisitos
- Pendrive USB (mínimo 8GB)
- Formato FAT32
- TV com porta USB
- 5 minutos do seu tempo

## Passo a Passo

### 1. Preparar o Pendrive
```
1. Conecte o pendrive no computador
2. Faça backup dos arquivos (será formatado)
3. Formate em FAT32:
   - Windows: Botão direito → Formatar → Sistema de arquivos: FAT32
   - Mac: Utilitário de Disco → Apagar → MS-DOS (FAT)
   - Linux: sudo mkfs.vfat -F 32 /dev/sdX1
```

### 2. Extrair o Conteúdo
```
1. Baixe o arquivo consecomtv.zip
2. Extraia TODO o conteúdo na raiz do pendrive
3. Estrutura deve ficar assim:

PENDRIVE/
├── index.html
├── install.html
├── apps/
│   ├── netflix.html
│   ├── youtube.html
│   └── ...
├── system/
└── docs/
```

### 3. Conectar na TV
```
1. Desligue a TV
2. Conecte o pendrive na porta USB
3. Ligue a TV
4. Pressione INPUT/SOURCE no controle
5. Selecione "USB" ou "Media Player"
```

### 4. Instalação
```
1. Abra o arquivo index.html do pendrive
2. O sistema carrega automaticamente
3. Se aparecer o instalador, siga os passos
4. Pronto! Pode começar a usar
```

## Compatibilidade

| TV | Compatibilidade | Notas |
|----|---------------|-------|
| Philips 43PFG5100/78 | ✅ Total | Recomendado |
| Philips PUG6700 | ✅ Total | |
| Philips OLED803 | ✅ Total | |
| LG WebOS | ✅ Total | 2016+ |
| Samsung Tizen | ✅ Total | 2015+ |
| Sony Bravia | ✅ Total | 2016+ |
| TCL Android | ✅ Total | |
| Roku TV | ✅ Total | |

## Problemas Comuns

**TV não reconhece o pendrive:**
- Verifique se está em FAT32
- Tente outra porta USB
- Pendrive de até 32GB é mais compatível

**Apps não abrem:**
- Reinicie a TV
- Reconecte o pendrive
- Verifique se os arquivos HTML estão no nível raiz

**Tela em branco:**
- Abra o menu de fontes da TV
- Selecione "Navegador USB" ou "Media Player"
- Procure pelo arquivo index.html

## Suporte

- WhatsApp: (15) 98181-7336
- Email: suporte@wmagencia.com.br
- GitHub: github.com/WmAgencia/CONTROCOM

---
© 2024-2026 WmAgência
