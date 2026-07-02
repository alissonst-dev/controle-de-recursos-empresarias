// 1. REFERÊNCIAS AO DOM
// elementos que o JS manipula

const formFornecedor = document.getElementById("form-fornecedor"); // <form> do modal de cadastro
const inputCnpj = document.getElementById("input-cnpj-fornecedor"); // <input> do CNPJ
const inputTelefone = document.getElementById("input-telefone-fornecedor"); // <input> do telefone
const inputCep = document.getElementById("input-cep-fornecedor"); // <input> do CEP
const inputEndereco = document.getElementById("input-endereco-fornecedor"); // <input> do endereço (preenchido pela ViaCEP)
const inputCidade = document.getElementById("input-cidade-fornecedor"); // <input> da cidade (preenchido pela ViaCEP)
const inputEstado = document.getElementById("input-estado-fornecedor"); // <input> do estado (preenchido pela ViaCEP)
const tabelaFornecedores = document.querySelector("#fornecedores-table tbody"); // <tbody> onde as linhas são inseridas dinamicamente
const elTotalFornecedores = document.getElementById("stat-total-fornecedores"); // <h3> do card "Total de fornecedores"
const elFornecedoresAtivos = document.getElementById(
  "stat-fornecedores-ativos",
); // <h3> do card "Fornecedores Ativos"
const elFornecedoresInativos = document.getElementById(
  "stat-fornecedores-inativos",
); // <h3> do card "Fornecedores Inativos"
const elFornecedoresPendentes = document.getElementById(
  "stat-fornecedores-pendentes",
); // <h3> do card "Fornecedores Pendentes"

// 2. CONSTANTES — REGEX de validação
// ID 12

const REGEX_CNPJ = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const REGEX_TELEFONE = /^\+?\d{0,3}\s?\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/;
const REGEX_CEP = /^\d{5}-?\d{3}$/;

// 3. FUNÇÕES AUXILIARES
// ========================================

// Valida um campo contra uma REGEX e exibe
// o erro nativo do navegador — ID 11, ID 12 (CNPJ, telefone, CEP)
function validarComRegex(input, regex, mensagemErro) {
  if (input.value && !regex.test(input.value)) {
    input.setCustomValidity(mensagemErro);
  } else {
    input.setCustomValidity("");
  }
}

// Atualiza os cards de estatística com os
// totais calculados a partir da lista da API — ID 23
function atualizarEstatisticasFornecedores(fornecedores) {
  elTotalFornecedores.textContent = fornecedores.length;
  elFornecedoresAtivos.textContent = fornecedores.filter(
    (f) => f.status === "Ativo",
  ).length;
  elFornecedoresInativos.textContent = fornecedores.filter(
    (f) => f.status === "Inativo",
  ).length;
  elFornecedoresPendentes.textContent = fornecedores.filter(
    (f) => f.status === "Pendente",
  ).length;
}

// ========================================
// 4. CARREGAMENTO INICIAL DA PÁGINA
// Busca fornecedores e produtos no backend
// e renderiza tabela + cards — ID 23
// ========================================

