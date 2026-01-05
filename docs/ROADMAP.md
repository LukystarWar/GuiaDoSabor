# Roadmap - Guia da Mesa

**Visão:** Evoluir de um catálogo simples para um guia editorial com autoridade crítica, tipo Michelin Guide para Sena Madureira - AC.

---

## 🎯 FASE 1: Catálogo Básico ✅ (CONCLUÍDO)

**Objetivo:** Gerar utilidade imediata com listagem completa de lugares.

### Funcionalidades
- ✅ Listagem de lugares com contato (WhatsApp/Instagram)
- ✅ Busca por nome
- ✅ Filtro por categoria
- ✅ Layout mobile-first responsivo
- ✅ Deploy no Netlify

### Estrutura de Dados Atual
```json
{
  "id": "1",
  "name": "Burger Point",
  "category": "lanches",
  "logo": "images/logos/burger-point.jpg",
  "whatsapp": "5568999991234",
  "instagram": "burgerpoint"
}
```

### Foco Agora
📍 **Adicionar o máximo de estabelecimentos possível da cidade**
- Conseguir logos de todos os lugares
- Validar contatos (WhatsApp principalmente)
- Organizar por categorias

---

## 📝 FASE 2: Reviews Editoriais (Próximo)

**Objetivo:** Adicionar **críticas/reviews curadas por você** como editor único.

### Conceito
- **Você é o curador/crítico oficial** (autoridade editorial)
- Reviews honestas, detalhadas e com credibilidade
- Página individual para cada lugar com review
- Reviews opcionais (nem todo lugar precisa ter review de cara)

### Nova Estrutura de Dados

**Adicionar em data.json:**
```json
{
  "id": "1",
  "name": "Burger Point",
  "category": "lanches",
  "logo": "images/logos/burger-point.jpg",
  "whatsapp": "5568999991234",
  "instagram": "burgerpoint",

  // NOVO: indicador de review
  "hasReview": true,
  "reviewSlug": "burger-point"
}
```

**Criar arquivo separado: `reviews/burger-point.json`**
```json
{
  "placeId": "1",
  "slug": "burger-point",
  "visitDate": "2026-01-10",
  "publishDate": "2026-01-15",

  "review": {
    "summary": "Resumo em 1-2 frases do que achei",
    "fullText": "Review completa em markdown (2-3 parágrafos)",

    "ratings": {
      "food": 4.5,        // Comida (0-5)
      "service": 4.0,     // Atendimento (0-5)
      "ambiance": 3.5,    // Ambiente (0-5)
      "value": 4.5        // Custo-benefício (0-5)
    },

    "highlights": [
      "Carne bem temperada",
      "Entrega rápida",
      "Preço justo"
    ],

    "dishRecommendations": [
      {
        "name": "X-Bacon especial",
        "price": "R$ 18,00",
        "note": "Pedida obrigatória, carne suculenta"
      }
    ],

    "priceRange": "$$",  // $ (barato), $$ (médio), $$$ (caro)
    "bestFor": ["Lanche noturno", "Família"]
  },

  "curatorNote": "Nota pessoal/contexto adicional"
}
```

### Páginas
1. **Home (/)** - catálogo continua igual, mas cards com review mostram badge "⭐ Avaliado"
2. **Lugar (/lugar/burger-point)** - página nova com:
   - Header com logo, nome, categoria, contatos
   - Review completa do curador
   - Ratings visuais (estrelas/barras)
   - Pratos recomendados
   - Data da visita/publicação
   - Assinatura do curador

### Design da Review
- Tom editorial, profissional mas acessível
- Transparência: mostrar data da visita
- Foto/assinatura do curador (credibilidade)
- Disclaimer: "Review baseada em visita em [data]"

### Workflow do Curador
1. Visitar o estabelecimento
2. Fazer anotações (comida, atendimento, ambiente, preços)
3. Criar arquivo `reviews/slug-do-lugar.json`
4. Marcar `hasReview: true` em `data.json`
5. Commit e push → Netlify deploy

---

## 🏆 FASE 3: Rankings e Indicações

**Objetivo:** Expressar opinião crítica com rankings, selos e destaques.

### Funcionalidades

#### 1. Selos/Badges Especiais
Lugares podem receber selos curados por você:
- 🌟 **"Imperdível"** - O melhor da categoria
- 💰 **"Melhor Custo-Benefício"**
- 👨‍👩‍👧 **"Ideal para Família"**
- 🌙 **"Melhor da Noite"**
- ⚡ **"Rápido e Bom"**
- 🎖️ **"Tradição Local"**

