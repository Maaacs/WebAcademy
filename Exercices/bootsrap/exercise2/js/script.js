document.addEventListener('DOMContentLoaded', (event) => {
    let produtos = [
        { id: 1, nome: 'Bicicleta', preco: 'R$ 1.000,00', estoque: 110 },
        { id: 2, nome: 'Skate', preco: 'R$ 500,00', estoque: 8 },
        { id: 3, nome: 'Patins', preco: 'R$ 1.500,00', estoque: 10 },
        { id: 4, nome: 'Prancha de Surf', preco: 'R$ 3.100,00', estoque: 0 },
    ];
    
    const renderizarProdutos = () => {
        const tbody = document.getElementById('product-table-body');
        tbody.innerHTML = '';

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td class="${produto.estoque === 0 ? 'estoque-zero' : ''}">${produto.estoque}</td>
                <td>
                    <button class="btn btn-primary btn-editar" data-id="${produto.id}"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-danger btn-excluir" data-id="${produto.id}"><i class="bi bi-trash"></i> Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', (e) => editarProduto(parseInt(e.target.dataset.id, 10)));
        });

        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', (e) => excluirProduto(parseInt(e.target.dataset.id, 10)));
        });
    };
    renderizarProdutos();
    
    const editarProduto = id => {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            document.getElementById('produtoNome').value = produto.nome;
            document.getElementById('produtoPreco').value = produto.preco;
            document.getElementById('produtoEstoque').value = produto.estoque;
            const modalElement = document.getElementById('novoProdutoModal');
            modalElement.setAttribute('data-editing-id', id);
            new bootstrap.Modal(modalElement).show();
        }
    };
   
    const confirmarCadastroOuEdicao = () => {
        const nome = document.getElementById('produtoNome').value.trim();
        const preco = document.getElementById('produtoPreco').value.trim();
        const estoque = parseInt(document.getElementById('produtoEstoque').value.trim(), 10);
        const modalElement = document.getElementById('novoProdutoModal');
        const editingId = modalElement.getAttribute('data-editing-id');

        if (!nome || !preco || isNaN(estoque)) {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        if (editingId) {
            const produtoIndex = produtos.findIndex(p => p.id === parseInt(editingId, 10));
            if (produtoIndex !== -1) {
                produtos[produtoIndex] = { id: produtos[produtoIndex].id, nome, preco, estoque };
            }
        } else {
            const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
            produtos.push({ id: novoId, nome, preco, estoque });
        }
        
        renderizarProdutos();
        bootstrap.Modal.getInstance(modalElement).hide();
        modalElement.removeAttribute('data-editing-id');
    };
    window.confirmarCadastroOuEdicao = confirmarCadastroOuEdicao;
    

    const excluirProduto = id => {
        if (confirm('Tem certeza de que deseja excluir este produto?')) {
            produtos = produtos.filter(p => p.id !== id);
            renderizarProdutos();
        }
    };

    const novoProdutoBtn = document.getElementById('novo-produto-btn');
    if (novoProdutoBtn) {
        novoProdutoBtn.addEventListener('click', () => {
            const modalElement = document.getElementById('novoProdutoModal');
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        });
    }

});
