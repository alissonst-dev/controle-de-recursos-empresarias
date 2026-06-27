// Aplica máscaras de digitação com o plugin jQuery Mask
$(document).ready(function () {
  $("#input-cnpj-fornecedor").mask("00.000.000/0000-00");
  $("#input-telefone-fornecedor").mask("(00) 00000-0000");
  $("#input-cep-fornecedor").mask("00000-000");
});

// 1. Mapeia o formulário do Modal de fornecedores
const formFornecedor = document.getElementById("form-fornecedor");

const inputCnpj = document.getElementById("input-cnpj-fornecedor");
const inputTelefone = document.getElementById("input-telefone-fornecedor");
const inputCep = document.getElementById("input-cep-fornecedor");

// Expressões regulares usadas para validar o formato de cada campo
const REGEX_CNPJ = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const REGEX_TELEFONE = /^\+?\d{0,3}\s?\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/;
const REGEX_CEP = /^\d{5}-?\d{3}$/;

// Aplica a regex no campo e usa setCustomValidity para mostrar
// a mensagem de erro no balão nativo do navegador
function validarComRegex(input, regex, mensagemErro) {
  if (input.value && !regex.test(input.value)) {
    input.setCustomValidity(mensagemErro);
  } else {
    input.setCustomValidity("");
  }
}

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

// Busca o endereço na API pública ViaCEP quando o usuário termina de
// digitar o CEP (evento blur = quando o campo perde o foco)
const inputEndereco = document.getElementById("input-endereco-fornecedor");
const inputCidade = document.getElementById("input-cidade-fornecedor");
const inputEstado = document.getElementById("input-estado-fornecedor");

inputCep.addEventListener("blur", async () => {
  const cepLimpo = inputCep.value.replace(/\D/g, "");

  // CEP brasileiro tem 8 dígitos; sem isso nem tenta consultar
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

// 2. Escuta o momento do envio (Submit)
formFornecedor.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Garante que os campos com regex foram validados antes de enviar
  if (!formFornecedor.checkValidity()) {
    formFornecedor.reportValidity();
    return;
  }

  // 3. Pega os valores de todos os inputs do formulário do HTML
  const nome = document.getElementById("input-nome-fornecedor").value;
  const cnpj = document.getElementById("input-cnpj-fornecedor").value;
  const categoria = document.getElementById(
    "input-categoria-fornecedor",
  ).value;
  const email = document.getElementById("input-email-fornecedor").value;
  const telefone = document.getElementById(
    "input-telefone-fornecedor",
  ).value;
  const cep = document.getElementById("input-cep-fornecedor").value;
  const endereco = document.getElementById(
    "input-endereco-fornecedor",
  ).value;
  const cidade = document.getElementById("input-cidade-fornecedor").value;
  const estado = document.getElementById("input-estado-fornecedor").value;

  // 4. Junta tudo em um objeto completo seguindo o padrão do layout
  const novoFornecedor = {
    nome,
    cnpj,
    categoria,
    email,
    telefone,
    cep,
    endereco,
    cidade,
    estado,
    status: "Ativo",
  };

  try {
    // 5. Envia o JSON completo para o servidor Back-end
    const resposta = await fetch("http://localhost:3000/api/fornecedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

// 1. Mapeia o corpo da tabela onde os fornecedores vão aparecer
const tabelaFornecedores = document.querySelector("#fornecedores-table tbody");

// 2. Função que busca os fornecedores no Back-end e joga na tela
async function carregarFornecedores() {
  try {
    const resposta = await fetch("http://localhost:3000/api/fornecedores");
    const fornecedores = await resposta.json();

    tabelaFornecedores.innerHTML = "";

    if (fornecedores.length === 0) {
      tabelaFornecedores.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        Nenhum fornecedor cadastrado no momento.
                    </td>
                </tr>
            `;
      return;
    }

    fornecedores.forEach((fornecedor) => {
      const linha = document.createElement("tr");

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
                <td class="text-center">0</td>
                <td class="text-center">
                  <span class="status-badge status-badge-success">${fornecedor.status}</span>
                </td>
                <td class="text-center">
                  <button type="button" aria-label="Excluir fornecedor" class="btn btn-link text-muted p-0">
                    <img src="../../../img/icones/lixo_icone.svg" alt="" aria-hidden="true" width="24" height="24">
                  </button>
                </td>
            `;

      tabelaFornecedores.appendChild(linha);
    });

    // Usa jQuery para animar a exibição da tabela depois que os dados carregam
    $(tabelaFornecedores).hide().fadeIn(400);
  } catch (error) {
    console.error("Erro ao carregar tabela:", error);
  }
}

// 3. Executa a função assim que a página terminar de carregar
document.addEventListener("DOMContentLoaded", carregarFornecedores);
