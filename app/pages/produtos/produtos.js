// 1. Mapeia o formulário do seu Modal de produtos
const formProduto = document.getElementById("form-produto");

const RASCUNHO_PRODUTO_KEY = "rascunho-produto";

// Salva o que foi digitado no formulário no localStorage,
// assim o usuário não perde os dados se sair da página sem salvar
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

// Lê o rascunho salvo no localStorage e preenche o formulário com ele
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

// Sempre que o usuário digitar algo no formulário, salva o rascunho
formProduto.addEventListener("input", salvarRascunhoProduto);

// Ao cancelar, descarta o rascunho salvo
document
  .getElementById("form-cancelar")
  .addEventListener("click", limparRascunhoProduto);

// Ao carregar a página, restaura o rascunho (se existir)
document.addEventListener("DOMContentLoaded", restaurarRascunhoProduto);

// 2. Escuta o momento do envio (Submit)
formProduto.addEventListener("submit", async (event) => {
  // Evita o recarregamento padrão da página
  event.preventDefault();

  // 3. Pega os valores de todos os inputs do formulário do HTML
  const nome = document.getElementById("input-nome").value;
  const descricao = document.getElementById("input-descricao").value;
  const categoria = document.getElementById("input-categoria").value;
  const fornecedor = document.getElementById("input-fornecedor").value;
  const precoCusto = document.getElementById("input-preco-custo").value;
  const precoVenda = document.getElementById("input-preco-venda").value;
  const quantidade = document.getElementById("input-qtd").value || 0; // Se vazio, vira 0
  const quantidadeMinima = document.getElementById("input-qtd-minima").value || 0;

  // 4. Junta tudo em um objeto completo seguindo o padrão do seu layout
  const novoProduto = {
    nome: nome,
    descricao: descricao,
    categoria: categoria,
    fornecedor: fornecedor,
    preco_custo: parseFloat(precoCusto),
    preco_venda: parseFloat(precoVenda),
    quantidade: parseInt(quantidade),
    quantidade_minima: parseInt(quantidadeMinima),
    status: "Ativo", // Todo produto novo entra como Ativo por padrão
  };

  try {
    // 5. Envia o JSON completo para o servidor Back-end
    const resposta = await fetch("http://localhost:3000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });

    if (resposta.ok) {
      alert("Produto cadastrado com sucesso!");

      // Limpa o rascunho salvo, já que o produto foi cadastrado
      limparRascunhoProduto();

      // Limpa os campos do formulário
      formProduto.reset();

      // Recarrega a página para você ver as mudanças estruturais futuras
      window.location.reload();
    } else {
      alert("Erro ao cadastrar o produto no servidor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

// 1. Mapeia o corpo da tabela onde os produtos vão aparecer
const tabelaProdutos = document.querySelector("#products-table tbody");

// 2. Função que busca os produtos no Back-end e joga na tela
async function carregarProdutos() {
  try {
    // Faz o pedido de busca para o servidor
    const resposta = await fetch("http://localhost:3000/api/produtos");
    const produtos = await resposta.json();

    // Limpa a tabela para não duplicar os itens fixos do HTML
    tabelaProdutos.innerHTML = "";

    // Se não tiver nenhum produto cadastrado ainda
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

    // 3. Passa de produto em produto e cria a linha HTML dele
    produtos.forEach((produto) => {
      const linha = document.createElement("tr");

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
                  <span class="bg-success-subtle text-success px-3 py-2 rounded fw-medium d-inline-block text-center" style="width: 85px;">
                    ${produto.status}
                  </span>
                </td>
                <td class="text-center">
                  <button type="button" aria-label="Excluir produto" class="btn btn-link text-muted p-0 btn-excluir-produto" data-id="${produto.id}">
                    <img src="../../../img/icones/lixo_icone.svg" alt="" aria-hidden="true" width="24" height="24">
                  </button>
                </td>
            `;

      // Adiciona a linha criada dentro da tabela
      tabelaProdutos.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao carregar tabela:", error);
  }
}

// 5. Escuta cliques no botão de excluir (delegado, já que as linhas são criadas dinamicamente)
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

// 4. Executa a função assim que a página terminar de carregar
document.addEventListener("DOMContentLoaded", carregarProdutos);
