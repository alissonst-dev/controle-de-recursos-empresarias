// 1. Mapeia o formulário de movimentação
const formMovimentacao = document.getElementById("form-movimentacao");

// 2. Escuta o momento do envio (Submit)
formMovimentacao.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 3. Pega os valores do formulário
  const tipo = document.querySelector(
    'input[name="tipoMovimentacao"]:checked',
  ).value;
  const produto = document.getElementById(
    "input-produto-movimentacao",
  ).value;
  const quantidade = document.getElementById(
    "input-quantidade-movimentacao",
  ).value;

  // 4. Junta tudo em um objeto completo
  const novaMovimentacao = {
    tipo,
    produto,
    quantidade: parseInt(quantidade),
    data: new Date().toISOString(),
  };

  try {
    // 5. Envia o JSON completo para o servidor Back-end
    const resposta = await fetch("http://localhost:3000/api/movimentacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaMovimentacao),
    });

    if (resposta.ok) {
      alert("Movimentação registrada com sucesso!");
      formMovimentacao.reset();
    } else {
      alert("Erro ao registrar a movimentação no servidor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});
