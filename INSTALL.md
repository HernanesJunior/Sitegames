# 📱 Guia de Instalação - VoiceHub como App

VoiceHub é um **Progressive Web App (PWA)** que pode ser instalado em qualquer dispositivo e funciona offline!

## 🚀 Como Instalar

### Windows / Desktop

#### Opção 1: Google Chrome / Edge
1. Abra `VoiceHub` no Chrome ou Edge
2. Clique no ícone **"+"** na barra de endereço (ao lado direito)
3. Clique em **"Instalar VoiceHub"**
4. Confirme a instalação
5. ✅ O app aparecerá no seu menu Iniciar e na barra de tarefas

#### Opção 2: Firefox
1. Abra a página do VoiceHub no Firefox
2. Clique no menu **"⋮"** (três linhas) no canto superior direito
3. Clique em **"Instalar aplicativo"**
4. Confirme
5. ✅ O app estará disponível no menu de aplicativos

### 📱 Android

#### Chrome/Edge
1. Abra VoiceHub no Chrome ou Edge
2. Toque no menu **"⋮"** (três pontos) no canto superior direito
3. Selecione **"Instalar app"**
4. Confirme
5. ✅ O app será instalado na sua tela inicial

#### Firefox
1. Abra VoiceHub no Firefox
2. Toque no menu **"⋮"** (três linhas)
3. Toque em **"Instalar"**
4. Confirme
5. ✅ O app estará na sua tela inicial

### 🍎 iPhone/iPad (iOS 16.4+)

1. Abra VoiceHub no Safari (o navegador deve ter suporte a PWA)
2. Toque em **"Compartilhar"** (ícone em cima)
3. Role para baixo e clique em **"Adicionar à tela inicial"**
4. Escolha um nome (deixe "VoiceHub")
5. Clique em **"Adicionar"**
6. ✅ O app estará na sua tela inicial

> **Nota:** iOS 16.4+ tem melhor suporte a PWA. Versões anteriores têm suporte limitado.

### Mac

#### Safari
1. Abra VoiceHub no Safari
2. Clique em **"Arquivo"** no menu superior
3. Selecione **"Adicionar à Dock"**
4. ✅ O app aparecerá no seu Dock

#### Chrome
1. Abra VoiceHub no Chrome
2. Clique no ícone **"+"** na barra de endereço
3. Clique em **"Instalar VoiceHub"**
4. ✅ O app estará em Aplicativos

## 💾 O que Funciona Offline?

Uma vez instalado, o VoiceHub funciona **completamente offline**:
- ✅ Digitar mensagens
- ✅ Sintetizar voz (usando vozes do sistema)
- ✅ Exibir frases salvas
- ✅ Acessar histórico
- ✅ Configurações personalizadas

**Funções que precisam de internet:**
- 🌐 Gerar QR Code (precisa da biblioteca CDN)
- 🌐 Compartilhar links externo

## 🔄 Atualizar o App

- **Automático:** O app verifica atualizações automaticamente a cada 24h
- **Manual:** Você pode forçar atualização fechando e reabrindo o app

Quando uma atualização estiver disponível, verá uma mensagem na tela.

## ⚙️ Gerenciar o App

### Windows
- **Desinstalar:** Vá para Configurações > Aplicativos > VoiceHub > Desinstalar
- **Pasta de dados:** `C:\Users\[SeuUsuário]\AppData\Local\VoiceHub`

### Android
- **Desinstalar:** Toque e segure o ícone > Desinstalar
- **Armazenamento:** Seus dados estão seguros no dispositivo

### iPhone
- **Remover:** Toque e segure o ícone > Remover App
- **Seus dados** dos comunicados ficam salvos enquanto não limpa o cache do navegador

## 🔒 Privacidade & Segurança

✅ **Seus dados são seus:**
- Nenhuma informação é enviada para servidores
- Histórico fica 100% no seu dispositivo
- Frases salvas são apenas locais
- Você controla tudo

✅ **Segurança:**
- HTTPS recomendado (criptografia)
- Sem rastreamento
- Sem anúncios
- Sem coleta de dados

## 🐛 Solução de Problemas

### O botão de instalar não aparece
- ✅ Atualize seu navegador para a versão mais recente
- ✅ Feche e reabra o navegador
- ✅ Limpe o cache do navegador
- ✅ Tente em outro navegador (Chrome, Edge, Firefox)

### O app não funciona offline
- ✅ Espere 30 segundos na primeira abertura (Service Worker instalando)
- ✅ Recarregue a página (F5)
- ✅ Verifique se o Service Worker está ativado:
  - Abra DevTools (F12)
  - Vá para Application > Service Workers
  - Deve aparecer "Active" (ativo)

### O som não funciona no app instalado
- ✅ Verifique o volume do dispositivo
- ✅ Tente reiniciar o app
- ✅ Volte para o navegador se o app não suportar áudio

### Histórico sumiu
- ✅ Os dados ficam salvos no navegador/app
- ✅ Se limpou cache, os dados serão perdidos
- ✅ Sempre faça backup clicando em "Copiar Link" para compartilhar histórico

## 📞 Suporte

Se tiver problemas:
1. Recarregue a página (F5)
2. Limpe cache do navegador
3. Feche e reabra o app
4. Tente em outro navegador
5. Reinicie o dispositivo

## 📝 Informações Técnicas

- **PWA Version:** 1.0.0
- **Service Worker:** Ativado ✅
- **Offline Support:** Completo ✅
- **Cache Storage:** LocalStorage + Service Worker Cache
- **Tamanho:** ~500KB (primeira instalação)

---

**Aproveite VoiceHub como seu comunicador pessoal! 🗣️**
