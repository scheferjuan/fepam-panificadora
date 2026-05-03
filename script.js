// Dados iniciais dos produtos FEPM - Salvos no LocalStorage
let produtos = JSON.parse(localStorage.getItem('produtos')) || [
    {
        id: 1,
        nome: 'Pão Francês',
        descricao: 'Pão francês crocante por fora e macio por dentro, produção diária às 6h da manhã.',
        preco: 0.60,
        categoria: 'pães',
        imagem: 'https://images.unsplash.com/photo-1617096707519-02d8f403479e?w=400'
    },
    {
        id: 2,
        nome: 'Pão Integral',
        descricao: 'Pão integral caseiro com sementes, rico em fibras e sabor.',
        preco: 7.50,
        categoria: 'pães',
        imagem: 'https://images.unsplash.com/photo-1546833999-10bb971f63fc?w=400'
    },
    {
        id: 3,
        nome: 'Broto de Couve',
        descricao: 'Pão especial com broto de couve, leve e nutritivo.',
        preco: 8.90,
        categoria: 'pães',
        imagem: 'https://images.unsplash.com/photo-1621996346565-e3adc653d99b?w=400'
    },
    {
        id: 4,
        nome: 'Coxinha de Frango',
        descricao: 'Coxinha crocante com recheio cremoso de frango desfiado.',
        preco: 3.50,
        categoria: 'salgados',
        imagem: 'https://images.unsplash.com/photo-1603048297194-8f7d9e7f8e7d?w=400'
    },
    {
        id: 5,
        nome: 'Bolo de Milho',
        descricao: 'Bolo de milho cremoso com sabor caseiro tradicional.',
        preco: 12.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
    },
    {
        id: 6,
        nome: 'Pastel de Carne',
        descricao: 'Pastel frito com recheio de carne temperada na hora.',
        preco: 4.00,
        categoria: 'salgados',
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
    },
    {
        id: 7,
        nome: 'Sonho de Chocolate',
        descricao: 'Sonho recheado com chocolate cremoso e açúcar por cima.',
        preco: 5.00,
        categoria: 'doces',
        imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
    }
];

// Função para salvar produtos no LocalStorage
function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para gerar ID único
function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para renderizar produtos
function renderizarProdutos(filtro = 'todos') {
    const grid = document.getElementById('produtos-grid');
    let produtosFiltrados = produtos;

    if (filtro !== 'todos') {
        produtosFiltrados = produtos.filter(p => p.categoria === filtro);
    }

    grid.innerHTML = produtosFiltrados.map(produto => `
        <div class="produto-card" data-categoria="${produto.categoria}">
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome} - Fepam Panificadora" loading="lazy">
                <span class="categoria-tag">${produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}</span>
            </div>
            <div class="produto-info">
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-desc">${produto.descricao}</p>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
            </div>
        </div>
    `).join('');

    // Animação de entrada
    const cards = grid.querySelectorAll('.produto-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// [RESTO DO CÓDIGO JAVASCRIPT IDÊNTICO AO ANTERIOR]
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar produtos iniciais
    renderizarProdutos();

    // Menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            const filtro = btn.dataset.filtro;
            renderizarProdutos(filtro);
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Salvar produtos iniciais
    salvarProdutos();
});