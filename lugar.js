// Obter slug da URL (ex: lugar.html?slug=burger-point)
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Elementos DOM
const loadingState = document.getElementById('loadingState');
const placeHeader = document.getElementById('placeHeader');
const reviewContent = document.getElementById('reviewContent');

// Carregar dados
async function loadPlaceAndReview() {
    if (!slug) {
        showError('Lugar não especificado');
        return;
    }

    try {
        // Carregar dados do lugar
        const dataResponse = await fetch('data.json');
        const data = await dataResponse.json();

        const place = data.places.find(p => p.reviewSlug === slug);

        if (!place) {
            showError('Lugar não encontrado');
            return;
        }

        // Carregar review
        const reviewResponse = await fetch(`reviews/${slug}.json`);
        const review = await reviewResponse.json();

        // Renderizar
        renderPlaceHeader(place, data.categories);
        renderReview(review);

        // Atualizar título da página
        document.title = `${place.name} - Guia da Mesa`;

        // Mostrar conteúdo
        loadingState.style.display = 'none';
        placeHeader.style.display = 'block';
        reviewContent.style.display = 'block';

    } catch (error) {
        console.error('Erro ao carregar:', error);
        showError('Erro ao carregar os dados do lugar');
    }
}

function renderPlaceHeader(place, categories) {
    const category = categories.find(c => c.id === place.category);

    placeHeader.innerHTML = `
        <div class="place-header__top">
            <img
                src="${place.logo}"
                alt="${place.name}"
                class="place-header__logo"
                onerror="this.src='https://placehold.co/120x120/DEE2E6/6C757D?text=${encodeURIComponent(place.name.substring(0, 2))}'"
            >
            <div class="place-header__info">
                <h1 class="place-header__name">${place.name}</h1>
                <span class="place-header__category">${category?.emoji || ''} ${category?.name || place.category}</span>

                <div class="place-header__actions">
                    <a
                        href="https://wa.me/${place.whatsapp}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn--whatsapp"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                    </a>
                    ${place.instagram ? `
                        <a
                            href="https://instagram.com/${place.instagram}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn--instagram"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Instagram
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderReview(review) {
    const visitDate = new Date(review.visitDate).toLocaleDateString('pt-BR');
    const publishDate = new Date(review.publishDate).toLocaleDateString('pt-BR');

    reviewContent.innerHTML = `
        <!-- Review Header -->
        <div class="review-header">
            <span class="review-header__badge">⭐ Review Editorial</span>
            <div class="review-header__dates">
                <span>📅 Visitado em ${visitDate}</span>
                <span>📝 Publicado em ${publishDate}</span>
            </div>
        </div>

        <!-- Summary -->
        <div class="review-summary">
            ${review.review.summary}
        </div>

        <!-- Ratings -->
        <div class="review-ratings">
            <h2 class="review-ratings__title">Avaliação</h2>
            ${renderRatings(review.review.ratings)}
        </div>

        <!-- Full Text -->
        <div class="review-full-text">
            <h2 class="review-full-text__title">Review Completa</h2>
            <div class="review-full-text__content">
                ${review.review.fullText.split('\n\n').map(p => `<p>${p}</p>`).join('')}
            </div>
        </div>

        <!-- Highlights -->
        ${review.review.highlights && review.review.highlights.length > 0 ? `
            <div class="review-highlights">
                <h3 class="review-highlights__title">Destaques</h3>
                <ul class="review-highlights__list">
                    ${review.review.highlights.map(h => `<li class="review-highlights__item">${h}</li>`).join('')}
                </ul>
            </div>
        ` : ''}

        <!-- Dish Recommendations -->
        ${review.review.dishRecommendations && review.review.dishRecommendations.length > 0 ? `
            <div class="review-dishes">
                <h2 class="review-dishes__title">Pratos Recomendados</h2>
                ${review.review.dishRecommendations.map(dish => `
                    <div class="dish-card">
                        <div class="dish-card__header">
                            <span class="dish-card__name">${dish.name}</span>
                            <span class="dish-card__price">${dish.price}</span>
                        </div>
                        <p class="dish-card__note">${dish.note}</p>
                    </div>
                `).join('')}
            </div>
        ` : ''}

        <!-- Awards/Selos -->
        ${review.awards && review.awards.length > 0 ? `
            <div class="awards-section">
                <h2 class="awards-section__title">Selos e Reconhecimentos</h2>
                <div class="awards-grid">
                    ${review.awards.map(award => `
                        <div class="award-card">
                            <div class="award-card__emoji">${award.emoji}</div>
                            <div class="award-card__content">
                                <h3 class="award-card__name">${award.name}</h3>
                                <p class="award-card__reason">${award.reason}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <!-- Rankings -->
        ${review.rankings && review.rankings.length > 0 ? `
            <div class="rankings-section">
                <h2 class="rankings-section__title">Aparece nos Rankings</h2>
                ${review.rankings.map(rank => `
                    <a href="ranking.html?id=${rank.listId}" class="ranking-link">
                        🏆 #${rank.position} em ${getRankingName(rank.listId, rank.year)}
                    </a>
                `).join('')}
            </div>
        ` : ''}

        <!-- Additional Info -->
        <div style="margin-top: var(--spacing-lg);">
            ${review.review.priceRange ? `<span class="info-box">💰 ${getPriceRangeText(review.review.priceRange)}</span>` : ''}
            ${review.review.bestFor ? review.review.bestFor.map(tag => `<span class="info-box">${tag}</span>`).join('') : ''}
        </div>

        <!-- Curator Note -->
        ${review.curatorNote ? `
            <div class="curator-note">
                <div class="curator-note__title">Nota do Curador</div>
                <p class="curator-note__text">${review.curatorNote}</p>
            </div>
        ` : ''}
    `;
}

function renderRatings(ratings) {
    const labels = {
        food: 'Comida',
        service: 'Atendimento',
        ambiance: 'Ambiente',
        value: 'Custo-benefício'
    };

    return Object.entries(ratings).map(([key, value]) => `
        <div class="rating-item">
            <span class="rating-item__label">${labels[key]}</span>
            <div class="rating-item__bar">
                <div class="rating-item__fill" style="width: ${(value / 5) * 100}%"></div>
            </div>
            <span class="rating-item__value">${value.toFixed(1)}</span>
        </div>
    `).join('');
}

function getPriceRangeText(range) {
    const texts = {
        '$': 'Econômico',
        '$$': 'Preço Médio',
        '$$$': 'Preço Alto'
    };
    return texts[range] || range;
}

function getRankingName(listId, year) {
    const names = {
        'top-10-lanches-2026': 'Top 10 Lanches 2026',
        'melhores-pizza-2026': 'Melhores Pizzas 2026',
        'custo-beneficio-2026': 'Melhores Custo-Benefício 2026'
    };
    return names[listId] || listId;
}

function showError(message) {
    loadingState.innerHTML = `
        <p style="color: var(--color-text);">${message}</p>
        <a href="index.html" class="btn btn--whatsapp" style="margin-top: var(--spacing-md); display: inline-block;">
            Voltar para o catálogo
        </a>
    `;
}

// Inicializar
loadPlaceAndReview();
