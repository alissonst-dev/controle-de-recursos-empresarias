// Elementos dos cards de estatística
const elTotalProdutos = document.getElementById("dashboard-total-produtos");
const elEstoqueBaixo = document.getElementById("dashboard-estoque-baixo");
const elValorTotal = document.getElementById("dashboard-valor-total");
const elTotalFornecedores = document.getElementById(
  "dashboard-total-fornecedores",
);

// Corpo da tabela "Status do Estoque"
const tabelaEstoque = document.querySelector("#dashboard-stock-table tbody");

// Define o status de um produto a partir da quantidade e da quantidade mínima
function calcularStatusEstoque(produto) {
  const quantidadeMinima = produto.quantidade_minima || 5;

  if (produto.quantidade === 0) {
    return { texto: "Crítico", classe: "danger" };
  }

  if (produto.quantidade <= quantidadeMinima) {
    return { texto: "Atenção", classe: "warning" };
  }

  return { texto: "Estável", classe: "success" };
}

// Calcula a largura da barra de progresso (proporcional à quantidade mínima)
function calcularPercentualEstoque(produto) {
  const quantidadeMinima = produto.quantidade_minima || 5;
  const referencia = Math.max(quantidadeMinima * 4, 20);
  return Math.min(100, Math.round((produto.quantidade / referencia) * 100));
}

function renderizarLinhaProduto(produto) {
  const status = calcularStatusEstoque(produto);
  const percentual = calcularPercentualEstoque(produto);
  const linha = document.createElement("tr");

  linha.innerHTML = `
    <td>
      <div class="d-flex align-items-center gap-3">
        <div class="icone-produto-tabela rounded d-flex align-items-center justify-content-center">
          <img src="./img/icones/caixa_white_purple-elementor-io-optimized.webp" alt="" aria-hidden="true" />
        </div>
        <div>
          <span class="fw-semibold d-block">${produto.nome}</span>
        </div>
      </div>
    </td>
    <td>${produto.categoria}</td>
    <td>
      <div class="dashboard-estoque-info">
        <span>${produto.quantidade} unidades</span>
        <div class="dashboard-progress">
          <div class="dashboard-progress-bar dashboard-progress-${status.classe}" style="width: ${percentual}%"></div>
        </div>
      </div>
    </td>
    <td class="text-center">
      <span class="dashboard-status dashboard-status-${status.classe}">${status.texto}</span>
    </td>
  `;

  return linha;
}

async function carregarDashboard() {
  try {
    const [respostaProdutos, respostaFornecedores] = await Promise.all([
      fetch("http://localhost:3000/api/produtos"),
      fetch("http://localhost:3000/api/fornecedores"),
    ]);

    const produtos = await respostaProdutos.json();
    const fornecedores = await respostaFornecedores.json();

    // Cards de estatística
    const estoqueBaixo = produtos.filter(
      (produto) =>
        produto.quantidade > 0 &&
        produto.quantidade <= (produto.quantidade_minima || 5),
    ).length;

    const valorTotal = produtos.reduce(
      (total, produto) =>
        total + (Number(produto.preco_venda) || 0) * (Number(produto.quantidade) || 0),
      0,
    );

    elTotalProdutos.textContent = produtos.length;
    elEstoqueBaixo.textContent = estoqueBaixo;
    elValorTotal.textContent = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    elTotalFornecedores.textContent = fornecedores.length;

    // Tabela "Status do Estoque"
    tabelaEstoque.innerHTML = "";

    if (produtos.length === 0) {
      tabelaEstoque.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted py-4">
            Nenhum produto cadastrado no momento.
          </td>
        </tr>
      `;
      return;
    }

    produtos.forEach((produto) => {
      tabelaEstoque.appendChild(renderizarLinhaProduto(produto));
    });
  } catch (error) {
    console.error("Erro ao carregar o dashboard:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarDashboard);
