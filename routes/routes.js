import express from 'express';
import { connection as db } from '../server.js';

const router = express.Router();


// =============================== INICIO PRODUTOS =============================== //

// Rota para listar todos os produtos
router.get('/listarProduto', (req, res) => {
    db.query('SELECT * FROM Produtos', (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(results);
    });
});

// Rota para criar um novo produto
router.post('/criarProduto', (req, res) => {
    const { name_produto, descricao } = req.body;

    db.query('INSERT INTO Produtos (name_produto, descricao) VALUES (?, ?)', [name_produto, descricao], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, name_produto, descricao });
    });
});

// Rota para atualizar o produto
router.put('/editarProduto/:id', (req, res) => {
    const id_produto = req.params.id;
    const { name_produto, descricao } = req.body;

    if (!id_produto || !name_produto || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: id_produto, name_produto, descricao' });
    }

    db.query('UPDATE Produtos SET name_produto = ?, descricao = ? WHERE id_produto = ?', [name_produto, descricao, id_produto], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso!', id_produto, name_produto, descricao });
    });
});

// Rota para excluir um produto
router.delete('/excluirProduto/:id', (req, res) => {
    const id_produto = req.params.id;

    db.query('DELETE FROM Produtos WHERE id_produto = ?', [id_produto], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.status(200).json({ message: 'Produto excluído com sucesso!' });
    });
});

// =============================== FINAL PRODUTOS =============================== //

// =============================== INICIO CLIENTES =============================== //

// Rota para listar todos os clientes
router.get('/listarClientes', (req, res) => {
    db.query('SELECT * FROM Clientes', (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(results);
    });
});

// Rota para criar um novo cliente
router.post('/criarCliente', (req, res) => {
    const { name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user } = req.body;

    db.query('INSERT INTO Clientes (name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user) VALUES (?, ?, ?, ?, ?, ?, ?)', [name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user });
    });
});

// Rota para atualizar o cliente
router.put('/editarCliente/:id', (req, res) => {
    const id_cliente = req.params.id;
    const { name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user } = req.body;

    if (!name_cliente || !cpf_cnpj || !status_user) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: name_cliente, cpf_cnpj, status_user' });
    }

    db.query('UPDATE Clientes SET name_empresa = ?, name_cliente = ?, cpf_cnpj = ?, email = ?, phone = ?, endereco = ?, status_user = ? WHERE id_cliente = ?', 
        [name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user, id_cliente], (err, result) => {

        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Cliente atualizado com sucesso!', id_cliente, name_empresa, name_cliente, cpf_cnpj, email, phone, endereco, status_user });
    });
});

// Rota para excluir um cliente
router.delete('/excluirCliente/:id', (req, res) => {
    const id_cliente = req.params.id;

    db.query('DELETE FROM Clientes WHERE id_cliente = ?', [id_cliente], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});


// =============================== FINAL CLIENTES =============================== //


export default router;