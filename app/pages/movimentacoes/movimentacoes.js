// ========================================
// 1. REFERÊNCIAS AO DOM
// ========================================

const formMovimentacao = document.getElementById("form-movimentacao");                   // <form> de registro de movimentação
const selectProduto    = document.getElementById("input-produto-movimentacao");           // <select> de produto (populado via GET)
const tabelaHistorico  = document.querySelector("#historico-movimentacoes-table tbody");  // <tbody> do histórico de movimentações


// ========================================
// 2. CARREGAMENTO DOS DADOS
// Requisições GET ao backend — ID 23
// ========================================

// GET /api/produtos — popula o <select> com os produtos disponíveis no estoque — ID 23
async function carregarProdutosNoSelect() {
  try {
    const resposta = await fetch("http://localhost:3000/api/produtos");
    const produtos  = await resposta.json();

    produtos.forEach((produto) => {
      const opcao       = document.createElement("option"); // cria cada <option> dinamicamente — ID 13
      opcao.value       = produto.id;                       // value guarda o id para envio ao backend no submit
      opcao.textContent = `${produto.nome} (${produto.quantidade} em estoque)`;
      selectProduto.appendChild(opcao);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

// GET /api/movimentacoes — renderiza o histórico do mais recente para o mais antigo — ID 23
async function carregarHistorico() {
  try {
    const resposta      = await fetch("http://localhost:3000/api/movimentacoes");
    const movimentacoes = await resposta.json();

    tabelaHistorico.innerHTML = "";

    if (movimentacoes.length === 0) {
      tabelaHistorico.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted py-4">
            Nenhuma movimentação registrada no momento.
          </td>
        </tr>`;
      return;
    }

    movimentacoes
      .slice()   // cria cópia do array para não mutar o original
      .reverse() // inverte a ordem: mais recentes primeiro
      .forEach((movimentacao) => {
        const linha         = document.createElement("tr");
        const ehEntrada     = movimentacao.tipo === "entrada";
        const dataFormatada = new Date(movimentacao.data).toLocaleString("pt-BR"); // formata timestamp para padrão brasileiro

        linha.innerHTML = `
          <td class="fw-semibold">${movimentacao.produtoNome}</td>
          <td class="text-center">
            <span class="status-badge ${ehEntrada ? "status-badge-success" : "status-badge-danger"}">
              ${ehEntrada ? "Entrada" : "Saída"}
            </span>
          </td>
          <td class="text-center">${movimentacao.quantidade}</td>
          <td class="text-center">${dataFormatada}</td>`;

        tabelaHistorico.appendChild(linha);
      });
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
}


// ========================================
// 3. REGISTRO DE MOVIMENTAÇÃO (SUBMIT)
// POST /api/movimentacoes — o backend valida estoque e atualiza a quantidade do produto — ID 22
// ========================================

formMovimentacao.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tipo      = document.querySelector('input[name="tipoMovimentacao"]:checked').value; // radio button selecionado — ID 13
  const produtoId = selectProduto.value;
  const quantidade = document.getElementById("input-quantidade-movimentacao").value;

  if (!produtoId) {
    alert("Selecione um produto.");
    return;
  }

  const novaMovimentacao = {
    produtoId,
    quantidade: parseInt(quantidade),
    tipo,
  };

  try {
    const resposta = await fetch("http://localhost:3000/api/movimentacoes", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(novaMovimentacao), // serializa para JSON antes do envio — ID 22
    });

    const dados = await resposta.json(); // lê o corpo da resposta mesmo em caso de erro, para exibir a mensagem do servidor

    if (resposta.ok) {
      alert("Movimentação registrada com sucesso!");
      formMovimentacao.reset();

      // estoque foi alterado: recarrega select e histórico com os valores atualizados
      selectProduto.innerHTML = '<option value="" disabled selected>Selecione um produto</option>';
      await carregarProdutosNoSelect();
      await carregarHistorico();
    } else {
      alert(dados.mensagem || "Erro ao registrar a movimentação."); // mensagem do servidor, ex.: estoque insuficiente
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutosNoSelect(); // popula o select antes do usuário interagir — ID 23
  carregarHistorico();        // carrega o histórico de movimentações — ID 23
});