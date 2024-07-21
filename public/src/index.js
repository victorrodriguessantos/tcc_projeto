async function listarProdutos() {
    try {
        const response = await fetch('/listarProduto');
        const produtos = await response.json();
        
        const conteudoDiv = document.getElementById('conteudo');
        conteudoDiv.innerHTML = ''; // Limpar conteúdo anterior
        document.getElementById('titulo').textContent = 'Lista de Produtos';

        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.textContent = `ID: ${produto.id_produto}, Nome: ${produto.name_produto}, Descrição: ${produto.descricao}`;
            conteudoDiv.appendChild(produtoDiv);
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}

async function listarClientes() {
    try {
        const response = await fetch('/listarClientes');
        const clientes = await response.json();
        
        const conteudoDiv = document.getElementById('conteudo');
        conteudoDiv.innerHTML = ''; // Limpar conteúdo anterior
        document.getElementById('titulo').textContent = 'Lista de Clientes';

        clientes.forEach(cliente => {
            const clienteDiv = document.createElement('div');
            clienteDiv.textContent = `ID: ${cliente.id_cliente}, Nome: ${cliente.name_cliente}, Empresa: ${cliente.name_empresa}`;
            conteudoDiv.appendChild(clienteDiv);
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
    }
}

async function listarUsuarios() {
    try {
        const response = await fetch('/listarUsuarios');
        const usuarios = await response.json();
        
        const conteudoDiv = document.getElementById('conteudo');
        conteudoDiv.innerHTML = ''; // Limpar conteúdo anterior
        document.getElementById('titulo').textContent = 'Lista de Usuários';

        usuarios.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.textContent = `ID: ${usuario.id_usuario}, Nome: ${usuario.name_usuario}, User: ${usuario.user_db}`;
            conteudoDiv.appendChild(usuarioDiv);
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
}

function carregarDashboard() {
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = ''; // Limpar conteúdo anterior
    document.getElementById('titulo').textContent = 'Dashboard';
    const dashboardDiv = document.createElement('div');
    dashboardDiv.textContent = 'Bem-vindo ao Dashboard!';
    conteudoDiv.appendChild(dashboardDiv);
}
