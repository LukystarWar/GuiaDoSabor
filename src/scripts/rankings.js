// Elementos DOM
const rankingsGrid = document.getElementById('rankingsGrid');

// Carregar rankings
async function loadRankings() {
    try {
        const response = await fetch('data/rankings/index.json');
        const data = await response.json();

        if (data.rankings.length === 0) {
            showEmptyState();
            return;
        }

        renderRankings(data.rankings);
    } catch (error) {
        console.error('Erro ao carregar rankings:', error);
        rankingsGrid.innerHTML = '<p style="text-align: center; color: #6C757D;">Erro ao carregar os rankings.</p>';
    }
}

function renderRankings(rankings) {
    rankingsGrid.innerHTML = rankings.map(ranking => `
        <a href="ranking.html?id=${ranking.id}" class="ranking-card">
            <div class="ranking-card__emoji">${ranking.coverEmoji}</div>
            <h2 class="ranking-card__title">${ranking.title}</h2>
            <p class="ranking-card__description">${ranking.description}</p>
            <div class="ranking-card__meta">
                <span class="ranking-card__meta-item">
                    📅 ${ranking.year}
                </span>
                <span class="ranking-card__meta-item">
                    📍 ${ranking.totalPlaces} lugares
                </span>
                ${ranking.category !== 'all' ? `
                    <span class="ranking-card__meta-item">
                        🏷️ ${getCategoryName(ranking.category)}
                    </span>
                ` : ''}
            </div>
        </a>
    `).join('');
}

function getCategoryName(categoryId) {
    const names = {
        'lanches': 'Lanches',
        'pizza': 'Pizza',
        'acai': 'Açaí',
        'almoco': 'Almoço',
        'cafes': 'Cafés',
        'all': 'Todas as categorias'
    };
    return names[categoryId] || categoryId;
}

function showEmptyState() {
    rankingsGrid.innerHTML = `
        <div class="empty-rankings">
            <div class="empty-rankings__icon">🏆</div>
            <p class="empty-rankings__text">Nenhum ranking disponível no momento.</p>
            <p class="empty-rankings__text">Novos rankings serão publicados em breve!</p>
        </div>
    `;
}

// Inicializar
loadRankings();
