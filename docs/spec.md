# 🛠️ Especificação Técnica (Tech Spec) - Sistema de Recursos Empresariais

Este documento descreve a arquitetura técnica, o modelo de dados e os contratos de API (via JSON Server) da aplicação, que tem como objetivo gerenciar recursos empresariais como produtos, vendas e fornecedores.

---

## 1. Modelo de Dados (Diagrama ER)

Abaixo está o Diagrama Entidade-Relacionamento (DER) que representa a estrutura do banco de dados (`db.json`) e como as entidades se relacionam.

````mermaid
erDiagram
PRODUTO ||--o{ VENDA_ITEM : "compõe"
VENDA ||--o{ VENDA_ITEM : "contém"

PRODUTO {
string id PK "Gerado automaticamente"
string nome
float preco
int quantidade
}

VENDA {
string id PK
string data "Formato ISO (YYYY-MM-DD)"
float total
}

VENDA_ITEM {
string id PK
string vendaId FK "Referência da venda"
string produtoId FK "Referência do produto"
int quantidade
float subtotal
}

FORNECEDOR {
string id PK
string nome
string cep
string endereco
}
```mermaid

2. Dicionário de Dados

Breve explicação das tabelas principais:

Produtos: Responsável por armazenar os itens disponíveis no estoque.
id: Identificador único gerado automaticamente pelo JSON Server.
nome: Nome do produto.
preco: Valor unitário do produto.
quantidade: Quantidade disponível em estoque.
Vendas: Representa uma venda realizada no sistema.
id: Identificador único da venda.
data: Data da venda no formato ISO (YYYY-MM-DD).
total: Valor total da venda.
Itens da Venda: Registra os produtos vendidos em cada venda.
id: Identificador único do item.
vendaId: Chave estrangeira que vincula o item à venda.
produtoId: Chave estrangeira que vincula ao produto.
quantidade: Quantidade vendida.
subtotal: Valor total do item (preço × quantidade).
Fornecedores: Armazena dados dos fornecedores.
id: Identificador único.
nome: Nome do fornecedor.
cep: CEP utilizado para consulta.
endereco: Endereço obtido via API (ViaCEP).
3. Regras de Negócio Técnicas
Ao registrar uma venda:
O sistema deve verificar se há estoque suficiente.
O sistema deve atualizar automaticamente a quantidade do produto.
O valor total da venda deve ser calculado automaticamente.
O sistema deve impedir:
Cadastro de produtos com preço inválido.
Venda de produtos com estoque insuficiente.
Integração externa:
O sistema deve utilizar a API ViaCEP para preencher automaticamente o endereço do fornecedor a partir do CEP.
Persistência:
Dados armazenados no localStorage.
Dados armazenados na API Fake (JSON Server).
4. Rotas da API (JSON Server)

A aplicação consome uma API local simulada pelo JSON Server. Abaixo os principais endpoints:

Produtos
GET /produtos - Retorna a lista de produtos.
POST /produtos - Cadastra um novo produto.
PUT /produtos/:id - Atualiza um produto existente.
DELETE /produtos/:id - Remove um produto.
Vendas
GET /vendas - Retorna a lista de vendas.
POST /vendas - Registra uma nova venda.
Itens da Venda
GET /venda_itens - Retorna os itens das vendas.
POST /venda_itens - Cadastra um item de venda.
Fornecedores
GET /fornecedores - Retorna a lista de fornecedores.
POST /fornecedores - Cadastra um fornecedor.
5. Estrutura do Banco de Dados (db.json)

Esta é a representação em formato JSON do banco de dados simulado:

{
  "produtos": [
    {
      "id": "1",
      "nome": "Notebook",
      "preco": 3500.00,
      "quantidade": 10
    }
  ],
  "vendas": [
    {
      "id": "1",
      "data": "2026-03-30",
      "total": 3500.00
    }
  ],
  "venda_itens": [
    {
      "id": "1",
      "vendaId": "1",
      "produtoId": "1",
      "quantidade": 1,
      "subtotal": 3500.00
    }
  ],
  "fornecedores": [
    {
      "id": "1",
      "nome": "Fornecedor Exemplo",
      "cep": "85000000",
      "endereco": "Rua Exemplo, PR"
    }
  ]
}
````
