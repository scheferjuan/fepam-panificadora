// Carregar produtos do LocalStorage
const senha = prompt("Digite a senha do admin:");
if (senha !== "44778899") {
    alert("Acesso negado");
    window.location.href = "index.html";
}

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let editandoId = null;

// Função para renderizar lista de produtos no admin
function renderizarListaAdmin() {
    const lista = document.getElementById('produtos-lista');
    const total = document.getElementById('total-produtos');
    
    lista.innerHTML = produtos.map(produto => `
        <div class="produto-item">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="produto-info-admin">
                <div class="produto-nome-admin">${produto.nome}</div>
                <div class="produto-preco-admin">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <div class="produto-categoria-admin">${produto.categoria}</div>
            </div>
            <button class="btn-editar" onclick="editarProduto('${produto.id}')">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn-excluir" onclick="excluirProduto('${produto.id}')">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `).join('');

    total.textContent = produtos.length;
}

// Função para adicionar/editar produto
function salvarProduto(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const imagem = document.getElementById('imagem').value;

    if (editandoId) {
        // Editar produto existente
        const index = produtos.findIndex(p => p.id === editandoId);
        produtos[index] = {
            ...produtos[index],
            nome,
            descricao,
            preco,
            categoria,
            imagem
        };
    } else {
        // Adicionar novo produto
        const novoProduto = {
            id: gerarId(),
            nome,
            descricao,
            preco,
            categoria,
            imagem
        };
        produtos.push(novoProduto);
    }

    // Salvar no LocalStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    // Limpar formulário
    document.getElementById('produtoForm').reset();
    editandoId = null;
    
    // Atualizar lista
    renderizarListaAdmin();
    
    // Feedback visual
    const btn = document.querySelector('.btn-primary');
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.innerHTML = textoOriginal;
        btn.style.background = '';
    }, 2000);
}

// Função para editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('categoria').value = produto.categoria;
        document.getElementById('imagem').value = produto.imagem;
        editandoId = id;
        
        // Scroll suave para o formulário
        document.querySelector('.admin-form').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Função para excluir produto
function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        renderizarListaAdmin();
    }
}

// Função para gerar ID único
function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar lista inicial
    renderizarListaAdmin();
    
    // Formulário
    document.getElementById('produtoForm').addEventListener('submit', salvarProduto);
    
    // Limpar formulário ao pressionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && editandoId) {
            document.getElementById('produtoForm').reset();
            editandoId = null;
        }
    });
});