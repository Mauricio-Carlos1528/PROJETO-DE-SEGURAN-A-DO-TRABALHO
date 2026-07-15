# Check-in Diário de Condições - WKVE Telecom

Sistema web para registro diário de condições de saúde e segurança dos colaboradores.

---

## 📁 Estrutura do Projeto

```
PROJETO DE SEGURANÇA DO TRABALHO/
│
├── index.html                    # Página principal da aplicação
│
├── css/
│   └── styles.css               # Estilos customizados (complementa Tailwind)
│
├── js/
│   └── script.js                # Lógica principal da aplicação
│
├── db/
│   └── database.js              # Gerenciamento do banco de dados (IndexedDB)
│
├── img/
│   └── download.jpg             # Logo WKVE Telecom
│
├── assets/                       # Recursos adicionais (ícones, fonts, etc)
│
└── README.md                    # Este arquivo
```

---

## 🚀 Como Usar

1. **Abrir a aplicação:**
   - Abra o arquivo `index.html` em um navegador web

2. **Preencher o Check-in:**
   - Insira seu nome completo
   - Avalie sua disposição física (1-5)
   - Avalie seu estado mental (1-5)
   - Indique se sente dor ou desconforto
   - Confirme se está apto para trabalhar
   - Adicione observações se necessário
   - Clique em "Enviar Avaliação Diária"

3. **Visualizar Histórico:**
   - Clique na aba "Histórico de Testes"
   - Use o campo de busca para filtrar por colaborador

---

## 💾 Banco de Dados

A aplicação usa **IndexedDB** (banco de dados do navegador):
- ✅ Funciona **offline** (sem internet)
- ✅ Dados salvos **localmente** no navegador
- ✅ Sem necessidade de servidor
- ⚠️ Dados podem ser deletados se o cache do navegador for limpo

### Campos Armazenados:
- Nome do colaborador
- Data e hora do registro
- Disposição física (1-5)
- Estado mental (1-5)
- Presença de dor/desconforto
- Aptidão para trabalhar
- Observações adicionais

---

## 🎨 Customização

### Cores e Estilos
Modifique `css/styles.css` para alterar aparência

### Scripts
Adicione funcionalidades em `js/script.js`

### Funcionalidades
Estenda `db/database.js` para adicionar operações no banco

---

## 🔧 Tecnologias

- **HTML5** - Estrutura
- **Tailwind CSS** - Framework de estilos
- **JavaScript (Vanilla)** - Lógica
- **IndexedDB** - Banco de dados local
- **FontAwesome** - Ícones

---

## 📋 Funcionalidades

✅ Formulário de check-in diário  
✅ Validação de dados  
✅ Histórico com filtro de busca  
✅ Alertas de sucesso/erro  
✅ Relógio em tempo real  
✅ Design responsivo  
✅ Funciona offline  

---

## ⚠️ Notas Importantes

1. Este sistema usa **localStorage do navegador**
2. Limpar cache/cookies do navegador **deletará** todos os dados
3. Para fazer **backup**, exporte os dados antes
4. Use em **navegadores modernos** (Chrome, Firefox, Safari, Edge)

---

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com o departamento de TI.

---

**Versão:** 1.0  
**Última atualização:** 2026-07-14  
**Desenvolvido para:** WKVE Telecom
