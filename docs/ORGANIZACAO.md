# 📁 Organização do Projeto - Guia da Mesa

> ⚠️ **PONTO CRÍTICO:** A organização é fundamental para a manutenção e escalabilidade do projeto.

---

## 🏗️ Estrutura de Pastas

```
GuiaDoSabor/
│
├── 📄 index.html              # Página principal (catálogo)
├── 📄 lugar.html              # Página de review individual
├── 📄 README.md               # Documentação principal
├── 📄 .gitignore              # Arquivos ignorados pelo Git
│
├── 📂 src/                    # Código fonte
│   ├── 📂 pages/              # Páginas HTML (backups/originais)
│   ├── 📂 styles/             # Arquivos CSS
│   │   ├── style.css          # Estilos globais
│   │   └── review.css         # Estilos de review
│   └── 📂 scripts/            # Arquivos JavaScript
│       ├── script.js          # Lógica da home
│       └── lugar.js           # Lógica da página de review
│
├── 📂 data/                   # Dados do aplicativo
│   ├── data.json              # Dados dos lugares e categorias
│   ├── 📂 reviews/            # Reviews editoriais em JSON
│   │   ├── burger-point.json
│   │   ├── x-tudo-joao.json
│   │   └── pizzaria-bella.json
│   └── 📂 rankings/           # Rankings curados
│       ├── index.json
│       └── top-10-lanches-2026.json
│
├── 📂 public/                 # Arquivos públicos/assets
│   └── 📂 images/             # Imagens
│       └── 📂 logos/          # Logos dos lugares (72x72px)
│
└── 📂 docs/                   # Documentação
    ├── ORGANIZACAO.md         # Este arquivo (estrutura do projeto)
    ├── ROADMAP.md             # Roadmap das 3 fases
    └── ideia.md               # Documentação técnica original
```

---

## 📋 Princípios de Organização

### 1. **Separação por Tipo**
- **`src/`** = Código fonte (HTML, CSS, JS)
- **`data/`** = Dados e conteúdo (JSON)
- **`public/`** = Assets públicos (imagens, fontes)
- **`docs/`** = Documentação

### 2. **Agrupamento por Funcionalidade**
- Reviews ficam em `data/reviews/`
- Rankings ficam em `data/rankings/`
- Estilos separados por contexto (`style.css` vs `review.css`)

### 3. **Nomes Descritivos**
- ✅ `data/reviews/burger-point.json`
- ❌ `review1.json`

### 4. **Hierarquia Clara**
- Arquivos principais na raiz (index.html, lugar.html, README.md)
- Código organizado em subpastas (`src/`, `data/`, `public/`)

---

## 🗂️ Convenções de Nomenclatura

### Arquivos de Dados
- **Lugares:** `data/data.json`
- **Reviews:** `data/reviews/{slug-do-lugar}.json`
- **Rankings:** `data/rankings/{id-do-ranking}.json`

### Arquivos de Código
- **Estilos:** `src/styles/{nome}.css` (kebab-case)
- **Scripts:** `src/scripts/{nome}.js` (kebab-case)
- **Páginas:** `{nome}.html` na raiz (kebab-case)

### Imagens
- **Logos:** `public/images/logos/{nome-do-lugar}.jpg` (kebab-case, 72x72px)
- Formatos aceitos: `.jpg`, `.png`, `.webp`

---

## 📝 Guia de Adição de Arquivos

### Adicionar um Novo Lugar

1. **Logo:**
   ```
   public/images/logos/nome-do-lugar.jpg
   ```

2. **Dados:**
   ```json
   // Adicionar em data/data.json
   {
     "id": "13",
     "name": "Nome do Lugar",
     "category": "lanches",
     "logo": "images/logos/nome-do-lugar.jpg",
     "whatsapp": "5568999999999",
     "instagram": "usuario_instagram"
   }
   ```

### Adicionar uma Review

1. **Arquivo de Review:**
   ```
   data/reviews/nome-do-lugar.json
   ```

2. **Atualizar dados do lugar:**
   ```json
   // Em data/data.json, adicionar ao lugar:
   "hasReview": true,
   "reviewSlug": "nome-do-lugar"
   ```

### Adicionar um Ranking

1. **Arquivo de Ranking:**
   ```
   data/rankings/nome-do-ranking.json
   ```

2. **Atualizar índice:**
   ```json
   // Adicionar em data/rankings/index.json
   {
     "id": "nome-do-ranking",
     "title": "Título do Ranking",
     "description": "Descrição",
     "category": "categoria",
     "year": 2026
   }
   ```

---

## 🚫 O Que NÃO Fazer

### ❌ Arquivos Soltos na Raiz
```
GuiaDoSabor/
├── style.css          # ERRADO - deveria estar em src/styles/
├── data.json          # ERRADO - deveria estar em data/
├── logo1.jpg          # ERRADO - deveria estar em public/images/logos/
```

### ❌ Pastas Desorganizadas
```
data/
├── review1.json       # ERRADO - sem contexto
├── review2.json       # ERRADO - sem contexto
├── lugares.json       # ERRADO - nome genérico
```

### ✅ Estrutura Correta
```
data/
├── data.json          # Dados principais
├── reviews/
│   ├── burger-point.json
│   └── x-tudo-joao.json
└── rankings/
    ├── index.json
    └── top-10-lanches-2026.json
```

---

## 🔄 Manutenção da Organização

### Checklist Semanal
- [ ] Todos os arquivos novos estão nas pastas corretas?
- [ ] Nomes de arquivos seguem a convenção kebab-case?
- [ ] Não há arquivos soltos na raiz?
- [ ] Documentação está atualizada?

### Antes de Commit
```bash
# Verificar estrutura
ls -la

# Verificar se não há arquivos soltos
# Deve ver apenas: index.html, lugar.html, README.md, .gitignore
# e as pastas: src/, data/, public/, docs/
```

---

## 📚 Referências Rápidas

### Caminhos Importantes
- **Home:** `/index.html`
- **Review:** `/lugar.html?slug={slug}`
- **Estilos globais:** `/src/styles/style.css`
- **Dados principais:** `/data/data.json`
- **Reviews:** `/data/reviews/{slug}.json`

### URLs Relativos (dentro do código)
- De `index.html` → `src/styles/style.css`
- De `lugar.html` → `src/styles/review.css`
- De JS → `data/data.json`
- De JS → `data/reviews/{slug}.json`
- De HTML → `public/images/logos/{nome}.jpg`

---

## 🎯 Objetivos da Organização

1. **Escalabilidade:** Fácil adicionar novos lugares, reviews e rankings
2. **Manutenibilidade:** Encontrar arquivos rapidamente
3. **Clareza:** Estrutura óbvia para novos colaboradores
4. **Deploy:** Estrutura compatível com Netlify e outros hosts

---

## 📞 Dúvidas sobre Organização?

Consulte este arquivo SEMPRE antes de:
- Adicionar novos arquivos
- Criar novas pastas
- Mover arquivos existentes
- Refatorar estrutura

**Lembre-se: Organização é um ponto CRÍTICO deste projeto!** 🎯
