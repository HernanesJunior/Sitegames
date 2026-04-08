# 🗣️ VoiceHub - Comunicador Acessível

Um aplicativo web moderno e acessível para facilitar a comunicação de pessoas mudas, utilizando síntese de voz (Text-to-Speech) com tecnologia Web Speech API.

## 🌟 Características Principais

### 1. **Síntese de Voz em Português**
- Converte texto digitado em áudio usando Web Speech API
- Suporte completo a português brasileiro
- Controle de velocidade de fala (0.5x a 2x)
- Ajuste de tom da voz (0.5 a 2)
- Seleção de diferentes vozes do sistema

### 2. **Frases Pré-definidas**
- 12 frases comuns pré-configuradas
- Adicione suas próprias frases rapidamente
- Remova frases personalizadas com um clique
- Seleção rápida para agilizar a comunicação

### 3. **Sugestões Inteligentes**
- Sugestões em tempo real enquanto digita
- Baseadas em padrões de palavras-chave
- Integração com frases salvas
- Até 5 sugestões por vez

### 4. **Histórico de Comunicação**
- Armazena todas as mensagens faladas (até 50)
- Data e hora de cada mensagem
- Opções para repetir, copiar ou deletar mensagens
- Função para limpar todo o histórico

### 5. **Compartilhamento**
- Gerar código QR para compartilhar o aplicativo
- Copiar link do aplicativo
- Facilita acesso para outras pessoas

### 6. **Configurações Personalizáveis**
- Salva automaticamente suas preferências
- Ajustes de velocidade e tom persistem
- Armazenamento local (LocalStorage)

## 🚀 Como Usar

### Comunicação Básica
1. Digite sua mensagem no campo de texto
2. Clique no botão "🔊 Falar" ou pressione `Ctrl + Enter`
3. O aplicativo lerá a mensagem em voz alta

### Usar Frases Rápidas
1. Clique em qualquer frase pré-definida
2. A frase será inserida, lida em voz alta e adicionada ao histórico
3. Use as sugestões que aparecem enquanto digita

### Adicionar Frases Personalizadas
1. Clique em "+ Adicionar Frase"
2. Digite sua frase (máximo 80 caracteres)
3. Clique em "Salvar"
4. A nova frase aparecerá na grade de frases

### Gerenciar Histórico
1. Clique em "▼ Ver Histórico" para expandir
2. Visualize todas as mensagens anteriores
3. Use os botões para:
   - 🔊 Repetir a mensagem
   - 📋 Copiar para área de transferência
   - 🗑️ Deletar a mensagem

### Configurar Voz
1. Acesse a seção "⚙️ Configurações"
2. Altere a voz, velocidade e tom
3. As configurações são salvas automaticamente

### Compartilhar
1. Clique em "📤 Gerar QR Code" para criar um código QR
2. Escaneie para acessar de outro dispositivo
3. Ou clique em "🔗 Copiar Link" para compartilhar por mensagem/email

## 💾 Armazenamento Local

Todas as suas dados são armazenados **apenas no seu dispositivo**:
- Frases personalizadas
- Histórico de comunicação
- Configurações (velocidade, tom, voz)

Os dados são salvos automaticamente e persistem entre sessões.

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome/Chromium (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

### Requisitos
- JavaScript habilitado
- Conexão com internet (para CDN do QRCode)
- Suporte a Web Speech API

## 🎯 Funcionalidades Técnicas

### Desktop
- Layout otimizado com grade responsiva
- Múltiplos botões de ação
- Interface completa visível

### Mobile
- Design adaptativo
- Toque otimizado
- Interface simplificada automaticamente
- Máximo de 2 colunas em frases

## 🔒 Privacidade

- ✅ Sem envio de dados para servidores
- ✅ Processamento 100% local
- ✅ Sem rastreamento
- ✅ Web Speech API usa serviços do dispositivo/navegador
- ⚠️ Nota: A síntese de voz pode usar serviços da nuvem dependendo do navegador

## 🎨 Design

- Interface moderna com gradientes
- Cores acessíveis e de alto contraste
- Ícones emojis intuitivos
- Animações suaves e responsivas
- Dark mode pronto para implementação futura

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + Enter` | Falar mensagem |
| `Escape` | Fechar modal |
| `Enter` (em modal) | Salvar frase |

## 🔧 Estrutura de Arquivos

```
Sitegames/
├── index.html       # Estrutura HTML
├── style.css        # Estilos CSS
├── script.js        # Lógica JavaScript
└── README.md        # Este arquivo
```

## 📝 Notas Importantes

1. **Primeira Vez?** Recarregue a página para a Web Speech API carregar corretamente
2. **Vozes** A disponibilidade de vozes varia por sistema operacional
3. **Histórico** Limitado a 50 mensagens (as mais antigas são removidas)
4. **Privacidade** Seus dados nunca saem do seu navegador

## 🚀 Roadmap Futuro

- [ ] Suporte a múltiplos idiomas
- [ ] Histórico de antes/depois sincronizado
- [ ] Export de histórico em PDF
- [ ] Integração com reconhecimento de voz
- [ ] Modo escuro
- [ ] Sincronização entre dispositivos
- [ ] Biblioteca de emojis para expressões

## 💡 Dicas de Uso

1. **Para melhor experiência:** Use frases curtas e claras
2. **Customize suas frases:** Adicione frases que usa com frequência
3. **Gestos rápidos:** Clique nos botões de frase rapidamente para comunicação ágil
4. **Histórico:** Consulte o histórico se esqueceu o que falou
5. **Configurações:** Experimente velocidades diferentes

## 📧 Suporte

Para relatar problemas ou sugerir melhorias, entre em contato.

## 📄 Licença

Este projeto é de código aberto para fins de acessibilidade.

---

**Desenvolvido com ❤️ para facilitar a comunicação de todos.**

Versão: 1.0.0
Última atualização: 8 de abril de 2026