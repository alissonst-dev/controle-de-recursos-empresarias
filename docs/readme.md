# Inventario

Autor: Alisson Santos

O Inventario é uma aplicação web responsiva desenvolvida para gerenciamento de estoque empresarial, permitindo o cadastro de produtos, fornecedores e controle de movimentações de entrada e saída.

O sistema foi desenvolvido com foco em organização, responsividade e usabilidade, oferecendo uma interface moderna inspirada em dashboards administrativos.

O frontend da aplicação foi desenvolvido utilizando HTML, CSS, Bootstrap e JavaScript. A persistência de dados é simulada através de uma API Fake utilizando JSON Server.

---

# 📚 Documentação do Projeto

Para entender as regras de negócio, arquitetura e funcionamento da aplicação, consulte os documentos abaixo:

- 📄 Product Requirements Document (PRD)
- 🛠️ Especificação Técnica (Tech Spec)
- 🎨 Software Design Document (SDD)

---

# 🎨 Design

- 🎨 Design System - Identidade visual do sistema
- 🖼️ Protótipo no Figma - Interface e fluxo das telas
- 🌐 Site em Produção - GitHub Pages

---

# 💻 Tecnologias e Dependências

## Front-end

```txt
HTML5
CSS3
JavaScript ES6+
Bootstrap v5.3
```

---

## Bibliotecas JavaScript

```txt
jQuery
jQuery Mask Plugin
```

---

## Persistência e APIs

```txt
JSON Server
ViaCEP API
```

---

# ✅ Checklist | Indicadores de Desempenho (ID)

## RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.

- [x] ID 01 - Prototipa interfaces adaptáveis para mobile e desktop no Figma.
- [x] ID 02 - Implementa layout responsivo utilizando Bootstrap.
- [x] ID 03 - Implementa layout responsivo utilizando CSS Grid e Flexbox.
- [x] ID 04 - Utiliza componentes Bootstrap como Modal, Cards e Offcanvas.
- [x] ID 05 - Utiliza unidades relativas (`rem`, `%`, `vh`).
- [x] ID 06 - Aplica Design System consistente.
- [ ] ID 07 - Utiliza Sass (SCSS).
- [x] ID 08 - Aplica tipografia responsiva.
- [x] ID 09 - Utiliza responsividade de imagens.
- [ ] ID 10 - Otimiza imagens com formatos modernos.

---

## RA2 - Realizar tratamento de formulários e aplicar validações customizadas.

- [x] ID 11 - Implementa validações HTML nativas.
- [ ] ID 12 - Utiliza expressões regulares (REGEX).
- [x] ID 13 - Utiliza elementos de seleção em formulários.
- [] ID 14 - Utiliza localStorage/sessionStorage.

---

## RA3 - Aplicar ferramentas para otimização do desenvolvimento web.

- [x] ID 15 - Configura ambiente com Node.js e NPM.
- [x] ID 16 - Utiliza Git e GitHub.
- [x] ID 17 - Mantém README padronizado.
- [x] ID 18 - Organiza arquivos modularmente.
- [ ] ID 19 - Configura ESLint e Prettier.

---

## RA4 - Aplicar bibliotecas JavaScript para interatividade.

- [] ID 20 - Utiliza jQuery para manipulação do DOM.
- [] ID 21 - Integra jQuery Mask Plugin.

---

## RA5 - Efetuar requisições assíncronas para APIs.

- [] ID 22 - Realiza requisições para JSON Server.
- [] ID 23 - Exibe dados dinamicamente via API Fake.
- [] ID 24 - Integra API pública ViaCEP.

---

# 🚀 Funcionalidades

```txt
Cadastro de produtos
Cadastro de fornecedores
Controle de estoque
Movimentações de entrada
Movimentações de saída
Dashboard administrativo
Consulta automática de CEP
Responsividade para mobile e desktop
```

---

# 🧱 Estrutura do Projeto

```txt
inventario/
│
├── css/
├── js/
├── img/
├── pages/
├── db.json
├── routes.json
├── package.json
└── README.md
```

---

# 🚀 Manual de Execução

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Abrir o projeto

Abra o projeto no Visual Studio Code.

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Executar o JSON Server

### Via script

```bash
npm run json:server
```

### Ou manualmente

```bash
json-server --watch db.json --routes routes.json
```

---

## 5. Executar o Front-end

Abra o arquivo `index.html` utilizando:
- Live Server
- Navegador
- Extensão do VSCode

---

# 🌐 API Fake

Por padrão, o JSON Server executa em:

```txt
http://localhost:3000
```

Rotas disponíveis:

```txt
/produtos
/fornecedores
/movimentacoes
```

---

# 📱 Responsividade

O sistema foi desenvolvido para:
- Desktop
- Tablets
- Smartphones

Utilizando:
- Bootstrap Grid
- Flexbox
- CSS Grid
- Media Queries

---

# 🎯 Objetivo do Projeto

O Inventario foi desenvolvido com o objetivo de fornecer uma solução simples para gerenciamento empresarial, permitindo:

```txt
Controle de estoque
Cadastro de produtos
Cadastro de fornecedores
Controle de movimentações
Organização empresarial
Monitoramento de estoque
```