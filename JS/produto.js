if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// ── Dados completos por produto ──────────────────────────────────────────────
const PRODUTO_DATA = {
  'kit-mc-mirella---clareador-de-ppk-+-': {
    descricao: 'Kit completo com Clareador de PPK + Água Micelar Mc Mirella. Desenvolvido para clarear a região íntima com eficiência e ao mesmo tempo manter a pele limpa, hidratada e sem resíduos. Fórmula suave, testada dermatologicamente.',
    beneficios: ['Clareamento gradual da região íntima', 'Limpeza profunda sem agredir o pH natural', 'Hidratação e conforto diário', 'Sem parabenos e fragrâncias agressivas'],
    comoUsar: ['<strong>Clareador de PPK:</strong> Aplique na região íntima após o banho, massageie até absorção e aguarde secar.', '<strong>Água Micelar:</strong> Aplique no algodão e limpe o rosto ou a região íntima para remover impurezas sem enxaguar.']
  },
  'kit-mc-mirella---clareador-de-ppk-+-n': {
    descricao: 'A combinação perfeita de Clareador de PPK com Niacinamida 10%. A niacinamida age diretamente na hiperpigmentação, reduzindo manchas e uniformizando o tom da pele íntima com resultados visíveis em poucos dias.',
    beneficios: ['Redução de manchas escuras e hiperpigmentação', 'Uniformização do tom da pele íntima', 'Ação anti-inflamatória e calmante', 'Pele mais suave, clara e uniforme'],
    comoUsar: ['<strong>Clareador de PPK:</strong> Aplique na região íntima após o banho e massageie até absorção completa.', '<strong>Niacinamida 10%:</strong> Aplique sobre a pele limpa e seca pela manhã e/ou à noite.']
  },
  'rosa-selvagem---sérum-candy-clareador': {
    descricao: 'O Sérum Candy Clareador Íntimo age profundamente na pele para reduzir manchas escuras e hiperpigmentação em áreas como virilha, axilas e coxas. Fórmula concentrada para resultados rápidos e duradouros.',
    beneficios: ['Clareamento progressivo de manchas', 'Textura leve de rápida absorção', 'Suaviza e uniformiza o tom da pele', 'Sem irritações, testado dermatologicamente'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o sérum na região desejada após o banho. Massageie suavemente até absorção completa. Use diariamente para melhores resultados.']
  },
  'kit-rosa-candy-clareador-íntimo': {
    descricao: 'Kit completo para o cuidado e clareamento íntimo da linha Rosa Candy. Produtos formulados especialmente para a pele da região íntima, garantindo limpeza, hidratação e clareamento com segurança e eficácia.',
    beneficios: ['Rotina completa de cuidado íntimo', 'Clareamento visível em poucas semanas', 'pH balanceado e fórmula suave', 'Testado ginecologicamente'],
    comoUsar: ['<strong>Sabonete:</strong> Use no banho, aplicando apenas na parte externa da região íntima.', '<strong>Sérum/Clareador:</strong> Aplique após o banho na área externa, massageando até completa absorção.']
  },
  'relâmpago---kit-mc-mirella---clareado': {
    descricao: 'Oferta Relâmpago do Kit Mc Mirella Clareador de PPK! Aproveite essa oportunidade única para ter o kit mais vendido da Rosa Selvagem com desconto exclusivo por tempo limitado. Estoque reduzido!',
    beneficios: ['Clareamento acelerado da região íntima', 'Kit com maior custo-benefício', 'Resultados visíveis em 7 dias de uso', 'Fórmula dermatologicamente testada'],
    comoUsar: ['<strong>Clareador de PPK:</strong> Aplique na região íntima após o banho, massageie até absorção e aguarde secar naturalmente.']
  },
  'kit-rosa-candy:-sérum-clareador-íntim': {
    descricao: 'Duo poderoso para o clareamento e hidratação da pele íntima. O Sérum Clareador age nas manchas enquanto o Óleo Clareador nutre profundamente, formando uma barreira protetora que hidrata e suaviza a pele.',
    beneficios: ['Dupla ação: clareamento + hidratação', 'Redução de manchas e escurecimento', 'Pele mais macia e uniforme', 'Uso contínuo para resultados duradouros'],
    comoUsar: ['<strong>Sérum Clareador:</strong> Aplique após o banho na região íntima e massageie.', '<strong>Óleo Clareador:</strong> Use em seguida ou à noite para potencializar a hidratação e o clareamento.']
  },
  'clareador-de-ppk': {
    descricao: 'O Clareador de PPK Rosa Selvagem é o produto campeão de vendas para quem deseja clarear a região íntima com segurança. Fórmula exclusiva com ativos clareadores que agem diretamente nas manchas causadas por atrito, depilação e hiperpigmentação.',
    beneficios: ['Clareamento intenso da região íntima', 'Reduz marcas de atrito e depilação', 'Suaviza e uniformiza a pele', 'Resultados visíveis em até 2 semanas'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o clareador na região íntima após o banho. Massageie suavemente até absorção. Evite contato com mucosas internas. Use diariamente.']
  },
  'kit-verão---clareador-de-ppk-+-ilumina': {
    descricao: 'Kit perfeito para o verão! Combine o Clareador de PPK com o Iluminador Gold para uma pele íntima mais clara, brilhante e radiante. Ideal para quem quer se sentir confiante na praia ou na piscina.',
    beneficios: ['Clareamento + iluminação dourada', 'Pele pronta para o verão', 'Fórmula hidratante e leve', 'Efeito glow natural e radiante'],
    comoUsar: ['<strong>Clareador:</strong> Aplique após o banho na região íntima e massageie até absorção.', '<strong>Iluminador Gold:</strong> Aplique no corpo para um brilho dourado e sofisticado.']
  },
  'trio-clímax': {
    descricao: 'O Trio Clímax é o kit definitivo para o cuidado íntimo completo. Com três produtos selecionados para trabalhar em sinergia, oferece limpeza, clareamento e hidratação profunda em uma única rotina prática e eficaz.',
    beneficios: ['Trio completo de cuidado íntimo', 'Sinergia entre os produtos', 'Rotina simplificada e eficaz', 'Alta eficácia em clareamento e hidratação'],
    comoUsar: ['Use os três produtos em conjunto para máxima eficácia. Sabonete no banho, sérum e clareador após o banho na região íntima.']
  },
  'total-candy': {
    descricao: 'O Total Candy reúne tudo que você precisa para uma rotina completa de autocuidado íntimo. Desenvolvido com ingredientes premium para quem não abre mão de qualidade e resultados reais no dia a dia.',
    beneficios: ['Cuidado íntimo completo', 'Ingredientes premium selecionados', 'Resultado progressivo e duradouro', 'Rotina completa em um único kit'],
    comoUsar: ['Utilize os produtos na ordem indicada: primeiro o sabonete para limpeza, depois o sérum para tratar e o hidratante para selar a hidratação.']
  },
  'sérum-candy-clareador-íntimo---2-unids': {
    descricao: 'Garanta 2 unidades do Sérum Candy Clareador Íntimo com economia! Com tratamento contínuo de pelo menos 60 dias, os resultados de clareamento são muito mais expressivos e duradouros.',
    beneficios: ['Tratamento completo de 60 dias', 'Economia no kit duplo', 'Clareamento progressivo e uniforme', 'Pele íntima mais suave e clara'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o sérum na região desejada após o banho. Massageie até absorção. Use diariamente por pelo menos 60 dias para resultados intensos.']
  },
  'kit-rosa-candy-clareamento-íntimo---co': {
    descricao: 'A melhor oferta da Rosa Selvagem! Compre 3 e leve 5 produtos do Kit Rosa Candy Clareamento Íntimo. Aproveite para estocar seus favoritos com a melhor economia do site. Ideal para quem já conhece e ama a marca.',
    beneficios: ['Maior custo-benefício do site', 'Estoque por mais tempo', 'Resultado de longo prazo garantido', 'Presente ideal para amigas'],
    comoUsar: ['Use os produtos diariamente conforme indicação de cada item. Distribua entre sua rotina matinal e noturna para máximos resultados.']
  },
  'sabonete-íntimo-rosa-candy-+-óleo-clar': {
    descricao: 'A combinação de Sabonete Íntimo Rosa Candy com o Óleo Clareador oferece limpeza delicada e ação clareadora em uma única etapa. Fórmula suave que respeita o pH da região íntima e nutre profundamente.',
    beneficios: ['Limpeza + clareamento em um só kit', 'pH equilibrado e fórmula suave', 'Hidratação profunda com óleo', 'Sem sulfatos e parabenos agressivos'],
    comoUsar: ['<strong>Sabonete:</strong> Use no banho na parte externa da região íntima.', '<strong>Óleo Clareador:</strong> Aplique após o banho na pele seca e massageie suavemente.']
  },
  'kit-autocuidado-+-girl-blush-e-desodar': {
    descricao: 'Kit completo de autocuidado que vai além do cuidado íntimo! Inclui o girl blush para o rosto e o Desodorante de Frutas Vermelhas para o corpo inteiro. Tudo que você precisa para se sentir bem da cabeça aos pés.',
    beneficios: ['Autocuidado completo: rosto, corpo e íntima', 'Desodorante de frutas vermelhas refrescante', 'Girl blush para o dia a dia', 'Kit presenteável e completo'],
    comoUsar: ['<strong>Sabonete Íntimo:</strong> Use no banho.', '<strong>Girl Blush:</strong> Aplique no rosto para um toque rosado natural.', '<strong>Desodorante:</strong> Aplique nas axilas após o banho.']
  },
  'rosa-selvagem---sabonete-íntimo-rosa-c': {
    descricao: 'O Sabonete Íntimo Rosa Candy é desenvolvido especialmente para a pele delicada da região íntima. Sua fórmula suave limpa sem ressecar, mantém o pH equilibrado e proporciona sensação de frescor e conforto durante todo o dia.',
    beneficios: ['Limpeza suave e eficaz', 'Equilíbrio do pH íntimo', 'Sem parabenos e sem perfume agressivo', 'Frescor e conforto duradouros'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o sabonete apenas na parte externa da região íntima durante o banho. Enxagúe completamente. Uso diário.']
  },
  'sabonete-íntimo-rosa-candy---2-unids.': {
    descricao: 'Garanta 2 unidades do Sabonete Íntimo Rosa Candy com economia! Para melhores resultados, recomendamos uso contínuo de pelo menos 60 dias. Com o kit duplo você economiza e nunca fica sem seu favorito.',
    beneficios: ['Kit para 60 dias de uso contínuo', 'Economia garantida no kit duplo', 'Limpa sem agredir a mucosa', 'pH equilibrado e fórmula testada'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique apenas na parte externa da região íntima durante o banho. Enxagúe completamente.']
  },
  'sérum-candy-clareador-íntimo---3-unids': {
    descricao: 'Kit com 3 unidades do Sérum Candy Clareador Íntimo para um tratamento completo e econômico. Com 90 dias de tratamento contínuo, os resultados de clareamento são transformadores e duradouros.',
    beneficios: ['Tratamento de 90 dias completo', 'Maior economia e custo-benefício', 'Clareamento intensivo e progressivo', 'Resultados transformadores e duradouros'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o sérum na região desejada após o banho. Massageie até absorção. Use diariamente por 90 dias para máximos resultados.']
  },
  'rosa-candy-hidratante-3-em-1': {
    descricao: 'O Hidratante Rosa Candy 3 em 1 combina hidratação, clareamento e proteção em uma fórmula única. Age como hidratante corporal, clareador íntimo e protetor da pele ao mesmo tempo, simplificando sua rotina.',
    beneficios: ['3 ações em 1 produto', 'Hidratação profunda e duradoura', 'Clareamento gradual da pele', 'Proteção da barreira cutânea'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique o hidratante no corpo todo ou na região íntima após o banho. Massageie até absorção completa. Pode ser usado de manhã e à noite.']
  },
  'sabonete-íntimo-rosa-candy---3-unids.': {
    descricao: 'Kit com 3 unidades do amado Sabonete Íntimo Rosa Candy para um tratamento completo de 90 dias. Ideal para quem já faz parte da família Rosa Selvagem e não quer ficar sem o produto favorito.',
    beneficios: ['90 dias de uso garantido', 'Maior custo-benefício disponível', 'Limpeza suave e diária', 'pH equilibrado para uso prolongado'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique apenas na parte externa da região íntima durante o banho. Enxagúe completamente.']
  },
  'kit-da-mirella-+-feromônio': {
    descricao: 'O Kit da Mirella com Feromônio combina o poder do clareamento íntimo com a sedução irresistível do Feromônio. Uma combinação exclusiva para você se sentir confiante, atraente e cuidada ao mesmo tempo.',
    beneficios: ['Clareamento + atração irresistível', 'Feromônio de longa duração', 'Fórmula exclusiva Mc Mirella', 'Confiança e sensualidade no dia a dia'],
    comoUsar: ['<strong>Clareador PPK:</strong> Aplique após o banho na região íntima.', '<strong>Feromônio:</strong> Aplique no pulso, pescoço e atrás das orelhas para máximo efeito.']
  },
  'kit-rosa-candy-a-dois': {
    descricao: 'O Kit Rosa Candy a Dois é perfeito para casais que querem cuidar da intimidade juntos. Um presente especial ou uma experiência compartilhada de autocuidado e bem-estar íntimo para os dois.',
    beneficios: ['Ideal para casais e presente especial', 'Cuidado íntimo compartilhado', 'Kit completo para os dois', 'Embalagem presenteável'],
    comoUsar: ['Use os produtos em conjunto para uma experiência de autocuidado compartilhada. Sabonete no banho e sérum/clareador após o banho na região íntima.']
  },
  'rosa-candy:-molhadinho-–-gel-lubrifican': {
    descricao: 'O Gel Lubrificante Deslizante Reparador Rosa Candy oferece lubrificação natural, conforto e hidratação íntima. Fórmula reparadora que cuida da mucosa íntima, reduz o ressecamento e proporciona maior conforto.',
    beneficios: ['Lubrificação natural e eficaz', 'Ação reparadora e hidratante', 'Reduz desconforto e ressecamento', 'Fórmula sem hormônios'],
    comoUsar: ['<strong>Modo de uso:</strong> Aplique a quantidade necessária na região íntima conforme necessário. Compatível com preservativos de látex.']
  },
  'relâmpago---kit-autocuidado-total': {
    descricao: 'Oferta Relâmpago do Kit Autocuidado Total Rosa Selvagem! A rotina completa de cuidado com corpo, rosto e região íntima em um único kit com desconto exclusivo por tempo limitado. Não perca essa chance!',
    beneficios: ['Autocuidado completo corpo + íntima', 'Oferta exclusiva por tempo limitado', 'Melhor custo-benefício da loja', 'Kit premium Rosa Selvagem'],
    comoUsar: ['Use os produtos em sua rotina diária: sabonete íntimo no banho, blush/desodorante após o banho e sérum/clareador na pele seca da região íntima.']
  },
  'relâmpago---kit-rosa-candy:-sérum-clar': {
    descricao: 'Aproveite a oferta Relâmpago do Kit Rosa Candy com Sérum Clareador Íntimo + Óleo Clareador. Dois produtos que se complementam para um resultado de clareamento mais rápido e hidratação profunda.',
    beneficios: ['Oferta relâmpago por tempo limitado', 'Clareamento + hidratação intensa', 'Duo perfeito e complementar', 'Resultados visíveis em até 7 dias'],
    comoUsar: ['<strong>Sérum:</strong> Aplique após o banho na região íntima.', '<strong>Óleo Clareador:</strong> Use a seguir ou à noite para potencializar hidratação e clareamento.']
  }
};

// ── Fallback genérico por tipo ────────────────────────────────────────────────
function getProductData(name, id) {
  const lowerName = name.toLowerCase();

  // Try exact match first
  if (PRODUTO_DATA[id]) return PRODUTO_DATA[id];

  // Try partial key match
  const matchedKey = Object.keys(PRODUTO_DATA).find(k => id.startsWith(k.slice(0, 15)));
  if (matchedKey) return PRODUTO_DATA[matchedKey];

  // Generic fallbacks
  if (lowerName.includes('kit')) {
    return {
      descricao: 'Um combo completo pensado para quem quer se cuidar da cabeça aos pés com praticidade e resultado. A linha Rosa Candy limpa, hidrata e auxilia no clareamento da região íntima com conforto e frescor.',
      beneficios: ['Rotina completa de cuidado íntimo', 'Clareamento gradual e uniforme', 'Hidratação profunda e suave', 'Fórmula testada dermatologicamente'],
      comoUsar: ['<strong>Sabonete Íntimo:</strong> Use no banho na parte externa da região íntima.', '<strong>Sérum/Clareador:</strong> Aplique após o banho e massageie até absorção completa.']
    };
  }
  if (lowerName.includes('sérum') || lowerName.includes('serum')) {
    return {
      descricao: 'O Sérum Rosa Candy hidrata profundamente, melhora a textura e aparência da pele íntima, e auxilia no clareamento de manchas e áreas escurecidas com fórmula de rápida absorção.',
      beneficios: ['Clareamento progressivo de manchas', 'Textura leve de rápida absorção', 'Suaviza e uniformiza o tom da pele', 'Uso diário, sem irritações'],
      comoUsar: ['<strong>Modo de uso:</strong> Aplique o sérum na região desejada após o banho e massageie suavemente até absorção completa.']
    };
  }
  if (lowerName.includes('sabonete')) {
    return {
      descricao: 'O Sabonete Íntimo Rosa Candy limpa delicadamente, ajuda a equilibrar o pH natural da região íntima e proporciona sensação de limpeza e frescor o dia todo.',
      beneficios: ['Limpeza suave e eficaz', 'Equilíbrio do pH íntimo', 'Frescor e conforto duradouros', 'Sem parabenos'],
      comoUsar: ['<strong>Modo de uso:</strong> Aplique apenas na parte externa da região íntima durante o banho e enxagúe completamente.']
    };
  }
  return {
    descricao: 'Produto de cuidado íntimo da linha Rosa Candy. Desenvolvido com ingredientes selecionados para proporcionar limpeza, hidratação e clareamento com segurança e eficácia comprovada.',
    beneficios: ['Cuidado íntimo completo', 'Fórmula suave e eficaz', 'Resultados progressivos', 'Testado dermatologicamente'],
    comoUsar: ['<strong>Modo de uso:</strong> Siga as instruções de uso indicadas na embalagem do produto.']
  };
}

// ── Formatador de moeda ───────────────────────────────────────────────────────
const fmt = (val) => 'R$ ' + val.toFixed(2).replace('.', ',');

// ── Contador de visitantes dinâmico ──────────────────────────────────────────
function initVisitorCounter() {
  const el = document.getElementById('prod-visitor-count');
  if (!el) return;
  const update = () => {
    el.textContent = Math.floor(3 + Math.random() * 7);
  };
  update();
  setInterval(update, 8000 + Math.random() * 6000);
}

// ── Contador de estoque urgência ─────────────────────────────────────────────
function initStockUrgency() {
  const el = document.getElementById('prod-stock-qty');
  const fill = document.querySelector('.stock-progress-fill-pink');
  if (el) {
    const qty = Math.floor(38 + Math.random() * 12);
    el.textContent = qty;
    if (fill) {
      const percent = Math.min(95, Math.max(10, (qty / 55) * 100));
      fill.style.width = percent + '%';
    }
  }
}

// ── Renderiza a página com os dados do produto ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const productJSON = localStorage.getItem('currentRosaProduct');
  if (!productJSON) {
    window.location.href = 'index.html';
    return;
  }

  const product = JSON.parse(productJSON);
  const data    = getProductData(product.name, product.id);

  // Meta
  document.title = product.name + ' | Rosa Selvagem Brasil';
  document.getElementById('breadcrumb-title').textContent = product.name;

  // Imagem
  document.getElementById('prod-img').src = product.image;

  // Thumbnails (mesma imagem 3x)
  document.querySelectorAll('.prod-thumb').forEach(t => {
    t.src = product.image;
    t.addEventListener('click', () => {
      document.getElementById('prod-img').src = product.image;
    });
  });

  // Título
  document.getElementById('prod-title').textContent = product.name;

  // Preço original + badge de desconto
  const oldPriceEl = document.getElementById('prod-old-price');
  const badgeEl    = document.getElementById('prod-discount-badge');

  if (product.originalPrice && product.originalPrice.trim() !== '') {
    oldPriceEl.textContent = product.originalPrice;
    const oldVal = parseFloat(product.originalPrice.replace('R$','').replace(/\./g,'').replace(',','.').trim());
    if (oldVal > product.price) {
      const pct = Math.round((1 - product.price / oldVal) * 100);
      badgeEl.textContent     = `-${pct}%`;
      badgeEl.style.display   = 'inline-block';
    }
  } else {
    oldPriceEl.style.display = 'none';
    badgeEl.style.display    = 'none';
  }

  // Preço atual
  document.getElementById('prod-current-price').textContent = fmt(product.price);

  // Parcelas — 6x sem juros
  const parcela = product.price / 6;
  document.getElementById('prod-installment').textContent = `ou até 6x de ${fmt(parcela)} sem juros`;

  // PIX — 5% de desconto + economia em reais
  const pixVal  = product.price * 0.95;
  const savings = product.price - pixVal;
  const pixPriceEl = document.getElementById('prod-pix-price');
  if (pixPriceEl) pixPriceEl.textContent = fmt(pixVal);
  const savingsEl = document.getElementById('prod-pix-savings');
  if (savingsEl) savingsEl.textContent = fmt(savings);

  // Descrição do produto
  const descEl = document.getElementById('prod-desc-text');
  if (descEl) descEl.textContent = data.descricao;

  // Benefícios
  const benefEl = document.getElementById('prod-benefits-list');
  if (benefEl) {
    benefEl.innerHTML = data.beneficios.map(b => `<li>${b}</li>`).join('');
  }

  // Como usar
  const usoEl = document.getElementById('prod-uso-list');
  if (usoEl) {
    usoEl.innerHTML = data.comoUsar.map((u, i) => `<p>${i + 1}. ${u}</p>`).join('');
  }

  // Contadores dinâmicos
  initVisitorCounter();
  initStockUrgency();

  // Seletor de quantidade
  const qtyInput = document.getElementById('prod-qty');
  const qtyValDisplay = document.getElementById('prod-qty-val');
  
  const updateQty = (val) => {
    qtyInput.value = val;
    if (qtyValDisplay) qtyValDisplay.textContent = val;
  };

  document.getElementById('prod-qty-minus').addEventListener('click', () => {
    let v = parseInt(qtyInput.value) || 1;
    if (v > 1) updateQty(v - 1);
  });
  document.getElementById('prod-qty-plus').addEventListener('click', () => {
    let v = parseInt(qtyInput.value) || 1;
    updateQty(v + 1);
  });

  // Adicionar ao carrinho
  const handleAdd = () => {
    if (window.rosaAddToCart) {
      const qty = parseInt(qtyInput.value) || 1;
      window.rosaAddToCart(product, qty);
    }
  };

  // Comprar agora → adiciona ao cart e vai direto para checkout
  const handleBuy = () => {
    if (window.rosaAddToCart) {
      const qty = parseInt(qtyInput.value) || 1;
      window.rosaAddToCart(product, qty);
      
      // Busca o carrinho atualizado para pegar o link do primeiro item
      const currentCart = JSON.parse(localStorage.getItem('rosaCart') || '[]');
      if (currentCart.length > 0) {
        window.location.href = currentCart[0].checkoutUrl || product.checkoutUrl || 'index.html';
      } else {
        window.location.href = product.checkoutUrl || 'index.html';
      }
    } else {
      window.location.href = product.checkoutUrl || 'index.html';
    }
  };

  document.getElementById('prod-add-cart').addEventListener('click', handleAdd);
  document.getElementById('prod-buy-btn').addEventListener('click', handleBuy);

  const stickyAdd = document.getElementById('prod-sticky-add-cart');
  const stickyBuy = document.getElementById('prod-sticky-buy-btn');
  if (stickyAdd) stickyAdd.addEventListener('click', handleAdd);
  if (stickyBuy) stickyBuy.addEventListener('click', handleBuy);

  // Sticky bar ao rolar
  const stickyBar = document.querySelector('.prod-sticky-bar');
  const mainActions = document.querySelector('.prod-actions-centered');
  if (stickyBar && mainActions) {
    window.addEventListener('scroll', () => {
      const rect = mainActions.getBoundingClientRect();
      stickyBar.classList.toggle('visible', rect.bottom < 0);
    });
  }

  // Countdown timer — 15 min
  let secondsLeft = 15 * 60;
  const timerEl = document.getElementById('prod-countdown-timer');
  setInterval(() => {
    if (secondsLeft > 0) secondsLeft--;
    const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const s = String(secondsLeft % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);

  // Produtos relacionados
  loadRelatedProducts(product.id);
});

// ── Produtos relacionados (busca do index.html) ───────────────────────────────
function loadRelatedProducts(currentId) {
  fetch('index.html')
    .then(r => r.text())
    .then(html => {
      const doc      = new DOMParser().parseFromString(html, 'text/html');
      const allCards = Array.from(doc.querySelectorAll('.product-card:not(.esgotado)'));
      const filtered = allCards.filter(card => {
        const name = card.querySelector('h3')?.textContent.trim() || '';
        return name.toLowerCase().replace(/\s+/g, '-').slice(0, 40) !== currentId;
      });
      const selected = filtered.sort(() => .5 - Math.random()).slice(0, 4);
      const grid     = document.getElementById('related-products-grid');
      grid.innerHTML = '';

      selected.forEach(card => {
        card.style.opacity   = '1';
        card.style.transform = 'none';

        // Clique no card → navega para a página do produto
        card.addEventListener('click', e => {
          if (e.target.closest('.add-to-cart-btn')) {
            e.stopPropagation();
            const name  = card.querySelector('h3')?.textContent.trim() || '';
            const id    = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
            const img   = card.querySelector('.img-wrapper img')?.src || '';
            const price = parseFloat((card.querySelector('.price-current')?.textContent || '0').replace('R$','').replace(/\./g,'').replace(',','.').trim()) || 0;
            const checkoutUrl = card.dataset.checkoutUrl || '';
            if (window.rosaAddToCart) window.rosaAddToCart({ id, name, price, image: img, checkoutUrl }, 1);
            return;
          }
          const name      = card.querySelector('h3')?.textContent.trim() || '';
          const id        = name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
          const img       = card.querySelector('.img-wrapper img')?.src || '';
          const price     = parseFloat((card.querySelector('.price-current')?.textContent || '0').replace('R$','').replace(/\./g,'').replace(',','.').trim()) || 0;
          const origPrice = card.querySelector('.price-original')?.textContent || '';
          const checkoutUrl = card.dataset.checkoutUrl || '';
          localStorage.setItem('currentRosaProduct', JSON.stringify({ id, name, price, image: img, originalPrice: origPrice, checkoutUrl }));
          window.location.href = 'produto.html';
        });
        card.style.cursor = 'pointer';
        grid.appendChild(card);
      });
    })
    .catch(err => console.error('Erro ao carregar produtos relacionados:', err));
}
