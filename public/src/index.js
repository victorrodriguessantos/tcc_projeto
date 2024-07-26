function abrirFormularioCliente() {
    document.getElementById('formularioClienteModal').style.display = 'block';
}

function fecharFormularioCliente() {
    document.getElementById('formularioClienteModal').style.display = 'none';
}

function abrirEditarCliente(cliente) {
    const form = document.getElementById('editarClienteForm');
    form.editar_id_cliente.value = cliente.id_cliente;
    form.editar_name_empresa.value = cliente.name_empresa;
    form.editar_name_cliente.value = cliente.name_cliente;
    form.editar_cpf_cnpj.value = cliente.cpf_cnpj;
    form.editar_email.value = cliente.email;
    form.editar_phone.value = cliente.phone;
    form.editar_endereco.value = cliente.endereco;
    form.editar_status_user.value = cliente.status_user;

    document.getElementById('editarClienteModal').style.display = 'block';
}

function fecharEditarCliente() {
    document.getElementById('editarClienteModal').style.display = 'none';
}

async function criarCliente() {
    const clienteForm = document.getElementById('clienteForm');
    const formData = new FormData(clienteForm);
    const clienteData = {
        name_empresa: formData.get('name_empresa'),
        name_cliente: formData.get('name_cliente'),
        cpf_cnpj: formData.get('cpf_cnpj'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        endereco: formData.get('endereco'),
        status_user: formData.get('status_user')
    };

    try {
        const response = await fetch('/criarCliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        if (response.ok) {
            alert('Cliente criado com sucesso!');
            listarClientes(); // Atualizar a lista de clientes
            fecharFormularioCliente(); // Esconder o formulário modal
        } else {
            const errorData = await response.json();
            alert('Erro ao criar cliente: ' + errorData.error);
        }
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
}

async function atualizarCliente() {
    const id_cliente = document.getElementById('editar_id_cliente').value;
    const name_empresa = document.getElementById('editar_name_empresa').value;
    const name_cliente = document.getElementById('editar_name_cliente').value;
    const cpf_cnpj = document.getElementById('editar_cpf_cnpj').value;
    const email = document.getElementById('editar_email').value;
    const phone = document.getElementById('editar_phone').value;
    const endereco = document.getElementById('editar_endereco').value;
    const status_user = document.getElementById('editar_status_user').value;

    const cliente = {
        name_empresa,
        name_cliente,
        cpf_cnpj,
        email,
        phone,
        endereco,
        status_user
    };

    try {
        const response = await fetch(`/editarCliente/${id_cliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        alert(data.message);
        fecharEditarCliente();
        listarClientes();
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        alert('Erro ao atualizar cliente: ' + error.message);
    }
}

function abrirEditarCliente(cliente) {
    document.getElementById('editar_id_cliente').value = cliente.id_cliente;
    document.getElementById('editar_name_empresa').value = cliente.name_empresa;
    document.getElementById('editar_name_cliente').value = cliente.name_cliente;
    document.getElementById('editar_cpf_cnpj').value = cliente.cpf_cnpj;
    document.getElementById('editar_email').value = cliente.email;
    document.getElementById('editar_phone').value = cliente.phone;
    document.getElementById('editar_endereco').value = cliente.endereco;
    document.getElementById('editar_status_user').value = cliente.status_user;
    document.getElementById('editarClienteModal').style.display = 'block';
}

function fecharEditarCliente() {
    document.getElementById('editarClienteForm').reset();
    document.getElementById('editarClienteModal').style.display = 'none';
}


async function excluirCliente(id_cliente) {
    const confirmation = confirm('Tem certeza que deseja excluir este cliente?');

    if (confirmation) {
        try {
            const response = await fetch(`/excluirCliente/${id_cliente}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Cliente excluído com sucesso!');
                listarClientes(); // Atualizar a lista de clientes
            } else {
                const errorData = await response.json();
                alert('Erro ao excluir cliente: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    }
}

async function listarClientes() {
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = `
        <h1>Lista de Clientes</h1>
        <button class="createUser" onclick="abrirFormularioCliente()"><i class="fi fi-ss-user-add"></i>Novo Cliente</button>
        <div id="clientesList"></div>
    `;

    try {
        const response = await fetch('/listarClientes');
        const clientes = await response.json();

        const clientesListDiv = document.getElementById('clientesList');
        clientesListDiv.innerHTML = ''; // Limpar conteúdo anterior

        clientes.forEach(cliente => {
            const clienteDiv = document.createElement('div');
            clienteDiv.className = 'client-item';
            clienteDiv.innerHTML = `
                <div class="client-info">
                    <span><strong>Nome:</strong> ${cliente.name_cliente}</span>
                    <span><strong>Empresa:</strong> ${cliente.name_empresa}</span>
                    <span><strong>CPF/CNPJ:</strong> ${cliente.cpf_cnpj}</span>
                </div>
                <div class="client-actions">
                    <button class="visualizar" onclick='visualizarCliente(${JSON.stringify(cliente)})'><i class=""><i class="fi-ss-overview"></i></button>
                    <button class="editar" onclick='abrirEditarCliente(${JSON.stringify(cliente)})'><i class="fi fi-ss-file-edit"></i></button>
                    <button class="excluir" onclick='excluirCliente(${cliente.id_cliente})'><i class="fi-ss-trash"></i></button>
                </div>
            `;
            clientesListDiv.appendChild(clienteDiv);
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
    }
}



function visualizarCliente(cliente) {
    alert(`
        Nome: ${cliente.name_cliente}
        Empresa: ${cliente.name_empresa}
        CPF/CNPJ: ${cliente.cpf_cnpj}
        Email: ${cliente.email}
        Telefone: ${cliente.phone}
        Endereço: ${cliente.endereco}
        Status: ${cliente.status_user ? 'Ativo' : 'Inativo'}
    `);
}

function carregarDashboard() {
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = '<h1>Bem-vindo ao Dashboard!</h1>';
}

function listarProdutos() {
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = '<h1>Lista de Produtos</h1>';
}

function listarUsuarios() {
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = '<h1>Lista de Usuários</h1>';
}

// teste

