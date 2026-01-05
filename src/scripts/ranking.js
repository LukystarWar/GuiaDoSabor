// Obter ID do ranking da URL
const urlParams = new URLSearchParams(window.location.search);
const rankingId = urlParams.get('id');

// Elementos DOM
const loadingState = document.getElementById('loadingState');
const rankingHeader = document.getElementById('rankingHeader');
const rankingContent = document.getElementById('rankingContent');

// Carregar ranking
async function loadRanking() {
    if (!rankingId) {
        showError('Ranking não especificado');
        return;
    }

    try {
        // Carregar dados do ranking
        const rankingResponse = await fetch(`data/rankings/${rankingId}.json`);
        const ranking = await rankingResponse.json();

        // Carregar dados dos lugares
        const dataResponse = await fetch('data/data.json');
        const data = await dataResponse.json();

        // Carregar informações do índice
        const indexResponse = await fetch('data/rankings/index.json');
        const indexData = await indexResponse.json();
        const rankingInfo = indexData.rankings.find(r => r.id === rankingId);

        // Renderizar
        renderRankingHeader(ranking, rankingInfo);
        renderRankingContent(ranking, data);

        // Atualizar título
        document.title = `${ranking.title} - Guia da Mesa`;

        // Mostrar conteúdo
        loadingState.style.display = 'none';
        rankingHeader.style.display = 'block';
        rankingContent.style.display = 'block';

    } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        showError('Erro ao carregar o ranking');
    }
}

function renderRankingHeader(ranking, rankingInfo) {
    const publishDate = new Date(ranking.publishDate).toLocaleDateString('pt-BR');

    rankingHeader.innerHTML = `
        <div class="ranking-header__emoji">${rankingInfo?.coverEmoji || '🏆'}</div>
        <h1 class="ranking-header__title">${ranking.title}</h1>
        <p class="ranking-header__description">${ranking.description}</p>
        <div class="ranking-header__meta">
            <span>📅 Publicado em ${publishDate}</span>
            <span>📍 ${ranking.places.length} lugares</span>
            ${ranking.year ? `<span>📆 Ano: ${ranking.year}</span>` : ''}
        </div>
    `;
}

async function renderRankingContent(ranking, data) {
    // Carregar reviews para pegar awards
    const placesWithReviews = await Promise.all(
        ranking.places.map(async (rankingPlace) => {
            const place = data.places.find(p => p.id === rankingPlace.placeId);
            if (!place) return null;

            let awards = [];
            if (place.hasReview) {
                try {
                    const reviewResponse = await fetch(`data/reviews/${place.reviewSlug}.json`);
                    const review = await reviewResponse.json();
                    awards = review.awards || [];
                } catch (error) {
                    console.warn(`Review não encontrada para ${place.name}`);
                }
            }

            return {
                ...rankingPlace,
                place,
                awards
            };
        })
    );

    const validPlaces = placesWithReviews.filter(p => p !== null);
    const category = data.categories.find(c => c.id === ranking.category);

    rankingContent.innerHTML = `
        <ul class="ranking-list">
            ${validPlaces.map(item => {
                const categoryName = data.categories.find(c => c.id === item.place.category)?.name || item.place.category;
                const isTop3 = item.position <= 3;

                return `
                    <li>
                        <a href="${item.place.hasReview ? `lugar.html?slug=${item.place.reviewSlug}` : '#'}" class="ranking-item">
                            <div class="ranking-item__position ${isTop3 ? 'ranking-item__position--top3' : ''}">
                                #${item.position}
                            </div>
                            <img
                                src="public/${item.place.logo}"
                                alt="${item.place.name}"
                                class="ranking-item__logo"
                                onerror="this.src='https://placehold.co/72x72/DEE2E6/6C757D?text=${encodeURIComponent(item.place.name.substring(0, 2))}'"
                            >
                            <div class="ranking-item__content">
                                <h3 class="ranking-item__name">${item.place.name}</h3>
                                <span class="ranking-item__category">${categoryName}</span>
                                <p class="ranking-item__reason">${item.reason}</p>
                                ${item.awards.length > 0 ? `
                                    <div class="ranking-item__awards">
                                        ${item.awards.map(award => `
                                            <span class="award-badge" title="${award.name}">${award.emoji}</span>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </a>
                    </li>
                `;
            }).join('')}
        </ul>

        ${ranking.methodology ? `
            <div class="methodology-section">
                <h3 class="methodology-section__title">📋 Metodologia</h3>
                <p class="methodology-section__text">${ranking.methodology}</p>
            </div>
        ` : ''}

        ${ranking.curatorNote ? `
            <div class="curator-note" style="margin-top: var(--spacing-lg);">
                <div class="curator-note__title">Nota do Curador</div>
                <p class="curator-note__text">${ranking.curatorNote}</p>
            </div>
        ` : ''}
    `;
}

function showError(message) {
    loadingState.innerHTML = `
        <p style="color: var(--color-text);">${message}</p>
        <a href="rankings.html" class="btn btn--whatsapp" style="margin-top: var(--spacing-md); display: inline-block;">
            Ver todos os rankings
        </a>
    `;
}

// Inicializar
loadRanking();
