# 📂 Estrutura de Pastas - Guia Completo

## Hierarquia do Projeto

```
PROJETO DE SEGURANÇA DO TRABALHO/
│
├── 📄 index.html                 ← Página principal (ABRIR AQUI!)
├── 📄 README.md                  ← Documentação do projeto
├── 📄 package.json               ← Metadados do projeto
├── 📄 .gitignore                 ← Configuração Git
│
├── 📁 css/
│   └── 📄 styles.css             ← Estilos customizados globais
│
├── 📁 js/
│   ├── 📄 config.js              ← Configurações da aplicação
│   ├── 📄 utils.js               ← Funções utilitárias reutilizáveis
│   ├── 📄 script.js              ← Lógica principal da aplicação
│   └── 📄 (outros módulos)       ← Outros scripts JavaScript
│
├── 📁 db/
│   └── 📄 database.js            ← Gerenciamento de IndexedDB
│
├── 📁 img/
│   ├── 📄 download.jpg           ← Logo WKVE Telecom
│   └── 📄 (outras imagens)       ← Ícones, backgrounds, etc
│
├── 📁 assets/
│   ├── 📄 fonts/                 ← Fontes customizadas (futuro)
│   ├── 📄 icons/                 ← Ícones específicos (futuro)
│   └── 📄 data/                  ← Dados estáticos (futuro)
│
└── 📁 .git/
    └── (Histórico do Git)
```

---

## 📝 Descrição de Cada Arquivo

### Arquivos Raiz

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | **Arquivo principal** - Abra este no navegador |
| `README.md` | Documentação completa do projeto |
| `package.json` | Metadados do projeto (versão, dependências, etc) |
| `.gitignore` | Configuração para ignorar arquivos no Git |

### 📁 Pasta: `css/`

| Arquivo | Descrição |
|---------|-----------|
| `styles.css` | Estilos customizados que complementam o Tailwind CSS |

**Conteúdo:**
- Estilos para inputs range
- Animações personalizadas
- Customizações de scrollbar
- Hover effects

---

### 📁 Pasta: `js/`

| Arquivo | Descrição |
|---------|-----------|
| `config.js` | Constantes e configurações da aplicação |
| `utils.js` | Funções utilitárias reutilizáveis |
| `script.js` | Lógica principal (formulário, abas, etc) |

**config.js - Contém:**
- Configuração do banco de dados
- Escalas de avaliação
- Mensagens do sistema
- Cores e temas

**utils.js - Funções:**
- `escapeHTML()` - Segurança contra XSS
- `formatarData()` - Formatação de datas
- `obterStatusEscala()` - Obter descrição de status
- `validarFormulario()` - Validação de dados
- `converterParaCSV()` - Export de dados

**script.js - Contém:**
- Lógica do formulário
- Sistema de abas
- Atualizador de relógio
- Renderização do histórico

---

### 📁 Pasta: `db/`

| Arquivo | Descrição |
|---------|-----------|
| `database.js` | Gerenciamento completo do IndexedDB |

**Funções principais:**
- `inicializarBancoDados()` - Setup do DB
- `salvarAvaliacao()` - Insert de dados
- `obterTodasAvaliacoes()` - Select all
- `deletarAvaliacao()` - Delete por ID
- `limparBancoDados()` - Clear all

---

### 📁 Pasta: `img/`

| Arquivo | Descrição |
|---------|-----------|
| `download.jpg` | Logo WKVE Telecom (cabeçalho) |
| *(futuro)* | Outras imagens do projeto |

---

### 📁 Pasta: `assets/`

Reservada para:
- Fontes customizadas
- Ícones específicos
- Dados estáticos
- Outros recursos

---

## 🔄 Fluxo de Carregamento

```
index.html
    ↓
1. Head (CDN: Tailwind, FontAwesome)
2. Styles (css/styles.css)
    ↓
Body
    ↓
3. Config (js/config.js)
4. Utils (js/utils.js)
5. Database (db/database.js)
6. Script (js/script.js)
    ↓
Aplicação Pronta!
```

---

## 📦 Dependências Externas

### Via CDN:
- **Tailwind CSS** 3.x - Framework CSS
- **FontAwesome** 6.4.0 - Ícones

### Internas (JavaScript):
- Nenhuma dependência externa
- Usa apenas API nativa do navegador

---

## 🎯 Como Adicionar Novos Arquivos

### Novo arquivo JavaScript:
1. Crie em `js/`
2. Carregue em `index.html` **ANTES** de `script.js`

### Novo arquivo CSS:
1. Crie em `css/`
2. Importe em `index.html` no `<head>`

### Nova imagem:
1. Coloque em `img/`
2. Referencie: `<img src="img/arquivo.png">`

---

## ✅ Checklist de Organização

- ✅ Pastas separadas por tipo (css, js, db, img)
- ✅ Nomes descritivos para arquivos
- ✅ Arquivo de configuração centralizado
- ✅ Utilitários reutilizáveis em módulo separado
- ✅ Banco de dados em pasta dedicada
- ✅ Documentação completa
- ✅ .gitignore configurado
- ✅ package.json preenchido

---

## 🚀 Próximos Passos (Sugestões)

1. Adicionar testes (pasta `test/`)
2. Criar página de documentação HTML
3. Adicionar funcionalidade de export/import
4. Implementar PWA (Progressive Web App)
5. Adicionar dark mode
6. Criar API backend (se necessário)

---

**Última atualização:** 2026-07-14  
**Status:** ✅ Organizado e Documentado
