// ========== ROSA SELVAGEM - MAIN JS ==========

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollToTop();
    initProductAnimations();
    initDropdowns();
    initSortProducts();
    initExitPopup();
    initCart();
    initWelcomePopup();
});

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const menuClose = document.getElementById('menuClose');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && navMenu) {
        menuClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// ========== DROPDOWNS (MOBILE) ==========
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = toggle.closest('.dropdown');
                parent.classList.toggle('open');
            }
        });
    });
}

// ========== SCROLL TO TOP ==========
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTop');

    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== PRODUCT CARD ANIMATIONS ==========
function initProductAnimations() {
    const cards = document.querySelectorAll('.product-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ========== SORT PRODUCTS ==========
function initSortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        const grid = document.querySelector('.products-grid');
        const cards = Array.from(grid.querySelectorAll('.product-card'));

        cards.sort((a, b) => {
            const priceA = extractPrice(a);
            const priceB = extractPrice(b);
            const nameA = a.querySelector('h3').textContent.trim();
            const nameB = b.querySelector('h3').textContent.trim();

            switch (value) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                default:
                    return 0;
            }
        });

        // Re-append sorted cards with animation
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                grid.appendChild(card);
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, i * 60);
        });
    });
}

function extractPrice(card) {
    const priceText = card.querySelector('.price')?.textContent || '';
    const match = priceText.match(/R\$\s*([\d.,]+)/);
    if (match) {
        return parseFloat(match[1].replace('.', '').replace(',', '.'));
    }
    return 0;
}

