# 📄 Product Requirements Document (PRD) - StockFlow

## 1. Visão Geral e Objetivo

O **StockFlow** é uma aplicação web responsiva desenvolvida para auxiliar no controle de estoque e no registro de vendas de pequenos negócios.

O sistema permite o cadastro de produtos, controle de quantidades em estoque e registro de vendas, garantindo uma melhor organização das informações.

**Regra de Negócio Principal:**  
Toda venda realizada deve atualizar automaticamente o estoque, reduzindo a quantidade disponível do produto vendido.

O objetivo da aplicação é substituir controles manuais e evitar erros comuns, como perda de dados, inconsistência de estoque e dificuldade no acompanhamento de vendas.

---

## 2. Atores do Sistema

- **Administrador:** Usuário responsável por cadastrar produtos, registrar vendas e visualizar informações do sistema.

- **Sistema:** Responsável por validar dados, atualizar o estoque automaticamente e garantir a consistência das informações.

---

## 3. Histórias de Usuário e Escopo

Abaixo estão as funcionalidades principais do sistema, organizadas em forma de épicos.

---

### 📦 Épico 1: Gestão de Produtos

- **US01 - Cadastro de Produto:**  
Como um Administrador, quero cadastrar produtos informando nome, preço e quantidade, para manter o controle do estoque.

  - _Critérios de Aceitação:_  
    - Todos os campos devem ser obrigatórios  
    - O preço deve ser maior que zero  
    - A quantidade não pode ser negativa  

- **US02 - Listagem de Produtos:**  
Como um Administrador, quero visualizar todos os produtos cadastrados, para acompanhar o estoque disponível.

- **US03 - Edição de Produto:**  
Como um Administrador, quero editar os dados de um produto, para corrigir informações incorretas.

- **US04 - Exclusão de Produto:**  
Como um Administrador, quero excluir produtos do sistema, para remover itens que não são mais utilizados.

---

### 💰 Épico 2: Registro de Vendas

- **US05 - Registrar Venda:**  
Como um Administrador, quero registrar uma venda informando os produtos e quantidades, para controlar a saída de itens.

  - _Critérios de Aceitação:_  
    - O sistema deve verificar se há estoque suficiente  
    - O sistema deve atualizar automaticamente a quantidade do produto  
    - O valor total da venda deve ser calculado automaticamente  

---

### 📊 Épico 3: Visualização e Controle

- **US06 - Histórico de Vendas:**  
Como um Administrador, quero visualizar o histórico de vendas, para acompanhar as movimentações realizadas.

- **US07 - Persistência de Dados:**  
Como um Administrador, quero que os dados permaneçam salvos mesmo após recarregar a página, para não perder informações.

---

### 🌐 Épico 4: Integrações e Usabilidade

- **US08 - Consulta de CEP:**  
Como um Administrador, quero preencher o CEP e obter automaticamente o endereço, para facilitar o cadastro de fornecedores.

- **US09 - Responsividade:**  
Como um Administrador, quero acessar o sistema em dispositivos móveis e desktop, para utilizar o sistema em qualquer lugar.

- **US10 - Validação de Formulários:**  
Como um Administrador, quero que o sistema valide os dados inseridos, para evitar erros de cadastro.