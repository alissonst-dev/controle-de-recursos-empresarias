# Software Design Document (SDD) - Controle de Estoque Web

Autor: Alisson Santos  
Projeto: Controle de Estoque e Movimentações  
Data: Maio de 2026

---

# 1. Identidade Visual (Design Tokens)

A interface foi projetada no Figma com foco em usabilidade, responsividade e estética moderna em Dark Mode.

---

## Paleta de Cores

Principal (Brand):
`#8B5CF6`

Sidebar / Fundo Escuro:
`#1E1E2E`

Background Geral:
`#F8FAFC`

Cards e Modais:
`#FFFFFF`

Texto Secundário:
`#94A3B8`

Status Positivo:

- Fundo: `#D1FAE5`
- Texto/Icones: `#10B981`

Status Crítico:

- Fundo: `#FEE2E2`
- Texto/Icones: `#EF4444`

Status Informativo:

- Fundo: `#EFF6FF`
- Texto/Icones: `#2563EB`

---

## Tipografia

Família tipográfica:

- Inter
- Roboto

Escala tipográfica:

- Texto auxiliar: `0.875rem`
- Texto padrão: `0.95rem`
- Títulos: `1.25rem`

---

## Espaçamento e Escala

A interface utiliza unidades relativas (`rem`) para:

- Escalabilidade
- Responsividade
- Consistência visual

---

# 2. Arquitetura Front-end

A aplicação utiliza uma arquitetura híbrida baseada em:

```txt
Bootstrap + Componentes CSS Personalizados
```

O Bootstrap será responsável pela:

- Responsividade
- Grid
- Utilitários
- Estrutura base

Os componentes personalizados serão responsáveis pela:

- Identidade visual
- Padronização visual
- Extensão do framework
- Componentização da interface

---

# 3. Tecnologias e Frameworks

## Front-end

```txt
HTML5
CSS3
JavaScript ES6+
```

---

## Framework CSS

Bootstrap v5.3

Recursos utilizados:

- Grid System
- Flexbox
- Utilities
- Offcanvas
- Modais
- Navbar responsiva
- Cards
- Tabelas responsivas

---

## Bibliotecas JavaScript

### jQuery v3.7

Utilizado para:

- Manipulação dinâmica do DOM
- Eventos
- Requisições assíncronas
- Atualização dinâmica da interface

---

### jQuery Mask Plugin

Utilizado para:

- Máscaras de CNPJ
- CEP
- Telefone
- Valores monetários

---

## Ícones

Lucide Icons

---

# 4. Arquitetura de Dados e APIs

A aplicação utilizará comunicação assíncrona para manipulação de dados.

---

## API Pública

ViaCEP  
https://viacep.com.br/

Objetivo:

- Automatizar preenchimento de endereço via CEP

Campos preenchidos:

- Endereço
- Cidade
- Estado

---

## Persistência de Dados

JSON Server

Entidades:

- /produtos
- /fornecedores
- /movimentacoes

---

## Web Storage

Uso de localStorage para:

- Preferências da interface
- Persistência temporária
- Estados auxiliares

---

# 5. Estrutura da Interface

A interface será organizada em componentes reutilizáveis.

---

## Sidebar

Desktop:

- Sidebar fixa lateral

Mobile:

- Navegação Offcanvas

Características:

- Navegação responsiva
- Ícones personalizados
- Estrutura vertical

---

## Dashboard

O dashboard utilizará cards estatísticos responsivos.

Indicadores:

- Total de produtos
- Produtos em estoque
- Estoque baixo
- Produtos sem estoque

Os cards utilizarão:

- Flexbox
- Ícones
- Indicadores visuais
- Variações de status

---

## Tabelas Responsivas

As tabelas utilizarão:

- `.table`
- `.table-hover`
- `.table-responsive`

Recursos:

- Responsividade horizontal
- Paginação
- Ações rápidas
- Status visuais

---

## Modais

Os formulários serão exibidos via modais Bootstrap customizados.

Modais disponíveis:

- Cadastro de produto
- Edição de produto
- Cadastro de fornecedor
- Movimentações

Os modais utilizarão:

- Estrutura responsiva
- Grid customizado
- Componentes reutilizáveis

---

# 6. Componentização CSS

A interface utiliza componentes reutilizáveis personalizados.

Principais componentes:

```txt
meu-form-grid
meu-grupo-input
meu-modal-header
meu-modal-body
meu-modal-footer
btn-salvar
btn-cancelar
meu-botao-paginacao
```

Objetivos:

- Reutilização
- Padronização visual
- Escalabilidade
- Organização do código

---

# 7. Responsividade

A responsividade será baseada em:

- Bootstrap Grid
- Media Queries
- Flexbox
- CSS Grid

Breakpoints principais:

```txt
Mobile: até 767px
Tablet/Desktop: acima de 768px
Desktop Large: acima de 992px
```

Comportamentos:

- Sidebar fixa em desktop
- Offcanvas em mobile
- Grid adaptável
- Tabelas responsivas

---

# 8. Acessibilidade

A aplicação seguirá princípios básicos de acessibilidade utilizando:

- HTML5 semântico
- Labels em formulários
- Atributos ARIA
- Estrutura navegável
- Elementos auxiliares para leitores de tela

---

# 9. Estrutura Funcional do Sistema

O sistema será dividido nos módulos:

```txt
Dashboard
Cadastro de Produtos
Cadastro de Fornecedores
Movimentações de Entrada
Movimentações de Saída
Controle de Estoque
```

---

# 10. Objetivo do Projeto

O projeto tem como objetivo fornecer uma solução web para gerenciamento empresarial simplificado, permitindo:

```txt
Cadastro de produtos
Cadastro de fornecedores
Controle de estoque
Movimentações de entrada
Movimentações de saída
Monitoramento de estoque mínimo
Visualização simplificada de dados
```
