# inventario

### Autor: Alisson Santos

O Inventario é uma aplicação web responsiva desenvolvida para gerenciamento de estoque empresarial, permitindo o cadastro de produtos, fornecedores e controle de movimentações de entrada e saída.

O sistema foi desenvolvido com foco em organização, responsividade e usabilidade, oferecendo uma interface moderna inspirada em dashboards administrativos.

O frontend da aplicação é desenvolvido com HTML, CSS, Sass (SCSS) e JavaScript, utilizando Bootstrap para responsividade e componentes visuais. A persistência de dados é simulada através de uma API local desenvolvida com Node.js e Express, utilizando um arquivo JSON como base de dados.

---

## Documentação do Projeto

Para entender as regras de negócio, arquitetura e funcionamento da aplicação, consulte os documentos abaixo:

- [Product Requirements Document (PRD)](./docs/prd.md) - Visão geral, atores e histórias de usuário.
- [Especificação Técnica (Tech Spec)](./docs/spec.md) - Modelo de dados, entidades e rotas da API.
- [Software Design Document (SDD)](./docs/sdd.md) - Arquitetura visual e estrutura da interface.

---

## Design

- [Protótipo no Figma](https://www.figma.com/design/iFHHTdc5GD96uNcmtKHcnZ/meu-projeto---controle-estoque?node-id=0-1&t=xUYR4AGpdfW2OOF2-1) - Telas da aplicação - link.
- [ GitHub Pages](https://alissonst-dev.github.io/controle-de-recursos-empresarias/) - Deploy do projeto.

---

## Tecnologias e Dependências

### Front-end

- HTML5
- CSS3
- Sass (SCSS)
- JavaScript ES6+
- Bootstrap v5.3

---

### Bibliotecas JavaScript

- jQuery
- jQuery Mask Plugin

---

### Persistência e APIs

- Node.js
- Express
- API local com arquivo JSON
- ViaCEP API

---

## ✅ Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.

- [x] ID 01 - Prototipa interfaces adaptáveis para no mínimo os tamanhos de tela mobile e desktop, usando ferramentas de design tradicionais (Figma, Quant UX ou Sketch) ou IA (Stitch).
- [x] ID 02 - Implementa layout responsivo com Framework CSS (Bootstrap, Materialize, Tailwind + DaisyUI) usando Flexbox ou Grid do próprio framework.
- [x] ID 03 - Implementa layout responsivo com CSS puro, usando Flexbox ou Grid Layout.
- [x] ID 04 - Utiliza componentes prontos de um Framework CSS (ex.: card, button) e componentes JavaScript do framework (ex.: modal, carousel).
- [x] ID 05 - Cria layout fluido usando unidades relativas (vw, vh, %, em, rem) no lugar de unidades fixas (px).
- [x] ID 06 - Aplica um Design System consistente (cores, tipografia, padrões de componentes) em toda a aplicação.
- [x] ID 07 - Utiliza Sass (SCSS) com ou sem framework, aplicando variáveis, mixins e funções para modularizar o código.
- [x] ID 08 - Aplica tipografia responsiva (media queries mobile first) ou tipografia fluida (função clamp() + unidades relativas).
- [x] ID 09 - Aplica técnicas de responsividade de imagens usando CSS (object-fit, containers com unidades relativas).
- [x] ID 10 - Otimiza imagens usando formatos modernos (WebP) e carregamento adaptativo (srcset, picture, ou parâmetros do Cloudinary).

---

### RA2 - Realizar tratamento de formulários e aplicar validações customizadas no lado cliente.

- [x] ID 11 - Implementa validação HTML nativa (campos obrigatórios, tipos, limites de caracteres) com mensagens de erro/sucesso no lado cliente.
- [ ] ID 12 - Aplica expressões regulares (REGEX) para validações customizadas (e-mail, telefone, datas, etc.)
- [ ] ID 13 - Utiliza elementos de seleção em formulários (checkbox, radio, select) para coleta de dados.
- [ ] ID 14 - Implementa leitura e escrita no Web Storage (localStorage/sessionStorage) para persistir dados localmente.

---

### RA3 - Aplicar ferramentas para otimização do processo de desenvolvimento web.

- [x] ID 15 - Configura ambiente com Node.js e NPM para gerenciamento de pacotes e dependências.
- [x] ID 16 - Utiliza boas práticas de versionamento no Git/GitHub (branch main ou branches específicos, uso de .gitignore).
- [x] ID 17 - Mantém um README.md padronizado, conforme template da disciplina, com checklist preenchido.
- [x] ID 18 - Organiza arquivos do projeto de forma modular, seguindo padrão de exemplo fornecido.
- [x] ID 19 - Configura linters e formatadores (ESLint, Prettier) para manter qualidade e padronização do código.

---

### RA4 - Aplicar bibliotecas de funções e componentes em JavaScript para aprimorar a interatividade de páginas web.

- [ ] ID 20 - Utiliza jQuery para manipulação do DOM e interatividade (eventos, animações, manipulação de elementos)
- [ ] ID 21 - Integra e configura um plugin jQuery relevante (ex.: jQuery Mask Plugin).

---

### RA5 - Efetuar requisições assíncronas para uma API fake e APIs públicas, permitindo a obtenção e manipulação de dados dinamicamente.

- [ ] ID 22 - Realiza requisições assíncronas para uma API fake (ex.: JSON Server) para persistir dados de um formulário.
- [ ] ID 23 - Realiza requisições assíncronas para uma API fake para exibir dados na página.
- [ ] ID 24 - Realiza requisições assíncronas para APIs públicas reais (OpenWeather, ViaCEP etc.), exibindo os dados e tratando erros.

---

## Manual de Execução

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

### 2. Abrir o projeto

Abra o projeto no Visual Studio Code.

---

### 3. Instalar dependências do Front-end

```bash
npm install
```

---

### 4. Compilar o Sass

Na raiz do projeto, execute:

```bash
npx sass --no-source-map assets/css/main.scss assets/css/style.css
```
#### Ou

```bash
npm run sass
```

---

### 5. Instalar dependências do Back-end

#### Acesse a pasta do servidor

```bash
cd server
```

#### Depois execute

```bash
npm install
```

### 6. Executar o Back-end

#### Dentro da pasta server, execute:

```bash
npm run dev
```

## API

Por padrão, a API local executa em:

```txt
http://localhost:3000
```

#### Rotas disponíveis atualmente

```txt
/api/produtos
/api/fornecedores
/api/movimentacoes
```

### 7. Executar o Front-end

#### Abra o arquivo:

```txt
index.html
```

ou:

```txt
app/pages/produtos/index.html
```

#### Utilizando o Live Server no Visual Studio Code.

## Responsividade

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

## Objetivo do Projeto

O Inventario foi desenvolvido para fornecer uma solução simples e moderna de gerenciamento empresarial, permitindo:

```txt
Controle de estoque
Cadastro de produtos
Cadastro de fornecedores
Controle de movimentações
Monitoramento de estoque
Organização empresarial
```
