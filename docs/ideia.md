# Guia da Mesa - Documentação Técnica

**Guia editorial de restaurantes para Sena Madureira - AC**

> 📋 **Roadmap completo:** Veja [ROADMAP.md](ROADMAP.md) para visão das 3 fases do projeto

---

## Conceito (FASE 1 - MVP)

Catálogo simples e rápido de lugares para comer na cidade:
- Lista de restaurantes, lanchonetes, cafés e pizzarias
- Contato direto via WhatsApp e Instagram
- Busca por nome e filtro por categoria
- **Foco:** mobile-first, simples, rápido

**Evolução futura:**
- **Fase 2:** Reviews editoriais curadas (1 crítico/curador)
- **Fase 3:** Rankings, selos e indicações (tipo Michelin Guide)

---

## Stack Técnica (SIMPLES)

- **HTML puro** - uma página única
- **CSS vanilla** - variáveis CSS, mobile-first
- **JavaScript mínimo** - só busca e filtros
- **JSON** - um arquivo com todos os dados
- **Deploy:** Netlify (sem build, deploy direto)

**Sem frameworks. Sem TypeScript. Sem complicação.**

---

## Estrutura de Arquivos

```
/
├── index.html          # Página única
├── style.css           # Todos os estilos
├── script.js           # Busca e filtros
├── data.json           # Dados dos lugares
├── images/
│   └── logos/          # Logos dos lugares (72x72px)
└── README.md           # Como adicionar lugares
```

---

## Data Model (data.json)

```json
{
  "categories": [
    { "id": "lanches", "name": "Lanches", "emoji": "🍔" },
    { "id": "pizza", "name": "Pizza", "emoji": "🍕" },
    { "id": "acai", "name": "Açaí", "emoji": "🍨" },
    { "id": "almoco", "name": "Almoço", "emoji": "🍽️" },
    { "id": "cafes", "name": "Cafés", "emoji": "☕" }
  ],
  "places": [
    {
      "id": "1",
      "name": "Burger Point",
      "category": "lanches",
      "logo": "images/logos/burger-point.jpg",
      "whatsapp": "5568999999999",
      "instagram": "burgerpoint"
    }
  ]
}
```

**Campos obrigatórios:**
- `id`, `name`, `category`, `logo`, `whatsapp`

**Campo opcional:**
- `instagram`

---

## Layout da Página

### Header
- Nome do projeto: **"Guia da Mesa"**
- Subtítulo: **"Sena Madureira - AC"**

### Busca
- Input simples: "Buscar lugar..."
- Busca em tempo real pelo nome

### Filtros (Chips)
- Botões de categoria: `Todos | Lanches | Pizza | Açaí | Almoço | Cafés`
- Scroll horizontal no mobile
- Um selecionado por vez

### Grid de Cards
- **Mobile:** 1 coluna
- **Desktop:** 3-4 colunas
- Cada card:
  - Logo quadrado (72x72px, bordas arredondadas)
  - Nome do lugar
  - Etiqueta da categoria
  - Botão WhatsApp (verde, destacado)
  - Botão Instagram (opcional, cinza)

### Footer
- "Catálogo curado — informações podem mudar"

---

## Funcionalidades

### 1. Busca
- Digita no input → filtra por nome em tempo real
- Case insensitive

### 2. Filtro por Categoria
- Clica em chip → mostra só aquela categoria
- Clica em "Todos" → mostra tudo
- Filtro + busca funcionam juntos

### 3. Contatos
- Botão WhatsApp → abre `https://wa.me/5568999999999`
- Botão Instagram → abre `https://instagram.com/username`

### 4. Empty State
- Se busca/filtro não retornar nada:
  - "Nenhum lugar encontrado"
  - Botão "Limpar filtros"

---

## Design

### Cores (CSS Variables)
```css
--color-primary: #2E7D32;      /* verde para WhatsApp */
--color-secondary: #E1306C;    /* rosa para Instagram */
--color-background: #F8F9FA;
--color-card: #FFFFFF;
--color-text: #212529;
--color-text-light: #6C757D;
--color-border: #DEE2E6;
```

### Estilo
- Limpo, com bastante espaço em branco
- Cards com sombra suave
- Bordas arredondadas (8px)
- Fonte: system fonts (sans-serif)

---

## Como Adicionar um Lugar (Workflow do Curador)

1. Adicionar logo em `images/logos/nome-do-lugar.jpg` (72x72px)
2. Editar `data.json` e adicionar novo objeto em `places`:
   ```json
   {
     "id": "2",
     "name": "Nome do Lugar",
     "category": "lanches",
     "logo": "images/logos/nome-do-lugar.jpg",
     "whatsapp": "5568999999999",
     "instagram": "username"
   }
   ```
3. Commit e push → Netlify faz deploy automático

---

## Deploy no Netlify

1. Conectar repositório GitHub
2. Configurações de build:
   - **Build command:** (deixar vazio)
   - **Publish directory:** `/` (raiz)
3. Deploy automático a cada push na `main`

---

## Seed Data

Incluir 12-15 lugares fictícios de exemplo:
- 3 Lanchonetes
- 2 Pizzarias
- 2 Açaí/Sorvetes
- 3 Restaurantes (almoço)
- 2 Cafés

Com logos placeholder (pode usar https://placehold.co/72x72 ou criar simples)

---

## SEO Básico

No `<head>` do `index.html`:
```html
<title>Guia da Mesa - Sena Madureira, AC</title>
<meta name="description" content="Encontre os melhores lugares para comer em Sena Madureira - AC. Lanchonetes, restaurantes, pizzarias e muito mais.">
<meta property="og:title" content="Guia da Mesa - Sena Madureira">
<meta property="og:description" content="Guia de restaurantes e lugares para comer em Sena Madureira - AC">
<meta property="og:type" content="website">
```

---

## Checklist de Implementação

- [ ] Criar `index.html` com estrutura semântica
- [ ] Criar `style.css` com layout mobile-first
- [ ] Criar `script.js` com busca e filtros
- [ ] Criar `data.json` com seed data (12+ lugares)
- [ ] Adicionar logos placeholder em `images/logos/`
- [ ] Criar `README.md` com instruções
- [ ] Testar no mobile
- [ ] Deploy no Netlify

---

## Prioridades

✅ **Essencial:**
- Cards de lugares funcionando
- Busca funcionando
- Filtro por categoria funcionando
- Botões de contato (WhatsApp/Instagram) funcionando
- Responsivo (mobile + desktop)

❌ **NÃO fazer no MVP:**
- Páginas de detalhe
- Sistema de tags adicional
- Favoritos
- Compartilhamento
- Múltiplos idiomas
- Animações elaboradas
- URL parameters
