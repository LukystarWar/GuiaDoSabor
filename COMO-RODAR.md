# 🚀 Como Rodar o Guia da Mesa Localmente

## ⚠️ IMPORTANTE: Você PRECISA de um servidor HTTP!

**Não funciona abrindo direto o arquivo HTML** (file://) por causa de restrições de segurança (CORS) do navegador ao fazer `fetch()` de arquivos JSON.

---

## ✅ Opção 1: XAMPP (Você já tem!)

Como o projeto está em `c:\xampp\htdocs\GuiaDoSabor`:

1. **Certifique-se que o Apache está rodando no XAMPP**
2. **Acesse no navegador:**
   ```
   http://localhost/GuiaDoSabor/
   ```

**Pronto! Deve funcionar perfeitamente.**

---

## ✅ Opção 2: Python (Rápido e Simples)

Se o XAMPP não estiver rodando ou você quiser um servidor dedicado:

```bash
# Na pasta do projeto
cd c:\xampp\htdocs\GuiaDoSabor

# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

---

## ✅ Opção 3: Node.js (http-server)

```bash
# Instalar globalmente (uma vez)
npm install -g http-server

# Na pasta do projeto
cd c:\xampp\htdocs\GuiaDoSabor

# Rodar servidor
http-server -p 8000

# Acesse: http://localhost:8000
```

---

## ✅ Opção 4: VS Code Live Server

1. Instale a extensão **Live Server** no VS Code
2. Abra a pasta do projeto no VS Code
3. Clique com botão direito no `index.html`
4. Selecione **"Open with Live Server"**

---

## 🧪 Testando as Páginas

Depois de iniciar o servidor, acesse:

- **Catálogo:** http://localhost/GuiaDoSabor/ ou http://localhost:8000/
- **Rankings:** http://localhost/GuiaDoSabor/rankings.html
- **Ranking Individual:** http://localhost/GuiaDoSabor/ranking.html?id=top-10-lanches-2026
- **Review:** http://localhost/GuiaDoSabor/lugar.html?slug=burger-point
- **Sobre:** http://localhost/GuiaDoSabor/sobre.html

---

## ❌ O que NÃO fazer

**Não abra assim:**
```
file:///c:/xampp/htdocs/GuiaDoSabor/index.html  ❌
```

**Isso vai dar erro de CORS!**

---

## 🐛 Troubleshooting

### Erro: "Erro ao carregar dados" ou "Erro ao carregar o ranking"

**Causa:** Você está abrindo o arquivo HTML diretamente (file://)

**Solução:** Use uma das opções de servidor acima

### Erro: "Failed to fetch"

**Causa:** Servidor não está rodando ou URL incorreta

**Solução:**
1. Verifique se o servidor está rodando
2. Verifique a URL no navegador (deve ser http://localhost...)
3. Veja o console do navegador (F12) para mais detalhes

### Imagens não aparecem

**Normal!** As imagens são placeholders. Os caminhos estão corretos, mas as imagens reais ainda não foram adicionadas em `public/images/logos/`

---

## ✅ Checklist Rápido

- [ ] Servidor HTTP está rodando?
- [ ] Acessando via http://localhost... ?
- [ ] Console do navegador (F12) mostra algum erro?
- [ ] Arquivos JSON existem em `data/`?

---

**Use sempre um servidor HTTP local!** 🚀
