# Product Requirements Document (PRD) - Inventario

---

# 1. Visão Geral e Objetivo

O Inventario é uma aplicação web responsiva desenvolvida para auxiliar no gerenciamento de estoque de pequenos negócios.

O sistema permite:

- Cadastro de produtos
- Cadastro de fornecedores
- Controle de estoque
- Movimentações de entrada e saída
- Monitoramento de produtos com estoque baixo

O objetivo da aplicação é substituir controles manuais e melhorar a organização das informações empresariais.

---

## Regra de Negócio Principal

Toda movimentação realizada deve atualizar automaticamente o estoque do produto.

Regras:

- Movimentações de entrada aumentam o estoque
- Movimentações de saída reduzem o estoque
- O sistema deve impedir saídas sem estoque suficiente

---

# 2. Atores do Sistema

## Administrador

Usuário responsável por:

- Cadastrar produtos
- Cadastrar fornecedores
- Realizar movimentações
- Gerenciar estoque
- Visualizar informações do sistema

---

## Sistema

Responsável por:

- Validar dados
- Atualizar estoque automaticamente
- Garantir consistência das informações
- Persistir os dados

---

# 3. Histórias de Usuário e Escopo

As funcionalidades do sistema estão organizadas em épicos.

---

# Épico 1: Gestão de Produtos

## US01 - Cadastro de Produto

Como um Administrador, quero cadastrar produtos informando seus dados principais, para manter o controle do estoque.

### Critérios de Aceitação

- O produto deve possuir nome
- O produto deve possuir categoria
- O preço de venda deve ser maior que zero
- A quantidade não pode ser negativa

---

## US02 - Listagem de Produtos

Como um Administrador, quero visualizar os produtos cadastrados, para acompanhar o estoque disponível.

---

## US03 - Edição de Produto

Como um Administrador, quero editar os dados de um produto, para corrigir informações incorretas.

---

## US04 - Exclusão de Produto

Como um Administrador, quero excluir produtos do sistema, para remover itens que não são mais utilizados.

---

# Épico 2: Gestão de Fornecedores

## US05 - Cadastro de Fornecedor

Como um Administrador, quero cadastrar fornecedores, para associá-los aos produtos do sistema.

### Critérios de Aceitação

- O fornecedor deve possuir nome
- O fornecedor deve possuir CNPJ válido
- O sistema deve permitir preenchimento automático via CEP

---

## US06 - Listagem de Fornecedores

Como um Administrador, quero visualizar os fornecedores cadastrados, para gerenciar informações empresariais.

---

# Épico 3: Movimentações de Estoque

## US07 - Registrar Movimentação

Como um Administrador, quero registrar movimentações de entrada e saída, para controlar o estoque dos produtos.

### Critérios de Aceitação

- O usuário deve selecionar um produto
- O usuário deve informar a quantidade
- O usuário deve escolher o tipo da movimentação
- O sistema deve atualizar o estoque automaticamente
- O sistema deve impedir saídas sem estoque suficiente

---

## US08 - Histórico de Movimentações

Como um Administrador, quero visualizar o histórico de movimentações, para acompanhar alterações no estoque.

---

# Épico 4: Visualização e Controle

## US09 - Dashboard

Como um Administrador, quero visualizar indicadores rápidos do sistema, para acompanhar a situação do estoque.

Indicadores:

- Total de produtos
- Produtos em estoque
- Produtos com estoque baixo
- Produtos sem estoque

---

## US10 - Persistência de Dados

Como um Administrador, quero que os dados permaneçam salvos após recarregar a página, para evitar perda de informações.

---

# Épico 5: Integrações e Usabilidade

## US11 - Consulta de CEP

Como um Administrador, quero preencher o CEP e obter automaticamente o endereço, para facilitar o cadastro de fornecedores.

---

## US12 - Responsividade

Como um Administrador, quero acessar o sistema em dispositivos móveis e desktop, para utilizar o sistema em diferentes telas.

---

## US13 - Validação de Formulários

Como um Administrador, quero que o sistema valide os dados inseridos, para evitar erros de cadastro.

---

# 4. Requisitos Funcionais

```txt
RF01 - Cadastrar produtos
RF02 - Editar produtos
RF03 - Excluir produtos
RF04 - Listar produtos
RF05 - Cadastrar fornecedores
RF06 - Listar fornecedores
RF07 - Registrar movimentações
RF08 - Atualizar estoque automaticamente
RF09 - Consultar CEP via API
RF10 - Exibir dashboard
RF11 - Persistir dados
```

---

# 5. Requisitos Não Funcionais

```txt
RNF01 - O sistema deve ser responsivo
RNF02 - O sistema deve possuir interface intuitiva
RNF03 - O sistema deve utilizar Bootstrap v5.3
RNF04 - O sistema deve utilizar JSON Server
RNF05 - O sistema deve possuir tempo de resposta adequado
RNF06 - O sistema deve utilizar HTML5 semântico
RNF07 - O sistema deve possuir acessibilidade básica
```

---

# 6. Objetivo do Produto

O Inventario foi desenvolvido para fornecer uma solução simples e moderna de gerenciamento empresarial, permitindo:

```txt
Controle de estoque
Cadastro de produtos
Cadastro de fornecedores
Movimentações de entrada
Movimentações de saída
Monitoramento de estoque
Organização empresarial
```
