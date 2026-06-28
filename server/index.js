const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Função auxiliar para ler os dados de um arquivo JSON com segurança
const lerBanco = (arquivo) => {
  try {
    const dados = fs.readFileSync(path.join(__dirname, arquivo), "utf-8");
    return JSON.parse(dados);
  } catch (error) {
    // Se o arquivo não existir ou estiver corrompido, retorna um array vazio
    return [];
  }
};

// Função auxiliar para salvar os dados em um arquivo JSON
const salvarBanco = (arquivo, dados) => {
  fs.writeFileSync(
    path.join(__dirname, arquivo),
    JSON.stringify(dados, null, 2),
    "utf-8",
  );
};

/*
   ROTAS DA API - PRODUTOS
    */

// 1. ROTA DE LISTAGEM (GET) - Envia todos os produtos para a tabela
app.get("/api/produtos", (req, res) => {
  const produtos = lerBanco("produtos.json");
  res.json(produtos);
});

// 2. ROTA DE CADASTRO (POST) - Recebe o formulário do modal e salva no JSON
app.post("/api/produtos", (req, res) => {
  const produtos = lerBanco("produtos.json");

  // Pega os dados enviados pelo Front-end
  const novoProduto = req.body;

  // Cria um ID único baseado no carimbo de data/hora atual e injeta no produto
  novoProduto.id = Date.now();

  // Adiciona o novo produto na lista existente
  produtos.push(novoProduto);

  // Grava a lista atualizada de volta no arquivo produtos.json
  salvarBanco("produtos.json", produtos);

  // Responde para o front-end que deu tudo certo e envia o produto cadastrado
  res.status(201).json({
    mensagem: "Produto cadastrado com sucesso!",
    produto: novoProduto,
  });
});

// 3. ROTA DE EXCLUSÃO (DELETE) - Remove o produto pelo id
app.delete("/api/produtos/:id", (req, res) => {
  const produtos = lerBanco("produtos.json");
  const id = Number(req.params.id);
  const produtosRestantes = produtos.filter((produto) => produto.id !== id);

  if (produtosRestantes.length === produtos.length) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }

  salvarBanco("produtos.json", produtosRestantes);
  res.json({ mensagem: "Produto excluído com sucesso!" });
});

/*
   ROTAS DA API - FORNECEDORES
    */

app.get("/api/fornecedores", (req, res) => {
  const fornecedores = lerBanco("fornecedores.json");
  res.json(fornecedores);
});

app.post("/api/fornecedores", (req, res) => {
  const fornecedores = lerBanco("fornecedores.json");

  const novoFornecedor = req.body;
  novoFornecedor.id = Date.now();

  fornecedores.push(novoFornecedor);
  salvarBanco("fornecedores.json", fornecedores);

  res.status(201).json({
    mensagem: "Fornecedor cadastrado com sucesso!",
    fornecedor: novoFornecedor,
  });
});

app.delete("/api/fornecedores/:id", (req, res) => {
  const fornecedores = lerBanco("fornecedores.json");
  const id = Number(req.params.id);
  const fornecedoresRestantes = fornecedores.filter(
    (fornecedor) => fornecedor.id !== id,
  );

  if (fornecedoresRestantes.length === fornecedores.length) {
    return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
  }

  salvarBanco("fornecedores.json", fornecedoresRestantes);
  res.json({ mensagem: "Fornecedor excluído com sucesso!" });
});

/*
   ROTAS DA API - MOVIMENTAÇÕES
    */

app.get("/api/movimentacoes", (req, res) => {
  const movimentacoes = lerBanco("movimentacoes.json");
  res.json(movimentacoes);
});

app.post("/api/movimentacoes", (req, res) => {
  const { produtoId, quantidade, tipo } = req.body;

  if (!produtoId || !quantidade || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Produto, quantidade e tipo são obrigatórios." });
  }

  const produtos = lerBanco("produtos.json");
  const produto = produtos.find((p) => p.id === Number(produtoId));

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }

  // Regra de negócio principal: não deixa sair mais do que existe em estoque
  if (tipo === "saida" && produto.quantidade < quantidade) {
    return res.status(400).json({
      mensagem: `Estoque insuficiente. Disponível: ${produto.quantidade} unidade(s).`,
    });
  }

  // Atualiza o estoque do produto de acordo com o tipo de movimentação
  produto.quantidade =
    tipo === "entrada"
      ? produto.quantidade + Number(quantidade)
      : produto.quantidade - Number(quantidade);

  salvarBanco("produtos.json", produtos);

  const movimentacoes = lerBanco("movimentacoes.json");
  const novaMovimentacao = {
    id: Date.now(),
    produtoId: produto.id,
    produtoNome: produto.nome,
    quantidade: Number(quantidade),
    tipo,
    data: new Date().toISOString(),
  };

  movimentacoes.push(novaMovimentacao);
  salvarBanco("movimentacoes.json", movimentacoes);

  res.status(201).json({
    mensagem: "Movimentação registrada com sucesso!",
    movimentacao: novaMovimentacao,
    estoqueAtualizado: produto.quantidade,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor e Banco JSON rodando em http://localhost:${PORT}`);
});
