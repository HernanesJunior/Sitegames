# 🎮 SiteGames - Plataforma Gamer

Um site moderno e responsivo com design gamer, tema escuro com verde neon, perfeito para uma plataforma de jogos online.

## 🎨 Características Principais

### Design & UX
- ✨ **Tema Escuro Pro**: Preto puro com verde neon brilhante
- 🎯 **Layout Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- ⚡ **Animações Suaves**: Efeitos de transição elegantes em toda a página
- 🌊 **Parallax Effect**: Fundo animado na seção hero
- 💫 **Gradientes Sofisticados**: Combinações de cores atrativas

### Funcionalidades
- 📱 **Menu Mobile**: Navegação adaptativa para dispositivos pequenos
- 🎮 **Grid de Jogos**: Exibição elegante de 4 jogos em destaque
- 🏆 **Seção de Torneios**: Competições com prêmios totais
- 📊 **Estatísticas**: Números animados ao rolar a página
- 👥 **Comunidade**: Cards com recursos sociais
- 💬 **Formulário de Contato**: Com validação de campos
- 🔗 **Smooth Scroll**: Navegação suave entre seções

## 🚀 Como Usar

### Instalação
1. Clone o repositório:
```bash
git clone <seu-repositório>
cd Sitegames
```

2. Abra o arquivo `index.html` em seu navegador:
```bash
start index.html
```

Ou use um servidor local (recomendado):
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

Acesse `http://localhost:8000` no navegador.

## 📁 Estrutura do Projeto

```
Sitegames/
├── index.html       # Estrutura HTML principal
├── style.css        # Estilos e tema
├── script.js        # Interatividade e animações
└── README.md        # Este arquivo
```

## 🎨 Paleta de Cores

| Cor | Valor | Uso |
|-----|-------|-----|
| Verde Neon | `#00ff40` | Cor primária, destaques |
| Verde Médio | `#00aa00` | Secundária, gradientes |
| Verde Escuro | `#001a00` | Backgrounds, bordas |
| Preto Puro | `#000000` | Fundo principal |
| Cinza | `#b0b0b0` | Texto secundário |
| Branco | `#ffffff` | Texto principal |

## 📑 Seções do Site

### 1. **Navbar (Barra de Navegação)**
- Logo com ícone pulsante
- Links para todas as seções
- Menu responsivo para mobile
- Barra fixa no topo (sticky)

### 2. **Hero Section**
- Título principal em gradiente
- Subtítulo chamativo
- Botão CTA "Começar Agora"
- Background com animação parallax

### 3. **Jogos em Destaque**
- 4 cards de jogos
- Badges (Popular, Novo, Top, Clássico)
- Rating com estrelas
- Hover effects elegantes

### 4. **Torneios Ativos**
- 3 torneios em destaque
- Prêmios totais destacados
- Número de participantes
- Botão de inscrição

### 5. **Estatísticas**
- 4 números principais animados
- Cards com efeitos hover
- Atualização ao scroll

### 6. **Comunidade Gamer**
- 4 recursos principais
- Ícones flutuantes animados
- Cards interativos

### 7. **Formulário de Contato**
- Campos de nome, email e mensagem
- Validação em tempo real
- Feedback visual de sucesso

### 8. **Footer**
- Links rápidos
- Redes sociais
- Informações da empresa

## ⚙️ Personalização

### Mudar Cores
Edite as variáveis em `style.css`:
```css
:root {
    --primary-color: #00ff40;      /* Verde neon */
    --secondary-color: #00aa00;    /* Verde médio */
    --tertiary-color: #001a00;     /* Verde escuro */
    --bg-dark: #0a0f0a;
    --bg-darker: #000000;
}
```

### Adicionar Novos Jogos
No `index.html`, copie um `.game-card` e modifique:
```html
<div class="game-card">
    <div class="game-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span class="game-badge">Novo Badge</span>
    </div>
    <div class="game-info">
        <h3>Seu Jogo</h3>
        <p>Categoria | Tipo</p>
        <div class="game-rating">
            <span class="stars">★★★★★</span>
            <span class="score">9.9</span>
        </div>
        <button class="btn btn-secondary">Jogar Agora</button>
    </div>
</div>
```

### Modificar Conteúdo
Todos os textos podem ser editados diretamente no `index.html`.

## 🎬 Efeitos e Animações

- **Pulse**: Logo pulsante na navbar
- **Slide Up**: Entrada suave do conteúdo
- **Move Gradient**: Fundo animado do hero
- **Float**: Ícones flutuantes na comunidade
- **Ripple**: Efeito ao clicar botões
- **Glow**: Brilho nos títulos ao scroll

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 767px

## 🔍 SEO & Performance

- Meta tags incluídas
- Estrutura semântica HTML5
- CSS otimizado
- JavaScript sem dependências externas
- Lighthouse friendly

## 🐛 Troubleshooting

### Animações não funcionando
- Verifique se o JavaScript está habilitado
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Cores diferentes
- Verifique a paleta de cores em `:root` no CSS
- Certifique-se de que o arquivo está salvo

### Menu mobile não aparece
- Verifique o `display` do `.menu-toggle` em mobile
- Teste em modo responsivo do navegador (F12)

## 🚀 Deploy

### GitHub Pages
1. Faça push do repositório para GitHub
2. Vá para Settings > Pages
3. Selecione `main` branch
4. Seu site estará em: `https://seu-usuario.github.io/Sitegames`

### Netlify
1. Conecte seu repositório GitHub no Netlify
2. Defina como pasta de publicação: `/`
3. Deploy automático realizado!

### Vercel
1. Importe seu repositório
2. Clique em Deploy
3. URL gerada automaticamente

## 👨‍💻 Tecnologias Usadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos avançados com gradientes e animações
- **JavaScript Vanilla**: Interatividade sem dependências
- **CSS Grid & Flexbox**: Layout responsivo

## 📝 Melhorias Futuras

- [ ] Integração com backend para gerenciar jogos
- [ ] Sistema de login/registro
- [ ] Painel de administrador
- [ ] Integração com APIs de jogos
- [ ] Sistema de chat em tempo real
- [ ] Suporte para dark/light mode toggle
- [ ] Internacionalização (i18n)
- [ ] PWA (Progressive Web App)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 📞 Contato

- 📧 Email: seus-dados@email.com
- 🐙 GitHub: [seu-usuario]
- 🐦 Twitter: [@seu-twitter]
- 💼 LinkedIn: [seu-linkedin]

---

**Desenvolvido com ❤️ para gamers** 🎮

Última atualização: 22 de fevereiro de 2026
