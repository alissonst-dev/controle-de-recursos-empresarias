# 🛠️ Especificação Técnica (Tech Spec) - StockFlow

Este documento descreve a arquitetura técnica, o modelo de dados e os contratos de API (via JSON Server) da aplicação StockFlow, um sistema de controle de estoque e vendas.

---

## 1. Modelo de Dados (Diagrama ER)

Abaixo está o Diagrama Entidade-Relacionamento (DER) que representa a estrutura do banco de dados (`db.json`):

```mermaid
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