# inventario

### Autor: Alisson Santos

O Inventario é uma aplicação web responsiva desenvolvida para gerenciamento de estoque empresarial, permitindo o cadastro de produtos, fornecedores e controle de movimentações de entrada e saída.

O sistema foi desenvolvido com foco em organização, responsividade e usabilidade, oferecendo uma interface moderna inspirada em dashboards administrativos.

O frontend da aplicação é desenvolvido com HTML, CSS e JavaScript, utilizando Bootstrap para responsividade e componentes visuais. A persistência de dados é simulada através de uma API Fake utilizando JSON Server.

---

## 📚 Documentação do Projeto

Para entender as regras de negócio, arquitetura e funcionamento da aplicação, consulte os documentos abaixo:

- [📄 Product Requirements Document (PRD)](./docs/prd.md) - Visão geral, atores e histórias de usuário.
- [🛠️ Especificação Técnica (Tech Spec)](./docs/spec.md) - Modelo de dados, entidades e rotas da API.
- [🎨 Software Design Document (SDD)](./docs/sdd.md) - Arquitetura visual e estrutura da interface.

---

## 🎨 Design

- [🎨 Design System](./docs/design-system.md) - Identidade visual da aplicação.
- [🖼️ Protótipo no Figma](https://www.figma.com/design/iFHHTdc5GD96uNcmtKHcnZ/meu-projeto---controle-estoque?node-id=0-1&t=xUYR4AGpdfW2OOF2-1) - Telas da aplicação - link.
- [🌐 GitHub Pages](#) - Deploy do projeto.

---

## 💻 Tecnologias e Dependências

### Front-end

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap v5.3

---

### Bibliotecas JavaScript

- jQuery
- jQuery Mask Plugin

---

### Persistência e APIs

- JSON Server
- ViaCEP API

---

## ✅ Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.

- [x] ID 01 - Prototipa interfaces adaptáveis para mobile e desktop.
- [x] ID 02 - Implementa layout responsivo com Framework CSS.
- [x] ID 03 - Implementa layout responsivo com CSS Grid e Flexbox.
- [x] ID 04 - Utiliza componentes do Framework CSS.
- [x] ID 05 - Utiliza unidades relativas (vw, vh, %, em, rem).
- [x] ID 06 - Aplica Design System consistente.
- [ ] ID 07 - Utiliza Sass (SCSS).
- [x] ID 08 - Aplica tipografia responsiva.
- [] ID 09 - Responsividade de imagens.
- [ ] ID 10 - Otimização de imagens.

---

### RA2 - Formulários e Validação

- [x] ID 11 - Validação HTML nativa.
- [ ] ID 12 - Validação com REGEX.
- [] ID 13 - Uso de select, checkbox e radio.
- [] ID 14 - Uso de Web Storage.

---

### RA3 - Ferramentas e Organização

- [x] ID 15 - Uso de Node.js e NPM.
- [x] ID 16 - Versionamento com Git/GitHub.
- [x] ID 17 - README padronizado.
- [x] ID 18 - Organização modular do projeto.
- [ ] ID 19 - Uso de ESLint/Prettier.

---

### RA4 - JavaScript e Interatividade

- [] ID 20 - Uso de jQuery.
- [] ID 21 - Plugin jQuery.

---

### RA5 - APIs

- [] ID 22 - Requisições para API Fake (JSON Server).
- [] ID 23 - Exibição dinâmica de dados da API.
- [] ID 24 - Integração com API pública (ViaCEP).

---

## 🚀 Funcionalidades

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

## 🧱 Estrutura do Projeto

```txt
inventario/
│
├── css/
├── js/
├── img/
├── docs/
├── db.json
├── routes.json
├── package.json
└── README.md
```

---

## 🚀 Manual de Execução

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

### 2. Abrir o projeto

Abra o projeto no Visual Studio Code.

---

### 3. Instalar dependências

```bash
npm install
```

---

### 4. Executar o JSON Server

#### Via script

```bash
npm run json:server
```

#### Ou manualmente

```bash
json-server --watch db.json --routes routes.json
```

---

### 5. Executar o Front-end

Abra o arquivo `index.html` utilizando:

- Live Server
- Navegador
- Extensão do VSCode

---

## 🌐 API Fake

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

## 📱 Responsividade

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

## 🎯 Objetivo do Projeto

O Inventario foi desenvolvido para fornecer uma solução simples e moderna de gerenciamento empresarial, permitindo:

```txt
Controle de estoque
Cadastro de produtos
Cadastro de fornecedores
Controle de movimentações
Monitoramento de estoque
Organização empresarial
```
