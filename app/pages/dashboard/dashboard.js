// ========================================
// 1. REFERÊNCIAS AO DOM
// ========================================

const elTotalProdutos     = document.getElementById("dashboard-total-produtos");     // <h3> do card "Total de Produtos"
const elEstoqueBaixo      = document.getElementById("dashboard-estoque-baixo");       // <h3> do card "Estoque Baixo"
const elValorTotal        = document.getElementById("dashboard-valor-total");          // <h3> do card "Valor em Estoque"
const elTotalFornecedores = document.getElementById("dashboard-total-fornecedores");  // <h3> do card "Total de Fornecedores"
const tabelaEstoque       = document.querySelector("#dashboard-stock-table tbody");    // <tbody> da tabela de status do estoque


// ========================================
// 2. FUNÇÕES AUXILIARES
// ========================================

// Retorna o texto e a classe CSS de status com base na quantidade atual versus a quantidade mínima cadastrada
function calcularStatusEstoque(produto) {
  const quantidadeMinima = produto.quantidade_minima || 5; // fallback de 5 unidades se o campo não foi preenchido

  if (produto.quantidade === 0) {
    return { texto: "Crítico", classe: "danger" };
  }

  if (produto.quantidade <= quantidadeMinima) {
    return { texto: "Atenção", classe: "warning" };
  }

  return { texto: "Estável", classe: "success" };
}

// Retorna o percentual de preenchimento da barra de progresso, com teto de 100%
function calcularPercentualEstoque(produto) {
  const quantidadeMinima = produto.quantidade_minima || 5;
  const referencia = Math.max(quantidadeMinima * 4, 20); // referência proporcional ao mínimo, com piso de 20
  return Math.min(100, Math.round((produto.quantidade / referencia) * 100)); // Math.min garante que não ultrapasse 100%
}

// Cria e retorna um <tr> completo com os dados do produto para inserção na tabela
function renderizarLinhaProduto(produto) {
  const status     = calcularStatusEstoque(produto);
  const percentual = calcularPercentualEstoque(produto);
  const linha      = document.createElement("tr");

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
    </td>`;

  return linha;
}

// Linha de exemplo exibida quando o backend não responde, mantém o layout visível
function renderizarExemploProduto() {
  return renderizarLinhaProduto({
    nome:              "Fone de Ouvido Bluetooth (exemplo)",
    categoria:         "Eletrônicos",
    quantidade:        48,
    quantidade_minima: 10,
  });
}


// ========================================
// 3. CARREGAMENTO DO DASHBOARD
// Promise.all executa os dois GETs em paralelo, mais eficiente que sequencial — ID 23
// ========================================

async function carregarDashboard() {
  try {
    const [respostaProdutos, respostaFornecedores] = await Promise.all([
      fetch("http://localhost:3000/api/produtos"),     // GET /api/produtos — ID 23
      fetch("http://localhost:3000/api/fornecedores"), // GET /api/fornecedores — ID 23
    ]);

    const produtos     = await respostaProdutos.json();
    const fornecedores = await respostaFornecedores.json();

    // Array.filter() conta produtos com quantidade acima de zero mas abaixo do mínimo
    const estoqueBaixo = produtos.filter(
      (produto) => produto.quantidade > 0 && produto.quantidade <= (produto.quantidade_minima || 5)
    ).length;

    // Array.reduce() acumula o valor total em estoque: preco_venda * quantidade de cada produto
    const valorTotal = produtos.reduce(
      (total, produto) =>
        total + (Number(produto.preco_venda) || 0) * (Number(produto.quantidade) || 0),
      0
    );

    elTotalProdutos.textContent     = produtos.length;
    elEstoqueBaixo.textContent      = estoqueBaixo;
    elValorTotal.textContent        = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    elTotalFornecedores.textContent = fornecedores.length;

    tabelaEstoque.innerHTML = "";

    if (produtos.length === 0) {
      tabelaEstoque.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted py-4">
            Nenhum produto cadastrado no momento.
          </td>
        </tr>`;
      return;
    }

    produtos.forEach((produto) => {
      tabelaEstoque.appendChild(renderizarLinhaProduto(produto));
    });

  } catch (error) {
    console.error("Erro ao carregar o dashboard:", error);
    tabelaEstoque.innerHTML = "";
    tabelaEstoque.appendChild(renderizarExemploProduto()); // fallback visual quando o backend está fora do ar
  }
}


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", carregarDashboard); // ID 23