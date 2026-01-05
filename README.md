# Guia da Mesa 🍴

Guia de restaurantes local para **Sena Madureira - AC**

Catálogo simples e rápido de lugares para comer na cidade, com contato direto via WhatsApp e Instagram.

---

## 🚀 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com variáveis CSS e layout responsivo
- **JavaScript Vanilla** - Busca e filtros em tempo real
- **JSON** - Armazenamento de dados

**Sem frameworks. Sem build process. Deploy direto.**

---

## 📁 Estrutura do Projeto

> 📋 **Organização é um ponto CRÍTICO deste projeto!** Consulte [docs/ORGANIZACAO.md](docs/ORGANIZACAO.md) para detalhes completos.

```
/
├── index.html              # Página principal (catálogo)
├── lugar.html              # Página de review individual
├── README.md               # Este arquivo
├── .gitignore              # Arquivos ignorados pelo Git
│
├── src/                    # Código fonte
│   ├── styles/             # Arquivos CSS
│   │   ├── style.css       # Estilos globais
│   │   └── review.css      # Estilos de review
│   └── scripts/            # Arquivos JavaScript
│       ├── script.js       # Lógica da home
│       └── lugar.js        # Lógica da página de review
│
├── data/                   # Dados do aplicativo
│   ├── data.json           # Dados dos lugares e categorias
│   ├── reviews/            # Reviews editoriais em JSON
│   └── rankings/           # Rankings curados
│
├── public/                 # Arquivos públicos
│   └── images/logos/       # Logos dos lugares (72x72px)
│
└── docs/                   # Documentação
    ├── ORGANIZACAO.md      # Guia de organização (LEIA!)
    ├── ROADMAP.md          # Roadmap das 3 fases
    └── ideia.md            # Documentação técnica
```

---

## 🏃 Como rodar localmente

### Opção 1: Servidor HTTP simples com Python

```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 2: Servidor HTTP simples com Node.js

```bash
npx http-server -p 8000

# Acesse: http://localhost:8000
```

### Opção 3: Live Server (VS Code)

1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito no `index.html`
3. Selecione **Open with Live Server**

### Opção 4: XAMPP (se você já usa)

Como o projeto está em `c:\xampp\htdocs\GuiaDoSabor`, acesse:
```
http://localhost/GuiaDoSabor
```

---

## 📝 Como adicionar um novo lugar

### Passo 1: Adicionar logo

1. Prepare uma imagem quadrada (recomendado: 72x72px ou 144x144px)
2. Salve em `public/images/logos/nome-do-lugar.jpg` (ou `.png`)

### Passo 2: Adicionar dados

Edite o arquivo `data/data.json` e adicione um novo objeto no array `places`:

```json
{
  "id": "13",
  "name": "Nome do Lugar",
  "category": "lanches",
  "logo": "images/logos/nome-do-lugar.jpg",
  "whatsapp": "5568999999999",
  "instagram": "usuario_instagram"
}
```

**Campos:**
- `id` - Número único (string)
- `name` - Nome do lugar
- `category` - Uma das categorias: `lanches`, `pizza`, `acai`, `almoco`, `cafes`
- `logo` - Caminho para a imagem do logo
- `whatsapp` - Número completo com DDI + DDD (ex: 5568999999999)
- `instagram` - Username do Instagram (opcional, sem @)

### Passo 3: Testar localmente

Abra o site no navegador e verifique se o lugar aparece corretamente.

### Passo 4: Fazer commit e push

```bash
git add .
git commit -m "Adicionar [Nome do Lugar]"
git push origin main
```

O Netlify vai fazer deploy automaticamente! 🎉

---

## 🎨 Personalização

### Alterar cores

Edite as variáveis CSS em `style.css`:

```css
:root {
    --color-primary: #25D366;      /* Verde WhatsApp */
    --color-secondary: #E1306C;    /* Rosa Instagram */
    --color-background: #F8F9FA;   /* Fundo da página */
    --color-card: #FFFFFF;         /* Fundo dos cards */
    --color-text: #212529;         /* Texto principal */
    --color-text-light: #6C757D;   /* Texto secundário */
    --color-border: #DEE2E6;       /* Bordas */
}
```

### Adicionar nova categoria

1. Edite `data.json` e adicione no array `categories`:

```json
{
  "id": "sobremesas",
  "name": "Sobremesas",
  "emoji": "🍰"
}
```

2. Use o `id` nos lugares que pertencem a essa categoria

---

## 🌐 Deploy no Netlify

### Primeira vez:

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em **Add new site** → **Import an existing project**
3. Conecte ao GitHub e selecione o repositório `GuiaDoSabor`
4. Configure:
   - **Build command:** (deixe vazio)
   - **Publish directory:** `/` (raiz)
5. Clique em **Deploy site**

### Próximos deploys:

Automático! Toda vez que você fizer push para `main`, o Netlify faz deploy.

---

## ✨ Funcionalidades

- ✅ Listagem de lugares por categoria
- ✅ Busca em tempo real por nome
- ✅ Filtro por categoria (chips)
- ✅ Botões de contato (WhatsApp e Instagram)
- ✅ Layout responsivo (mobile-first)
- ✅ Empty state quando não há resultados
- ✅ Logos com fallback automático

---

## 📱 Responsividade

- **Mobile:** 1 coluna
- **Tablet (640px+):** 2 colunas
- **Desktop (1024px+):** 3 colunas

---

## 🐛 Troubleshooting

### Logo não aparece

- Verifique se o caminho em `data.json` está correto
- Verifique se a imagem existe na pasta `images/logos/`
- O sistema mostra automaticamente um placeholder se a imagem falhar

### Lugar não aparece na lista

- Verifique se o JSON está válido (use um validador online)
- Verifique se a `category` do lugar existe em `categories`
- Abra o Console do navegador (F12) para ver erros

### Busca não funciona

- Verifique se o arquivo `script.js` está sendo carregado
- Abra o Console (F12) e veja se há erros de JavaScript

---

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar.

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**Feito com ❤️ para Sena Madureira - AC**
