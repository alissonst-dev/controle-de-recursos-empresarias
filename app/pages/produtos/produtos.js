// referência ao formulário do modal de cadastro de produto
const formProduto = document.getElementById("form-produto");

const RASCUNHO_PRODUTO_KEY = "rascunho-produto";

// guarda o progresso do formulário no localStorage caso o usuário saia sem salvar
function salvarRascunhoProduto() {
  const rascunho = {
    nome: document.getElementById("input-nome").value,
    descricao: document.getElementById("input-descricao").value,
    categoria: document.getElementById("input-categoria").value,
    fornecedor: document.getElementById("input-fornecedor").value,
    precoCusto: document.getElementById("input-preco-custo").value,
    precoVenda: document.getElementById("input-preco-venda").value,
    quantidade: document.getElementById("input-qtd").value,
  };
  localStorage.setItem(RASCUNHO_PRODUTO_KEY, JSON.stringify(rascunho));
}

// recupera o rascunho salvo e preenche o formulário com ele
function restaurarRascunhoProduto() {
  const rascunhoSalvo = localStorage.getItem(RASCUNHO_PRODUTO_KEY);
  if (!rascunhoSalvo) return;

  const rascunho = JSON.parse(rascunhoSalvo);
  document.getElementById("input-nome").value = rascunho.nome || "";
  document.getElementById("input-descricao").value = rascunho.descricao || "";
  document.getElementById("input-categoria").value = rascunho.categoria || "";
  document.getElementById("input-fornecedor").value = rascunho.fornecedor || "";
  document.getElementById("input-preco-custo").value = rascunho.precoCusto || "";
  document.getElementById("input-preco-venda").value = rascunho.precoVenda || "";
  document.getElementById("input-qtd").value = rascunho.quantidade || "";
}

function limparRascunhoProduto() {
  localStorage.removeItem(RASCUNHO_PRODUTO_KEY);
}

// salva o rascunho a cada alteração no formulário
formProduto.addEventListener("input", salvarRascunhoProduto);

// descarta o rascunho se o usuário cancelar o cadastro
document
  .getElementById("form-cancelar")
  .addEventListener("click", limparRascunhoProduto);

// restaura o rascunho (se existir) quando a página abre
document.addEventListener("DOMContentLoaded", restaurarRascunhoProduto);

// envio do formulário de cadastro de produto
formProduto.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("input-nome").value;
  const descricao = document.getElementById("input-descricao").value;
  const categoria = document.getElementById("input-categoria").value;
  const fornecedor = document.getElementById("input-fornecedor").value;
  const precoCusto = document.getElementById("input-preco-custo").value;
  const precoVenda = document.getElementById("input-preco-venda").value;
  const quantidade = document.getElementById("input-qtd").value || 0;
  const quantidadeMinima = document.getElementById("input-qtd-minima").value || 0;

  // monta o objeto no formato que o backend espera
  const novoProduto = {
    nome: nome,
    descricao: descricao,
    categoria: categoria,
    fornecedor: fornecedor,
    preco_custo: parseFloat(precoCusto),
    preco_venda: parseFloat(precoVenda),
    quantidade: parseInt(quantidade),
    quantidade_minima: parseInt(quantidadeMinima),
    status: "Ativo", // produto novo sempre entra ativo
  };

  try {
    const resposta = await fetch("http://localhost:3000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });

    if (resposta.ok) {
      alert("Produto cadastrado com sucesso!");
      limparRascunhoProduto();
      formProduto.reset();
      // recarrega pra atualizar a tabela e os cards com o novo produto
      window.location.reload();
    } else {
      alert("Erro ao cadastrar o produto no servidor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

// corpo da tabela onde os produtos cadastrados aparecem
const tabelaProdutos = document.querySelector("#products-table tbody");

// cards de estatística do topo da página
const elTotalProdutos = document.getElementById("stat-total-produtos");
const elProdutosAtivos = document.getElementById("stat-produtos-ativos");
const elProdutosInativos = document.getElementById("stat-produtos-inativos");
const elProdutosForaEstoque = document.getElementById(
  "stat-produtos-fora-estoque",
);

// totais dos cards, calculados a partir da lista de produtos vinda da API
function atualizarEstatisticasProdutos(produtos) {
  elTotalProdutos.textContent = produtos.length;
  elProdutosAtivos.textContent = produtos.filter(
    (produto) => produto.status === "Ativo",
  ).length;
  elProdutosInativos.textContent = produtos.filter(
    (produto) => produto.status === "Inativo",
  ).length;
  elProdutosForaEstoque.textContent = produtos.filter(
    (produto) => produto.quantidade === 0,
  ).length;
}

// busca os produtos no backend e renderiza tabela + cards
async function carregarProdutos() {
  try {
    const resposta = await fetch("http://localhost:3000/api/produtos");
    const produtos = await resposta.json();

    atualizarEstatisticasProdutos(produtos);

    // limpa pra não duplicar com os itens fixos do HTML
    tabelaProdutos.innerHTML = "";

    if (produtos.length === 0) {
      tabelaProdutos.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        Nenhum produto cadastrado no momento.
                    </td>
                </tr>
            `;
      return;
    }

    // monta uma linha de tabela pra cada produto
    produtos.forEach((produto) => {
      const linha = document.createElement("tr");

      // estoque zerado tem prioridade sobre o status cadastrado
      const semEstoque = produto.quantidade === 0;
      const statusTexto = semEstoque ? "Sem estoque" : produto.status;
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
                  <button type="button" aria-label="Excluir produto" class="btn btn-link text-muted p-0 btn-excluir-produto" data-id="${produto.id}">
                    <img src="../../../img/icones/lixo_icone.svg" alt="" aria-hidden="true" width="24" height="24">
                  </button>
                </td>
            `;

      tabelaProdutos.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao carregar tabela:", error);
  }
}

// delegado no tbody, já que as linhas são criadas dinamicamente
tabelaProdutos.addEventListener("click", async (event) => {
  const botaoExcluir = event.target.closest(".btn-excluir-produto");
  if (!botaoExcluir) return;

  const confirmou = confirm("Tem certeza que deseja excluir este produto?");
  if (!confirmou) return;

  try {
    const resposta = await fetch(
      `http://localhost:3000/api/produtos/${botaoExcluir.dataset.id}`,
      { method: "DELETE" },
    );

    if (resposta.ok) {
      carregarProdutos();
    } else {
      alert("Erro ao excluir o produto.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

// carrega tabela e cards quando a página abre
document.addEventListener("DOMContentLoaded", carregarProdutos);