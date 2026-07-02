// ========================================
// 1. REFERÊNCIAS AO DOM
// ========================================

const formProduto           = document.getElementById("form-produto");              // <form> do modal de cadastro
const tabelaProdutos        = document.querySelector("#products-table tbody");       // <tbody> onde as linhas são inseridas dinamicamente
const elTotalProdutos       = document.getElementById("stat-total-produtos");        // <h3> do card "Total de Produtos"
const elProdutosAtivos      = document.getElementById("stat-produtos-ativos");       // <h3> do card "Produtos Ativos"
const elProdutosInativos    = document.getElementById("stat-produtos-inativos");     // <h3> do card "Produtos Inativos"
const elProdutosForaEstoque = document.getElementById("stat-produtos-fora-estoque"); // <h3> do card "Fora de Estoque"


// ========================================
// 2. RASCUNHO — Web Storage (localStorage)
// Persiste o progresso do formulário entre sessões sem enviar ao servidor
// ID 14
// ========================================

const RASCUNHO_PRODUTO_KEY = "rascunho-produto"; // chave usada para leitura e gravação no localStorage

function salvarRascunhoProduto() {
  const rascunho = {
    nome:       document.getElementById("input-nome").value,
    descricao:  document.getElementById("input-descricao").value,
    categoria:  document.getElementById("input-categoria").value,
    fornecedor: document.getElementById("input-fornecedor").value,
    precoCusto: document.getElementById("input-preco-custo").value,
    precoVenda: document.getElementById("input-preco-venda").value,
    quantidade: document.getElementById("input-qtd").value,
  };
  localStorage.setItem(RASCUNHO_PRODUTO_KEY, JSON.stringify(rascunho)); // JSON.stringify serializa o objeto para string antes de gravar — ID 14
}

function restaurarRascunhoProduto() {
  const rascunhoSalvo = localStorage.getItem(RASCUNHO_PRODUTO_KEY); // retorna null se a chave não existir — ID 14
  if (!rascunhoSalvo) return;

  const rascunho = JSON.parse(rascunhoSalvo); // JSON.parse converte a string de volta para objeto
  document.getElementById("input-nome").value        = rascunho.nome        || "";
  document.getElementById("input-descricao").value   = rascunho.descricao   || "";
  document.getElementById("input-categoria").value   = rascunho.categoria   || "";
  document.getElementById("input-fornecedor").value  = rascunho.fornecedor  || "";
  document.getElementById("input-preco-custo").value = rascunho.precoCusto  || "";
  document.getElementById("input-preco-venda").value = rascunho.precoVenda  || "";
  document.getElementById("input-qtd").value         = rascunho.quantidade  || "";
}

function limparRascunhoProduto() {
  localStorage.removeItem(RASCUNHO_PRODUTO_KEY); // remove a chave do localStorage — ID 14
}

formProduto.addEventListener("input", salvarRascunhoProduto); // salva rascunho a cada tecla digitada no formulário

document
  .getElementById("form-cancelar")
  .addEventListener("click", limparRascunhoProduto); // descarta rascunho se o usuário cancelar o cadastro


// ========================================
// 3. FUNÇÕES AUXILIARES
// ========================================

// Array.filter() conta os totais por status e atualiza os cards do topo — ID 23
function atualizarEstatisticasProdutos(produtos) {
  elTotalProdutos.textContent       = produtos.length;
  elProdutosAtivos.textContent      = produtos.filter((p) => p.status === "Ativo").length;
  elProdutosInativos.textContent    = produtos.filter((p) => p.status === "Inativo").length;
  elProdutosForaEstoque.textContent = produtos.filter((p) => p.quantidade === 0).length;
}


// ========================================
// 4. CARREGAMENTO INICIAL DA PÁGINA
// GET /api/produtos — requisição assíncrona com fetch nativo — ID 23
// ========================================