#### 2. Rankings Curados
Páginas especiais com suas listas:
- **Top 10 Lanches de Sena Madureira**
- **Melhores Custo-Benefício**
- **Onde Comer Bem por Menos de R$ 20**
- **Lugares que Todo Turista Deve Conhecer**
- **Escondidos que Valem a Visita**

#### 3. Estrutura de Dados (Fase 3)

**Adicionar em reviews:**
```json
{
  "placeId": "1",
  "slug": "burger-point",

  // NOVO: selos e indicações
  "awards": [
    {
      "id": "imperdivel",
      "name": "Imperdível",
      "emoji": "🌟",
      "reason": "Melhor hambúrguer da cidade"
    },
    {
      "id": "custo-beneficio",
      "name": "Melhor Custo-Benefício",
      "emoji": "💰"
    }
  ],

  "rankings": [
    {
      "listId": "top-10-lanches",
      "position": 2,
      "year": 2026
    }
  ]
}
```

**Criar: `rankings/top-10-lanches-2026.json`**
```json
{
  "id": "top-10-lanches-2026",
  "title": "Top 10 Lanches de Sena Madureira 2026",
  "description": "Os melhores lanches da cidade, curados e testados",
  "publishDate": "2026-12-15",
  "year": 2026,

  "places": [
    {
      "position": 1,
      "placeId": "3",
      "reason": "Por que esse é #1"
    },
    {
      "position": 2,
      "placeId": "1",
      "reason": "Por que esse é #2"
    }
    // ... até 10
  ],

  "curatorNote": "Metodologia: visitei todos entre março e novembro de 2026..."
}
```

### Páginas Novas (Fase 3)
- **/rankings** - Lista de todos os rankings
- **/rankings/top-10-lanches-2026** - Página do ranking específico
- **/selos** - Explicação de cada selo e quem tem
- **/sobre** - Sobre o curador, metodologia, credibilidade

### Credibilidade Editorial
- Transparência: explicar metodologia de avaliação
- Consistência: critérios claros
- Atualização: revisitar lugares periodicamente
- Ética: nunca aceitar pagamento por reviews

---

## 📊 Comparativo das Fases

| Aspecto | Fase 1 | Fase 2 | Fase 3 |
|---------|--------|--------|--------|
| **Páginas** | 1 (home) | 2 (home + lugar) | 5+ (home, lugar, rankings, selos, sobre) |
| **Dados** | 1 JSON | 2 JSONs (data + reviews) | 3+ JSONs (data, reviews, rankings) |
| **Conteúdo** | Catálogo | Reviews editoriais | Rankings + selos |
| **Autoridade** | Lista | Crítico | Guia oficial |
| **Trabalho** | Baixo | Médio (1 review/semana) | Alto (rankings anuais) |

---

## 🎯 Próximos Passos Imediatos

### Para Fase 1 (agora)
- [ ] Mapear todos os estabelecimentos de Sena Madureira
- [ ] Conseguir logos/fotos de todos
- [ ] Validar contatos (testar WhatsApp)
- [ ] Adicionar todos ao data.json
- [ ] Objetivo: **ter catálogo completo da cidade**

### Preparação para Fase 2
- [ ] Decidir quais lugares avaliar primeiro (mais populares?)
- [ ] Definir template de anotações para visitas
- [ ] Criar identidade do curador (foto, bio)
- [ ] Definir critérios de avaliação claros
- [ ] Implementar páginas individuais de lugares

---

## 💡 Ideias Futuras (Fase 4+)

- **Mapa interativo** com localização dos lugares
- **Fotos dos pratos** (galeria)
- **Busca avançada** (por preço, tipo de comida, etc)
- **Newsletter** com novos reviews
- **Versão impressa** do guia anual
- **Parcerias** com hotéis/turismo local
- **Expansão** para outras cidades do Acre

---

## 🤔 Decisões de Design/Ética

### O que o guia NÃO faz:
- ❌ Aceitar pagamento por reviews
- ❌ Reviews de lugares não visitados
- ❌ Reviews anônimas (sempre assinadas pelo curador)
- ❌ Delivery/venda de produtos
- ❌ Sistema de comentários públicos (só opinião editorial)

### O que o guia faz:
- ✅ Reviews honestas e independentes
- ✅ Transparência nas avaliações
- ✅ Foco na experiência local
- ✅ Valorizar estabelecimentos pequenos/familiares
- ✅ Contextualizar para turistas e locais

---

**Última atualização:** Janeiro 2026
