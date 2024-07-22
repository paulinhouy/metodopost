const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3020;

// Middleware para poder ler o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Dados fictícios de produtos (simulando um "banco de dados" em memória)
let produtos = [
    { id: 1, nome: 'Produto 1', preco: 10.5 },
    { id: 2, nome: 'Produto 2', preco: 20.0 },
    { id: 3, nome: 'Produto 3', preco: 15.75 }
];

// Função para renderizar a lista de produtos em HTML
function renderizarListaProdutos() {
    let html = `
        <html>
        <head>
            <title>Lista de Produtos</title>
        </head>
        <body>
            <h1>Lista de Produtos</h1>
            <ul>
    `;

    produtos.forEach(produto => {
        html += `<li>${produto.nome} - R$ ${produto.preco.toFixed(2)}</li>`;
    });

    html += `
            </ul>
            <br/>
            <form action="/produtos" method="post">
                <label>Nome:</label>
                <input type="text" name="nome" required>
                <label>Preço:</label>
                <input type="number" step="0.01" name="preco" required>
                <button type="submit">Adicionar Produto</button>
            </form>
        </body>
        </html>
    `;

    return html;
}

// Rota para retornar a lista de produtos em formato HTML
app.get('/produtos', (req, res) => {
    const html = renderizarListaProdutos();
    res.send(html);
});

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1; // Gera um novo ID
    const novoProduto = { id, nome, preco: parseFloat(preco) };
    produtos.push(novoProduto);
    const html = renderizarListaProdutos();
    res.send(html);
});

// Iniciando o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