// ========== CART DRAWER ==========
function initCart() {
    const overlay      = document.getElementById('cartOverlay');
    const drawer       = document.getElementById('cartDrawer');
    const closeBtn     = document.getElementById('cartDrawerClose');
    const itemsList    = document.getElementById('cartItemsList');
    const cjList       = document.getElementById('cartComprejuntoList');
    const cjSection    = document.getElementById('cartComprejuntoSection');
    const brindeCard   = document.getElementById('cartBrindeCard');
    const progressFill = document.getElementById('cartProgressFill');
    const progressMsg  = document.getElementById('cartProgressMsg');
    const progressDiff = document.getElementById('cartProgressDiff');
    const drawerCount  = document.getElementById('cartDrawerCount');
    const headerCount  = document.querySelector('.cart-count');
    const subtotalEl   = document.getElementById('cartSubtotal');
    const freteEl      = document.getElementById('cartFrete');
    const totalEl      = document.getElementById('cartTotal');

    if (!overlay || !drawer) return;

    const FRETE_GRATIS = 20;
    const BRINDE       = 120;

    let cart = JSON.parse(localStorage.getItem('rosaCart') || '[]');

    // Expose add to cart globally for product page
    window.rosaAddToCart = function(product, qty = 1) {
        const existing = cart.find(i => i.id === product.id);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ ...product, qty });
        }
        refreshCart();
        openCart();
    };

    // ── helpers ──────────────────────────────────────────────
    function fmt(val) {
        return 'R$ ' + val.toFixed(2).replace('.', ',');
    }

    function calcTotals() {
        const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const frete    = subtotal >= FRETE_GRATIS ? 0 : null;
        return { subtotal, frete, total: subtotal };
    }

    function totalQty() {
        return cart.reduce((s, i) => s + i.qty, 0);
    }

    // ── parse data from DOM card ──────────────────────────────
    function parseProductFromCard(btn) {
        const card  = btn.closest('.product-card');
        if (!card) return null;
        const name  = card.querySelector('h3')?.textContent.trim() || '';
        const img   = card.querySelector('.img-wrapper img')?.src || '';
        const raw   = card.querySelector('.price-current')?.textContent || '0';
        const price = parseFloat(raw.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
        const id    = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
        const checkoutUrl = card.dataset.checkoutUrl || '';
        return { id, name, price, image: img, qty: 1, checkoutUrl };
    }

    // ── cart state ────────────────────────────────────────────
    function addToCart(product) {
        window.rosaAddToCart(product, 1);
    }

    function changeQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        refreshCart();
    }

    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        refreshCart();
    }

    // ── render ────────────────────────────────────────────────
    function renderCartItems() {
        if (cart.length === 0) {
            itemsList.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
            return;
        }
        itemsList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${fmt(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                        <span class="cart-qty-num">${item.qty}</span>
                        <button class="cart-qty-btn" data-id="${item.id}" data-delta="1">+</button>
                        <button class="cart-remove-btn" data-id="${item.id}">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderProgress() {
        const { subtotal } = calcTotals();
        const maxGoal = BRINDE;
        const pct     = Math.min((subtotal / maxGoal) * 100, 100);

        progressFill.style.width = pct + '%';

        // milestone states
        drawer.querySelector('.milestone-20')?.classList.toggle('reached', subtotal >= FRETE_GRATIS);
        drawer.querySelector('.milestone-120')?.classList.toggle('reached', subtotal >= BRINDE);

        // brinde card: sempre visível, alterna entre locked (p&b) e visible (rosa)
        const brindeUnlocked = subtotal >= BRINDE;
        brindeCard.classList.toggle('visible', brindeUnlocked);
        brindeCard.classList.toggle('locked',  !brindeUnlocked);

        // message
        if (subtotal >= BRINDE) {
            progressMsg.innerHTML = '🎁 Você ganhou sua <strong>Caixa de Presente</strong>!';
        } else if (subtotal >= FRETE_GRATIS) {
            const diff = BRINDE - subtotal;
            progressMsg.innerHTML = `Falta só <strong>${fmt(diff)}</strong> pra você ganhar sua Caixa de Presente! 🎁`;
            if (progressDiff) progressDiff.textContent = fmt(diff);
        } else {
            const diff = FRETE_GRATIS - subtotal;
            progressMsg.innerHTML = `Falta só <strong>${fmt(diff)}</strong> pra você ganhar Frete Grátis! 🚚`;
            if (progressDiff) progressDiff.textContent = fmt(diff);
        }
    }

    function renderComprejunto() {
        const cartIds = new Set(cart.map(i => i.id));
        const allCards = [...document.querySelectorAll('.product-card:not(.esgotado)')];
        const suggestions = allCards
            .map(card => {
                const name  = card.querySelector('h3')?.textContent.trim() || '';
                const id    = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
                const img   = card.querySelector('.img-wrapper img')?.src || '';
                const raw   = card.querySelector('.price-current')?.textContent || '0';
                const price = parseFloat(raw.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
                const checkoutUrl = card.dataset.checkoutUrl || '';
                return { id, name, price, image: img, checkoutUrl };
            })
            .filter(p => !cartIds.has(p.id))
            .slice(0, 4);

        if (suggestions.length === 0) {
            cjSection.style.display = 'none';
            return;
        }
        cjSection.style.display = '';
        cjList.innerHTML = suggestions.map(p => `
            <div class="cart-cj-card">
                <img class="cart-cj-img" src="${p.image}" alt="${p.name}">
                <p class="cart-cj-name">${p.name}</p>
                <p class="cart-cj-price">${fmt(p.price)}</p>
                <button class="cart-cj-add-btn" data-cj-id="${p.id}"
                    data-cj-name="${p.name}" data-cj-price="${p.price}" data-cj-img="${p.image}" data-cj-checkout="${p.checkoutUrl}">
                    Adicionar
                </button>
            </div>
        `).join('');
    }

    function renderTotals() {
        const { subtotal, frete, total } = calcTotals();
        subtotalEl.textContent = fmt(subtotal);
        freteEl.textContent    = frete === 0 ? 'GRÁTIS' : (subtotal > 0 ? 'Calculado no checkout' : '—');
        freteEl.style.color    = frete === 0 ? '#2e7d32' : '';
        totalEl.textContent    = fmt(total);
    }

    function updateHeaderCount() {
        const qty = totalQty();
        if (headerCount) headerCount.textContent = qty;
        if (drawerCount) drawerCount.textContent  = qty;
    }

    function refreshCart() {
        localStorage.setItem('rosaCart', JSON.stringify(cart));
        renderCartItems();
        renderProgress();
        renderComprejunto();
        renderTotals();
        updateHeaderCount();
    }

    // Call once on init to render loaded cart
    refreshCart();

    // ── open / close ──────────────────────────────────────────
    function openCart() {
        overlay.classList.add('active');
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        overlay.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ── event delegation ──────────────────────────────────────
    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    const headerCartBtn = document.getElementById('headerCartBtn');
    headerCartBtn?.addEventListener('click', e => {
        e.preventDefault();
        openCart();
    });

    document.getElementById('cartCheckoutBtn')?.addEventListener('click', () => {
        if (cart.length > 0) {
            // Redireciona para o link do primeiro produto adicionado
            window.location.href = cart[0].checkoutUrl || 'index.html';
        } else {
            alert('Seu carrinho está vazio!');
        }
    });

    // qty +/− and remove inside drawer
    itemsList.addEventListener('click', e => {
        const qtyBtn    = e.target.closest('.cart-qty-btn');
        const removeBtn = e.target.closest('.cart-remove-btn');
        if (qtyBtn) changeQty(qtyBtn.dataset.id, parseInt(qtyBtn.dataset.delta, 10));
        if (removeBtn) removeItem(removeBtn.dataset.id);
    });

    // compre junto "Adicionar"
    cjList.addEventListener('click', e => {
        const btn = e.target.closest('.cart-cj-add-btn');
        if (!btn) return;
        addToCart({
            id:    btn.dataset.cjId,
            name:  btn.dataset.cjName,
            price: parseFloat(btn.dataset.cjPrice),
            image: btn.dataset.cjImg,
            checkoutUrl: btn.dataset.cjCheckout,
            qty:   1,
        });
        refreshCart();
    });

    // main "Adicionar ao carrinho" buttons — override old animation
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering the card click
            const product = parseProductFromCard(btn);
            if (!product) return;
            addToCart(product);
        });
    });

    // main "COMPRAR AGORA" buttons
    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering the card click
            const product = parseProductFromCard(btn);
            if (!product || !product.checkoutUrl) return;
            
            // Opcional: Adiciona ao carrinho para registro e vai para o checkout
            addToCart(product);
            window.location.href = product.checkoutUrl;
        });
    });

    // Handle clicks on product cards to go to details page
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // If they clicked the add to cart button, ignore
            if (e.target.closest('.add-to-cart-btn')) return;

            const name = card.querySelector('h3')?.textContent.trim() || '';
            const id = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
            const img = card.querySelector('.img-wrapper img')?.src || '';
            const rawPrice = card.querySelector('.price-current')?.textContent || '0';
            const price = parseFloat(rawPrice.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
            const originalRaw = card.querySelector('.price-original')?.textContent || '';
            const checkoutUrl = card.dataset.checkoutUrl || '';
            
            const productData = { id, name, price, image: img, originalPrice: originalRaw, checkoutUrl };
            localStorage.setItem('currentRosaProduct', JSON.stringify(productData));
            window.location.href = `produto.html?id=${id}`;
        });
        
        // Change cursor to pointer to indicate it's clickable
        card.style.cursor = 'pointer';
    });
}

