const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Caminho absoluto para o nosso arquivo JSON (banco de dados)
const caminhoBanco = path.join(__dirname, 'produtos.json');

// Função auxiliar para ler os dados do arquivo JSON com segurança
const lerBanco = () => {
    try {
        const dados = fs.readFileSync(caminhoBanco, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        // Se o arquivo não existir ou estiver corrompido, retorna um array vazio
        return [];
    }
};

// Função auxiliar para salvar os dados no arquivo JSON
const salvarBanco = (dados) => {
    fs.writeFileSync(caminhoBanco, JSON.stringify(dados, null, 2), 'utf-8');
};


/* 
   ROTAS DA API
    */

// 1. ROTA DE LISTAGEM (GET) - Envia todos os produtos para a tabela
app.get('/api/produtos', (req, res) => {
    const produtos = lerBanco();
    res.json(produtos);
});

// 2. ROTA DE CADASTRO (POST) - Recebe o formulário do modal e salva no JSON
app.post('/api/produtos', (req, res) => {
    const produtos = lerBanco();
    
    // Pega os dados enviados pelo Front-end
    const novoProduto = req.body;

    // Cria um ID único baseado no carimbo de data/hora atual e injeta no produto
    novoProduto.id = Date.now();

    // Adiciona o novo produto na lista existente
    produtos.push(novoProduto);

    // Grava a lista atualizada de volta no arquivo produtos.json
    salvarBanco(produtos);

    // Responde para o front-end que deu tudo certo e envia o produto cadastrado
    res.status(201).json({ 
        mensagem: "Produto cadastrado com sucesso!", 
        produto: novoProduto 
    });
});


app.listen(PORT, () => {
    console.log(`Servidor e Banco JSON rodando em http://localhost:${PORT}`);
});