async function carregarFornecedores() {
  try {
    const [respostaFornecedores, respostaProdutos] = await Promise.all([
      fetch("http://localhost:3000/api/fornecedores"),
      fetch("http://localhost:3000/api/produtos"),
    ]);

    const fornecedores = await respostaFornecedores.json();
    const produtos = await respostaProdutos.json();

    atualizarEstatisticasFornecedores(fornecedores);
    tabelaFornecedores.innerHTML = "";

    if (fornecedores.length === 0) {
      tabelaFornecedores.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-muted py-4">
            Nenhum fornecedor cadastrado no momento.
          </td>
        </tr>`;
      return;
    }

    fornecedores.forEach((fornecedor) => {
      const linha = document.createElement("tr");

      const totalProdutos = produtos.filter(
        (produto) => produto.fornecedor === fornecedor.nome,
      ).length;

      linha.innerHTML = `
        <td>
          <div class="d-flex align-items-center gap-3">
            <div class="icone-fornecedor-tabela rounded d-flex align-items-center justify-content-center">
              <img src="../../../img/icones/icon_fornecedores.svg" alt="" aria-hidden="true">
            </div>
            <span class="fw-semibold">${fornecedor.nome}</span>
          </div>
        </td>
        <td>${fornecedor.cidade || "Não informado"}</td>
        <td>${fornecedor.email}</td>
        <td>${fornecedor.telefone}</td>
        <td class="text-center">${totalProdutos}</td>
        <td class="text-center">
          <span class="status-badge status-badge-success">${fornecedor.status}</span>
        </td>
        <td class="text-center">
          <button type="button" aria-label="Excluir fornecedor"
            class="btn btn-link text-muted p-0 btn-excluir-fornecedor"
            data-id="${fornecedor.id}">
            <img src="../../../img/icones/lixo_icone.svg" alt="" aria-hidden="true" width="24" height="24">
          </button>
        </td>`;

      tabelaFornecedores.appendChild(linha);
    });

    $(tabelaFornecedores).hide().fadeIn(400); // jQuery — ID 20
  } catch (error) {
    console.error("Erro ao carregar tabela:", error);
  }
}

// ========================================
// 5. MÁSCARAS DE DIGITAÇÃO
// Aplicadas quando o DOM estiver pronto
// ID 20, ID 21
// ========================================

$(document).ready(function () {
  $("#input-cnpj-fornecedor").mask("00.000.000/0000-00");
  $("#input-telefone-fornecedor").mask("(00) 00000-0000");
  $("#input-cep-fornecedor").mask("00000-000");
});

// ========================================
// 6. VALIDAÇÃO DOS CAMPOS AO DIGITAR
// ID 11, ID 12
// ========================================

inputCnpj.addEventListener("input", () =>
  validarComRegex(
    inputCnpj,
    REGEX_CNPJ,
    "Informe um CNPJ válido, ex.: 00.000.000/0000-00",
  ),
);

inputTelefone.addEventListener("input", () =>
  validarComRegex(
    inputTelefone,
    REGEX_TELEFONE,
    "Informe um telefone válido, ex.: (42) 99999-9999",
  ),
);

inputCep.addEventListener("input", () =>
  validarComRegex(inputCep, REGEX_CEP, "Informe um CEP válido, ex.: 85200-000"),
);

// ========================================
// 7. AUTOPREENCHIMENTO DE ENDEREÇO VIA VIACEP
// Disparado quando o campo CEP perde o foco
// ID 24
// ========================================

inputCep.addEventListener("blur", async () => {
  const cepLimpo = inputCep.value.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP não encontrado.");
      return;
    }

    inputEndereco.value = dados.logradouro;
    inputCidade.value = dados.localidade;
    inputEstado.value = dados.uf;
  } catch (error) {
    console.error("Erro ao consultar o CEP:", error);
    alert("Não foi possível consultar o CEP. Verifique sua conexão.");
  }
});

// ========================================
// 8. CADASTRO DE FORNECEDOR (SUBMIT)
// Valida o formulário e envia POST ao backend
// ID 11, ID 22
// ========================================

formFornecedor.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!formFornecedor.checkValidity()) {
    formFornecedor.reportValidity();
    return;
  }

  const novoFornecedor = {
    nome: document.getElementById("input-nome-fornecedor").value,
    cnpj: document.getElementById("input-cnpj-fornecedor").value,
    categoria: document.getElementById("input-categoria-fornecedor").value,
    email: document.getElementById("input-email-fornecedor").value,
    telefone: document.getElementById("input-telefone-fornecedor").value,
    cep: document.getElementById("input-cep-fornecedor").value,
    endereco: document.getElementById("input-endereco-fornecedor").value,
    cidade: document.getElementById("input-cidade-fornecedor").value,
    estado: document.getElementById("input-estado-fornecedor").value,
    status: "Ativo",
  };

  try {
    const resposta = await fetch("http://localhost:3000/api/fornecedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoFornecedor),
    });

    if (resposta.ok) {
      alert("Fornecedor cadastrado com sucesso!");
      formFornecedor.reset();
      window.location.reload();
    } else {
      alert("Erro ao cadastrar o fornecedor no servidor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

// ========================================
// 9. EXCLUSÃO DE FORNECEDOR
// Delegado no tbody pois as linhas são dinâmicas
// ID 22
// ========================================

tabelaFornecedores.addEventListener("click", async (event) => {
  const botaoExcluir = event.target.closest(".btn-excluir-fornecedor");
  if (!botaoExcluir) return;

  const confirmou = confirm("Tem certeza que deseja excluir este fornecedor?");
  if (!confirmou) return;

  try {
    const resposta = await fetch(
      `http://localhost:3000/api/fornecedores/${botaoExcluir.dataset.id}`,
      { method: "DELETE" },
    );

    if (resposta.ok) {
      carregarFornecedores();
    } else {
      alert("Erro ao excluir o fornecedor.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

// ========================================
// INICIALIZAÇÃO
// Dispara o carregamento quando a página abre
// ID 23
// ========================================

document.addEventListener("DOMContentLoaded", carregarFornecedores);
