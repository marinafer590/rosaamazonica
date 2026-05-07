const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const topPart = html.substring(0, html.indexOf('<!-- ========== HERO BANNER ========== -->'));
const bottomPartStart = html.indexOf('<!-- ========== FOOTER ========== -->');
const bottomPart = html.substring(bottomPartStart);

const productPage = topPart + `

    <!-- ========== PRODUCT PAGE ========== -->
    <main class="product-page-container">
        <div class="product-breadcrumb">
            <a href="index.html">Início</a> <i class="fas fa-chevron-right"></i> <span id="breadcrumb-title">Produto</span>
        </div>
        
        <div class="product-main-grid">
            <div class="product-image-col">
                <img id="prod-img" src="" alt="Produto Rosa Selvagem">
            </div>
            
            <div class="product-info-col">
                <div class="prod-reviews">
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <span style="font-size: 12px; color: #666; margin-left: 5px;">(44 pessoas viram esse produto agora)</span>
                </div>
                
                <h1 id="prod-title" class="prod-title">Carregando...</h1>
                
                <div class="prod-prices">
                    <span id="prod-old-price" class="prod-old-price"></span>
                    <span class="prod-discount-badge" id="prod-discount-badge" style="display:none;">-50%</span>
                </div>
                <div class="prod-current-price" id="prod-current-price">R$ 0,00</div>
                <div class="prod-installment" id="prod-installment">ou até 12x de R$ 0,00</div>
                
                <button class="prod-payment-forms-btn"><i class="fas fa-plus"></i> formas de pagamento</button>
                
                <div class="prod-pix-box">
                    <i class="fas fa-qrcode"></i>
                    <div class="prod-pix-text">
                        <strong id="prod-pix-price">R$ 0,00</strong> no pix <span class="pix-badge">(5% de desconto)</span>
                        <p>Pague com desconto no PIX</p>
                    </div>
                </div>
                
                <div class="prod-shipping-benefits">
                    <div class="prod-benefit-box">
                        <i class="fas fa-truck-fast"></i>
                        <div>
                            <h4>FRETE EXPRESS</h4>
                            <p>Para sua Região. Receba mais rápido!</p>
                        </div>
                    </div>
                    <div class="prod-benefit-box green-box">
                        <i class="fas fa-gift"></i>
                        <div>
                            <h4>BRINDES</h4>
                            <p>Nas compras acima de R$120 reais, ganhe <strong>Brindes Exclusivos</strong></p>
                        </div>
                    </div>
                </div>
                
                <div class="prod-countdown">
                    <i class="fas fa-stopwatch"></i> Aproveite para ter brindes: <strong id="prod-countdown-timer">00:15:00</strong>
                </div>
                
                <div class="prod-actions">
                    <div class="prod-qty-selector">
                        <button id="prod-qty-minus">-</button>
                        <input type="number" id="prod-qty" value="1" min="1">
                        <button id="prod-qty-plus">+</button>
                    </div>
                    <button class="prod-buy-btn" id="prod-add-cart">COMPRAR AGORA</button>
                </div>
                
                <div class="prod-payment-methods">
                    <div class="payment-icons-row">
                        <i class="fab fa-cc-visa" style="color:#1434CB"></i>
                        <i class="fab fa-cc-mastercard" style="color:#EB001B"></i>
                        <i class="fab fa-cc-amex" style="color:#002663"></i>
                        <i class="fab fa-cc-diners-club" style="color:#0079BE"></i>
                        <i class="fas fa-barcode" style="color:#333"></i>
                        <i class="fas fa-qrcode" style="color:#32BCAD"></i>
                    </div>
                </div>
                
                <div class="prod-description">
                    <p id="prod-desc-text">Um combo pensado para quem quer se cuidar da cabeça aos pés com praticidade e resultado. A linha Rosa Candy limpa, hidrata e auxilia no clareamento da região íntima com conforto e frescor.</p>
                    
                    <h4>Benefícios:</h4>
                    <ul>
                        <li>Rotina completa de cuidado íntimo, corporal e facial.</li>
                        <li>Limpeza suave e hidratação profunda.</li>
                        <li>Clareamento gradual da região íntima e áreas escurecidas.</li>
                    </ul>
                    
                    <h4>Como usar:</h4>
                    <p>1. <strong>Sabonete Íntimo:</strong> Use no banho, aplicando apenas na parte externa da região íntima.</p>
                    <p>2. <strong>Sérum Íntimo:</strong> Aplique após o banho na área externa, massageando até completa absorção.</p>
                </div>
                
                <div class="prod-sticky-btn-container">
                    <button class="prod-sticky-btn" id="prod-sticky-add-cart">
                        <i class="fas fa-shopping-bag"></i> Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
        
        <div class="prod-related-section">
            <h2>Você pode gostar</h2>
            <div class="products-grid" id="related-products-grid">
                <!-- Related products generated dynamically -->
            </div>
        </div>
    </main>

` + bottomPart.replace('</body>', '<script src="JS/produto.js"></script></body>');

fs.writeFileSync('produto.html', productPage);
console.log('produto.html created.');