async function carregarProdutos() {
  try {
    const resposta = await fetch("http://localhost:3000/api/produtos"); // GET: sem segundo argumento, método padrão é GET
    const produtos = await resposta.json();                              // converte o corpo da resposta de JSON para array

    atualizarEstatisticasProdutos(produtos);
    tabelaProdutos.innerHTML = ""; // limpa o tbody antes de renderizar os dados reais

    if (produtos.length === 0) {
      tabelaProdutos.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-muted py-4">
            Nenhum produto cadastrado no momento.
          </td>
        </tr>`;
      return;
    }

    produtos.forEach((produto) => {
      const linha = document.createElement("tr");

      // estoque zerado tem prioridade sobre o status cadastrado
      const semEstoque    = produto.quantidade === 0;
      const statusTexto   = semEstoque ? "Sem estoque" : produto.status;
      const statusClasses = semEstoque
        ? "bg-danger-subtle text-danger"
        : produto.status === "Ativo"
          ? "bg-success-subtle text-success"
          : "bg-secondary-subtle text-secondary";

      linha.innerHTML = `
        <td>
          <div class="d-flex align-items-center gap-3">
            <div class="icone-produto-tabela rounded bg-purple-light d-flex align-items-center justify-content-center">
              <img src="../../../img/icones/caixa_white_purple.svg" alt="" aria-hidden="true">
            </div>
            <span class="fw-semibold">${produto.nome}</span>
          </div>
        </td>
        <td class="text-left text-muted descricao-produto">${produto.descricao}</td>
        <td>${produto.fornecedor || "Não informado"}</td>
        <td>${produto.categoria}</td>
        <td class="fw-medium">R$ ${Number(produto.preco_venda).toFixed(2).replace(".", ",")}</td>
        <td>
          <span class="${statusClasses} px-3 py-2 rounded fw-medium d-inline-block text-center" style="width: 85px;">
            ${statusTexto}
          </span>
        </td>
        <td class="text-center">
          <button type="button" aria-label="Excluir produto"
            class="btn btn-link text-muted p-0 btn-excluir-produto"
            data-id="${produto.id}">
            <img src="../../../img/icones/lixo_icone.svg" alt="" aria-hidden="true" width="24" height="24">
          </button>
        </td>`;

      tabelaProdutos.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao carregar tabela:", error);
  }
}


// ========================================
// 5. CADASTRO DE PRODUTO (SUBMIT)
// POST /api/produtos — body serializado como JSON — ID 22
// ========================================

formProduto.addEventListener("submit", async (event) => {
  event.preventDefault(); // cancela o comportamento padrão de recarregar a página no submit

  const novoProduto = {
    nome:              document.getElementById("input-nome").value,
    descricao:         document.getElementById("input-descricao").value,
    categoria:         document.getElementById("input-categoria").value,
    fornecedor:        document.getElementById("input-fornecedor").value,
    preco_custo:       parseFloat(document.getElementById("input-preco-custo").value), // parseFloat converte string para decimal
    preco_venda:       parseFloat(document.getElementById("input-preco-venda").value),
    quantidade:        parseInt(document.getElementById("input-qtd").value)         || 0, // parseInt converte para inteiro
    quantidade_minima: parseInt(document.getElementById("input-qtd-minima").value)  || 0,
    status: "Ativo",
  };

  try {
    const resposta = await fetch("http://localhost:3000/api/produtos", {
      method:  "POST",                                   // POST envia dados para criação de recurso no servidor
      headers: { "Content-Type": "application/json" },  // informa ao servidor que o body está no formato JSON
      body:    JSON.stringify(novoProduto),              // serializa o objeto para string JSON — ID 22
    });

    if (resposta.ok) {
      alert("Produto cadastrado com sucesso!");
      limparRascunhoProduto();
      formProduto.reset();
      window.location.reload();
    } else {
      alert("Erro ao cadastrar o produto no servidor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});


// ========================================
// 6. EXCLUSÃO DE PRODUTO
// DELETE /api/produtos/:id — delegação de eventos no tbody — ID 22
// ========================================

tabelaProdutos.addEventListener("click", async (event) => {
  const botaoExcluir = event.target.closest(".btn-excluir-produto"); // sobe na árvore DOM até encontrar o botão correto
  if (!botaoExcluir) return;

  const confirmou = confirm("Tem certeza que deseja excluir este produto?");
  if (!confirmou) return;

  try {
    const resposta = await fetch(
      `http://localhost:3000/api/produtos/${botaoExcluir.dataset.id}`, // dataset.id lê o atributo data-id do botão
      { method: "DELETE" },                                              // DELETE remove o recurso no servidor — ID 22
    );

    if (resposta.ok) {
      carregarProdutos(); // recarrega a tabela sem reload de página
    } else {
      alert("Erro ao excluir o produto.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", restaurarRascunhoProduto); // restaura rascunho salvo ao abrir a página — ID 14
document.addEventListener("DOMContentLoaded", carregarProdutos);          // dispara o GET ao carregar a página — ID 23