// ========== EXIT-INTENT POPUP ==========
function initExitPopup() {
    // Only run on index.html (the main landing page)
    const path = window.location.pathname;
    if (!path.endsWith('index.html') && path !== '/' && path !== '') return;

    const overlay   = document.getElementById('exitOverlay');
    const closeBtn  = document.getElementById('exitClose');
    const dismissBtn = document.getElementById('exitDismiss');
    const ctaBtn    = document.getElementById('exitCtaBtn');
    const timerEl   = document.getElementById('exitTimer');

    if (!overlay) return;

    let shown = false;
    let timerInterval = null;
    let secondsLeft = 600; // 10 minutes

    function showPopup() {
        if (shown) return;
        shown = true;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        startTimer();
        // Re-push state so back navigation works after dismissal
        history.pushState({ exitPopup: true }, '', window.location.href);
    }

    function hidePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        clearInterval(timerInterval);
    }

    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            secondsLeft--;
            updateTimerDisplay();
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                hidePopup();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
        const s = String(secondsLeft % 60).padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
    }

    // ── Intercept browser back button only ──
    history.pushState({ exitPopup: false }, '', window.location.href);
    window.addEventListener('popstate', () => {
        if (!shown) showPopup();
    });

    // ── Close actions ──
    closeBtn.addEventListener('click', hidePopup);
    dismissBtn.addEventListener('click', hidePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) hidePopup();
    });

    ctaBtn.addEventListener('click', () => {
        hidePopup();
        // Limpa o carrinho e coloca APENAS a oferta relâmpago
        localStorage.setItem('rosaCart', JSON.stringify([]));
        const kitCard = [...document.querySelectorAll('.product-card')]
            .find(c => c.querySelector('h3')?.textContent.includes('Kit Autocuidado Total'));
        const name  = kitCard?.querySelector('h3')?.textContent.trim() || 'Relâmpago — Kit Autocuidado Total';
        const id    = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
        const img   = kitCard?.querySelector('.img-wrapper img')?.src || 'Images/kit-autocuidado.webp';
        const checkoutUrl = kitCard?.dataset.checkoutUrl || 'https://checkout.exemplo.com/kit-autocuidado-relampago';
        const item  = { id, name, price: 139.96, image: img, checkoutUrl };
        localStorage.setItem('rosaCart', JSON.stringify([{ ...item, qty: 1 }]));
        window.location.href = checkoutUrl;
    });
}


// ========== WELCOME POPUP ==========
function initWelcomePopup() {
    const welcomePopup = document.getElementById('welcomePopup');
    const closeWelcomeBtn = document.getElementById('closeWelcomePopup');
    const welcomeVerProdutosBtn = document.getElementById('welcomeVerProdutos');

    // Verifica se já foi exibido nesta sessão
    if (sessionStorage.getItem('welcomePopupShown')) return;

    if (welcomePopup) {
        // Exibe após 1 segundo
        setTimeout(() => {
            welcomePopup.style.display = 'flex';
            setTimeout(() => {
                welcomePopup.classList.add('show');
                // Marca como exibido
                sessionStorage.setItem('welcomePopupShown', 'true');
            }, 10);
        }, 1000);

        const closePopup = () => {
            welcomePopup.classList.remove('show');
            setTimeout(() => {
                welcomePopup.style.display = 'none';
            }, 400);
        };

        if (closeWelcomeBtn) closeWelcomeBtn.addEventListener('click', closePopup);
        
        if (welcomeVerProdutosBtn) {
            welcomeVerProdutosBtn.addEventListener('click', () => {
                closePopup();
                // Rola suavemente até a seção de produtos
                const grid = document.querySelector('.products-section');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Fecha ao clicar fora do conteúdo
        welcomePopup.addEventListener('click', (e) => {
            if (e.target === welcomePopup) closePopup();
        });
    }
}
