const formMovimentacao = document.getElementById("form-movimentacao");
const selectProduto = document.getElementById("input-produto-movimentacao");
const tabelaHistorico = document.querySelector(
  "#historico-movimentacoes-table tbody",
);

// preenche o select com os produtos cadastrados, pra movimentação ficar vinculada a um produto real
async function carregarProdutosNoSelect() {
  try {
    const resposta = await fetch("http://localhost:3000/api/produtos");
    const produtos = await resposta.json();

    produtos.forEach((produto) => {
      const opcao = document.createElement("option");
      opcao.value = produto.id;
      opcao.textContent = `${produto.nome} (${produto.quantidade} em estoque)`;
      selectProduto.appendChild(opcao);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

// busca as movimentações já registradas e monta a tabela de histórico
async function carregarHistorico() {
  try {
    const resposta = await fetch("http://localhost:3000/api/movimentacoes");
    const movimentacoes = await resposta.json();

    tabelaHistorico.innerHTML = "";

    if (movimentacoes.length === 0) {
      tabelaHistorico.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        Nenhuma movimentação registrada no momento.
                    </td>
                </tr>
            `;
      return;
    }

    // mais recentes primeiro
    movimentacoes
      .slice()
      .reverse()
      .forEach((movimentacao) => {
        const linha = document.createElement("tr");
        const ehEntrada = movimentacao.tipo === "entrada";
        const dataFormatada = new Date(movimentacao.data).toLocaleString(
          "pt-BR",
        );

        linha.innerHTML = `
                <td class="fw-semibold">${movimentacao.produtoNome}</td>
                <td class="text-center">
                  <span class="status-badge ${ehEntrada ? "status-badge-success" : "status-badge-danger"}">
                    ${ehEntrada ? "Entrada" : "Saída"}
                  </span>
                </td>
                <td class="text-center">${movimentacao.quantidade}</td>
                <td class="text-center">${dataFormatada}</td>
            `;

        tabelaHistorico.appendChild(linha);
      });
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
}

// envio do formulário de movimentação (entrada/saída)
formMovimentacao.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tipo = document.querySelector(
    'input[name="tipoMovimentacao"]:checked',
  ).value;
  const produtoId = selectProduto.value;
  const quantidade = document.getElementById(
    "input-quantidade-movimentacao",
  ).value;

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
    // o backend valida estoque e atualiza a quantidade do produto
    const resposta = await fetch("http://localhost:3000/api/movimentacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaMovimentacao),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Movimentação registrada com sucesso!");
      formMovimentacao.reset();

      // estoque mudou, recarrega select e histórico
      selectProduto.innerHTML =
        '<option value="" disabled selected>Selecione um produto</option>';
      await carregarProdutosNoSelect();
      await carregarHistorico();
    } else {
      // motivo enviado pelo servidor, ex.: estoque insuficiente
      alert(dados.mensagem || "Erro ao registrar a movimentação.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutosNoSelect();
  carregarHistorico();
});