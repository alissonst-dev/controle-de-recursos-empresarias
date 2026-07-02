// ========================================
// 1. DEPENDÊNCIAS E CONFIGURAÇÃO
// Módulos carregados via require (sistema de módulos do Node.js) — ID 15
// ========================================

const express = require("express"); // framework web para criar rotas e middlewares
const cors = require("cors"); // libera requisições de origens diferentes (ex: frontend na porta 5500 → backend na 3000)
const fs = require("fs"); // módulo nativo do Node.js para leitura e escrita de arquivos
const path = require("path"); // módulo nativo do Node.js para montar caminhos de arquivo com segurança

const app = express(); // instância do servidor Express
const PORT = 3000; // porta onde a API fica disponível: http://localhost:3000

app.use(cors()); // middleware: permite que o frontend acesse a API sem bloqueio de CORS
app.use(express.json()); // middleware: lê o body das requisições POST e converte de JSON para objeto JS automaticamente

// ========================================
// 2. FUNÇÕES AUXILIARES — Banco de dados JSON
// O arquivo JSON funciona como banco de dados simples em disco — ID 15
// ========================================

// Lê o arquivo JSON e retorna os dados como array; devolve [] se o arquivo não existir ou estiver corrompido
const lerBanco = (arquivo) => {
  try {
    const dados = fs.readFileSync(path.join(__dirname, arquivo), "utf-8"); // __dirname = pasta onde este arquivo está
    return JSON.parse(dados); // converte a string JSON em array de objetos
  } catch (error) {
    return [];
  }
};

// Sobrescreve o arquivo JSON com os dados atualizados; null, 2 formata o JSON com indentação legível
const salvarBanco = (arquivo, dados) => {
  fs.writeFileSync(
    path.join(__dirname, arquivo),
    JSON.stringify(dados, null, 2),
    "utf-8",
  );
};

// ========================================
// 3. ROTAS DE PRODUTOS
// GET responde às leituras do frontend (ID 23)
// POST e DELETE respondem aos envios do frontend (ID 22)
// ========================================

// GET /api/produtos — retorna todos os produtos cadastrados
app.get("/api/produtos", (req, res) => {
  const produtos = lerBanco("produtos.json");
  res.json(produtos); // res.json() serializa o array e envia com Content-Type: application/json
});

// POST /api/produtos — cadastra um novo produto recebido no body da requisição
app.post("/api/produtos", (req, res) => {
  const produtos = lerBanco("produtos.json");
  const novoProduto = req.body; // req.body contém o objeto enviado pelo frontend via fetch POST
  novoProduto.id = Date.now(); // gera um id único baseado no timestamp atual em milissegundos

  produtos.push(novoProduto);
  salvarBanco("produtos.json", produtos);

  res.status(201).json({
    // 201 Created: recurso criado com sucesso
    mensagem: "Produto cadastrado com sucesso!",
    produto: novoProduto,
  });
});

// DELETE /api/produtos/:id — remove o produto com o id passado na URL
app.delete("/api/produtos/:id", (req, res) => {
  const produtos = lerBanco("produtos.json");
  const id = Number(req.params.id); // req.params.id lê o :id da URL (sempre string, por isso converte para número)

  const produtosRestantes = produtos.filter((produto) => produto.id !== id);

  if (produtosRestantes.length === produtos.length) {
    return res.status(404).json({ mensagem: "Produto não encontrado." }); // 404: recurso não encontrado
  }

  salvarBanco("produtos.json", produtosRestantes);
  res.json({ mensagem: "Produto excluído com sucesso!" });
});

// ========================================
// 4. ROTAS DE FORNECEDORES
// GET responde às leituras do frontend (ID 23)
// POST e DELETE respondem aos envios do frontend (ID 22)
// ========================================

// GET /api/fornecedores — retorna todos os fornecedores cadastrados (retorna dados a função fetch do frontend em app/pages/fornecedores/fornecedores.js)
app.get("/api/fornecedores", (req, res) => {
  const fornecedores = lerBanco("fornecedores.json");
  res.json(fornecedores);
});

// POST /api/fornecedores — cadastra um novo fornecedor recebido no body da requisição
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

// DELETE /api/fornecedores/:id — remove o fornecedor com o id passado na URL
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

// ========================================
// 5. ROTAS DE MOVIMENTAÇÕES
// GET responde às leituras do frontend (ID 23)
// POST contém a regra de negócio principal: valida estoque antes de registrar (ID 22)
// ========================================

// GET /api/movimentacoes — retorna todo o histórico de movimentações
app.get("/api/movimentacoes", (req, res) => {
  const movimentacoes = lerBanco("movimentacoes.json");
  res.json(movimentacoes);
});

// POST /api/movimentacoes — valida o estoque, atualiza a quantidade do produto e registra a movimentação
app.post("/api/movimentacoes", (req, res) => {
  const { produtoId, quantidade, tipo } = req.body; // desestruturação: extrai os três campos do body de uma vez

  if (!produtoId || !quantidade || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Produto, quantidade e tipo são obrigatórios." }); // 400 Bad Request: dados incompletos
  }

  const produtos = lerBanco("produtos.json");
  const produto = produtos.find((p) => p.id === Number(produtoId)); // Array.find() retorna o primeiro item que satisfaz a condição

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }

  // Regra de negócio: não permite saída maior que o estoque disponível
  if (tipo === "saida" && produto.quantidade < quantidade) {
    return res.status(400).json({
      mensagem: `Estoque insuficiente. Disponível: ${produto.quantidade} unidade(s).`,
    });
  }

  // Atualiza a quantidade: soma na entrada, subtrai na saída
  produto.quantidade =
    tipo === "entrada"
      ? produto.quantidade + Number(quantidade)
      : produto.quantidade - Number(quantidade);

  salvarBanco("produtos.json", produtos); // persiste o estoque atualizado

  const movimentacoes = lerBanco("movimentacoes.json");
  const novaMovimentacao = {
    id: Date.now(),
    produtoId: produto.id,
    produtoNome: produto.nome,
    quantidade: Number(quantidade),
    tipo,
    data: new Date().toISOString(), // timestamp no formato ISO 8601: "2026-07-01T14:30:00.000Z"
  };

  movimentacoes.push(novaMovimentacao);
  salvarBanco("movimentacoes.json", movimentacoes);

  res.status(201).json({
    mensagem: "Movimentação registrada com sucesso!",
    movimentacao: novaMovimentacao,
    estoqueAtualizado: produto.quantidade,
  });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR — ID 15
// ========================================

app.listen(PORT, () => {
  console.log(`Servidor e Banco JSON rodando em http://localhost:${PORT}`);
});
