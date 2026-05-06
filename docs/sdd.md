# Software Design Document (SDD) - Controle de Estoque Web

**Autor:** Alisson Santos
**Projeto:** Controle de Estoque e Registro de Vendas
**Data:** Maio de 2026

## 1. Identidade Visual (Design Tokens)

A interface foi projetada no Figma com foco em usabilidade e estética moderna (Dark Mode).

*   **Paleta de Cores:**
    *   **Principal (Brand):** `#8B5CF6` (Roxo Vibrante)
    *   **Fundo (Background):** `#1F2937` (Grafite Escuro)
    *   **Superfície (Cards/Modais):** `#FFFFFF` (Branco com elevação)
    *   **Status Positivo:** `#D1FAE5` / `#10B981` (Verde)
    *   **Status Crítico:** `#FEE2E2` / `#EF4444` (Vermelho)
*   **Tipografia:** Família **Inter** ou **Roboto**, utilizando escala de `0.875rem` para textos de apoio e `1.25rem` para títulos.
*   **Grid:** Sistema de 12 colunas para desktop e 4 colunas para mobile.

## 2. Tecnologias e Frameworks

*   **Framework CSS:** **Bootstrap v5.3**. O projeto utilizará o sistema de *Grid* e *Flexbox* nativos para garantir a responsividade (ID 02 e ID 03 do checklist).
*   **Bibliotecas JavaScript:**
    *   **jQuery v3.7:** Utilizado para manipulação dinâmica do DOM e gestão de eventos (ID 20).
    *   **jQuery Mask Plugin:** Aplicação de máscaras em inputs de CNPJ, CEP e Valores Monetários (ID 21).
*   **Ícones:** Lucide Icons.

## 3. Arquitetura de Dados e APIs

A aplicação seguirá o modelo de consumo assíncrono de dados para garantir fluidez.

*   **API Pública:** **ViaCEP** (https://viacep.com.br/).
    *   *Objetivo:* Automação do preenchimento de endereço (Logradouro, Bairro, Cidade, Estado) a partir do CEP no cadastro de fornecedores (ID 24).
*   **API Fake (Persistência):** **JSON Server**.
    *   *Entidades:* `/produtos`, `/fornecedores`, `/movimentacoes`.
*   **Web Storage:** Uso de `localStorage` para persistência temporária de estados da interface (ID 14).

## 4. Mapeamento de Componentes (Framework CSS)

Três componentes projetados no Figma que serão implementados via Bootstrap:

1.  **Navbar/Sidebar Lateral:** Implementada com classes de navegação vertical do Bootstrap, utilizando colapso para visualização mobile.
2.  **Cards de Indicadores (Dashboard):** Utilização do componente `.card` com variações de cores de borda para destacar status de estoque (Estável, Alerta, Crítico).
3.  **Modal de Edição/Cadastro:** O formulário de "Editar Produto" e "Novo Produto" utilizará o componente `.modal` do framework para interação sem troca de página.