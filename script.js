// Global variables
let map;
let markers = [];
let restaurantMarkers = [];
let combiMarkers = [];
let parkingMarkers = [];
let currentView = 'map';
let filteredParties = partiesData;
let currentRecommendationType = 'boliche';
let showRestaurants = false;
let showCombis = false;
let showParkings = false;
let currentUserId = "currentUser";

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    loadRecommendedParties();
    loadPrevias();
    loadCombis();
    showView('map');
});

// Initialize Leaflet map
function initializeMap() {
    map = L.map('map').setView([-34.6037, -58.3816], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    addPartyMarkers(partiesData);
}

// Add party markers to map
function addPartyMarkers(parties) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    parties.forEach(party => {
        const color = getMarkerColor(party.type);
        
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${color === 'blue' ? '#007bff' : color === 'red' ? '#dc3545' : '#28a745'};
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([party.lat, party.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${party.name}</h3>
                    <p><strong>${party.type === 'fiesta' ? 'Organizador:' : 'DJ:'}</strong> ${party.organizer || party.dj}</p>
                    <p><strong>Entrada:</strong> ${party.entryPrice === 0 ? 'GRATIS' : '$' + party.entryPrice}</p>
                    <p><strong>Horario:</strong> ${party.schedule}</p>
                    ${party.discount ? `<p style="color: #4CAF50;"><strong>${party.discount}</strong></p>` : ''}
                    <button onclick="showPartyDetails(${party.id})" style="
                        background: #fff; 
                        color: #000; 
                        border: none; 
                        padding: 0.5rem 1rem; 
                        border-radius: 15px; 
                        cursor: pointer; 
                        margin-top: 0.5rem;
                        width: 100%;
                    ">Ver detalles</button>
                </div>
            `);
        
        markers.push(marker);
    });

    addPreviaMarkers();
}

// Add previa markers
function addPreviaMarkers() {
    const visiblePrevias = getVisiblePrevias(currentUserId);
    
    visiblePrevias.forEach(previa => {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: #9c27b0;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([previa.lat, previa.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${previa.name}</h3>
                    <p><strong>Anfitrión:</strong> ${previa.host}</p>
                    <p><strong>Ubicación:</strong> ${previa.exactLocation}</p>
                    <p><strong>Invitados:</strong> ${previa.currentGuests}/${previa.maxGuests}</p>
                    <button onclick="showJoinPreviaModal(${previa.id})" style="
                        background: #9c27b0; 
                        color: white; 
                        border: none; 
                        padding: 0.5rem 1rem; 
                        border-radius: 15px; 
                        cursor: pointer; 
                        margin-top: 0.5rem;
                        width: 100%;
                    ">Solicitar unirse</button>
                </div>
            `);
        
        markers.push(marker);
    });
}

// Add restaurant markers
function addRestaurantMarkers() {
    restaurantMarkers.forEach(marker => map.removeLayer(marker));
    restaurantMarkers = [];

    if (!showRestaurants) return;

    restaurantsData.forEach(restaurant => {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: #ffc107;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
            ">🍟</div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([restaurant.lat, restaurant.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${restaurant.name}</h3>
                    <p><strong>Dirección:</strong> ${restaurant.address}</p>
                    <p><strong>Horarios:</strong> ${restaurant.hours}</p>
                    <p><strong>Categoría:</strong> Comida rápida</p>
                </div>
            `);
        
        restaurantMarkers.push(marker);
    });
}

// Add combi markers
function addCombiMarkers() {
    combiMarkers.forEach(marker => map.removeLayer(marker));
    combiMarkers = [];

    if (!showCombis) return;

    combiGroups.forEach(combi => {
        const locations = [
            { lat: -34.5875, lng: -58.4150 },
            { lat: -34.6037, lng: -58.3816 },
            { lat: -34.5755, lng: -58.4205 },
        ];
        const location = locations[combi.id % locations.length];
        
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: #ff5722;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
            ">🚐</div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([location.lat, location.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${combi.name}</h3>
                    <p><strong>Desde:</strong> ${combi.departure}</p>
                    <p><strong>Hacia:</strong> ${combi.destination}</p>
                    <p><strong>Salida:</strong> ${combi.departureTime}</p>
                    <p><strong>Precio:</strong> $${combi.price}</p>
                    <p><strong>Lugares:</strong> ${combi.currentPassengers}/${combi.capacity}</p>
                    <button onclick="showCombiPaymentModal(${combi.id})" style="
                        background: #ff5722; 
                        color: white; 
                        border: none; 
                        padding: 0.5rem 1rem; 
                        border-radius: 15px; 
                        cursor: pointer; 
                        margin-top: 0.5rem;
                        width: 100%;
                    ">Pagar y Reservar</button>
                </div>
            `);
        
        combiMarkers.push(marker);
    });
}

// Add parking markers
function addParkingMarkers() {
    parkingMarkers.forEach(marker => map.removeLayer(marker));
    parkingMarkers = [];

    if (!showParkings) return;

    parkingsData.forEach(parking => {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: #28a745;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: white;
                font-weight: bold;
            ">P</div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([parking.lat, parking.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${parking.name}</h3>
                    <p><strong>Dirección:</strong> ${parking.address}</p>
                    <p><strong>Precio:</strong> $${parking.pricePerHour}/hora</p>
                    <p><strong>Capacidad:</strong> ${parking.capacity} lugares</p>
                    <p><strong>24hs:</strong> ${parking.available24h ? 'Sí' : 'No'}</p>
                    <p><strong>Seguridad:</strong> ${parking.security ? 'Sí' : 'No'}</p>
                </div>
            `);
        
        parkingMarkers.push(marker);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            showView(view);
            
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filtered = partiesData.filter(party => 
                party.name.toLowerCase().includes(searchTerm) ||
                party.genre.toLowerCase().includes(searchTerm) ||
                party.dj.toLowerCase().includes(searchTerm) ||
                (party.organizer && party.organizer.toLowerCase().includes(searchTerm))
            );
            addPartyMarkers(filtered);
        });
    }

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            showModal('filter-modal');
        });
    }

    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const priceFilter = document.getElementById('price-filter').value;
            const genreFilter = document.getElementById('genre-filter').value;
            
            filteredParties = filterParties(priceFilter, genreFilter, currentRecommendationType);
            addPartyMarkers(filteredParties);
            hideModal('filter-modal');
        });
    }

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal.id);
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this.id);
            }
        });
    });

    const restaurantBtn = document.getElementById('toggle-restaurants');
    if (restaurantBtn) {
        restaurantBtn.addEventListener('click', function() {
            showRestaurants = !showRestaurants;
            this.classList.toggle('active');
            addRestaurantMarkers();
        });
    }

    const combiBtn = document.getElementById('toggle-combis');
    if (combiBtn) {
        combiBtn.addEventListener('click', function() {
            showCombis = !showCombis;
            this.classList.toggle('active');
            addCombiMarkers();
        });
    }

    const parkingBtn = document.getElementById('toggle-parkings');
    if (parkingBtn) {
        parkingBtn.addEventListener('click', function() {
            showParkings = !showParkings;
            this.classList.toggle('active');
            addParkingMarkers();
        });
    }

    setupRecommendationTabs();
    setupModalListeners();
}

// Setup recommendation tabs
function setupRecommendationTabs() {
    const tabsContainer = document.getElementById('recommendations-tabs');
    
    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            currentRecommendationType = type;
            
            tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            loadRecommendedParties(type);
        });
    });
}

// Setup modal listeners
function setupModalListeners() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Pago procesado exitosamente!');
            hideModal('payment-modal');
            paymentForm.reset();
        });
    }

    const mpButton = document.getElementById('mp-payment-btn');
    if (mpButton) {
        mpButton.addEventListener('click', function() {
            alert('Redirigiendo a MercadoPago...');
            hideModal('payment-modal');
        });
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Reseña enviada exitosamente!');
            hideModal('review-modal');
            reviewForm.reset();
        });
    }

    const joinPreviaForm = document.getElementById('join-previa-form');
    if (joinPreviaForm) {
        joinPreviaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Solicitud enviada!');
            hideModal('join-previa-modal');
            joinPreviaForm.reset();
        });
    }

    const createPreviaForm = document.getElementById('create-previa-form');
    if (createPreviaForm) {
        createPreviaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Previa creada exitosamente!');
            hideModal('create-previa-modal');
            createPreviaForm.reset();
            loadPrevias();
        });
    }
}

// Show specific view
function showView(viewName) {
    currentView = viewName;
    
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    const tabsContainer = document.getElementById('recommendations-tabs');
    const mapControls = document.getElementById('map-controls');
    
    if (viewName === 'recommendations') {
        if (tabsContainer) tabsContainer.style.display = 'flex';
        if (mapControls) mapControls.style.display = 'none';
    } else if (viewName === 'map') {
        if (tabsContainer) tabsContainer.style.display = 'none';
        if (mapControls) mapControls.style.display = 'flex';
        setTimeout(() => {
            if (map) map.invalidateSize();
        }, 100);
    } else {
        if (tabsContainer) tabsContainer.style.display = 'none';
        if (mapControls) mapControls.style.display = 'none';
    }
}

// Load recommended parties by type
function loadRecommendedParties(type = 'boliche') {
    const recommendedParties = getRecommendedParties(type);
    const container = document.getElementById('recommended-parties');
    
    if (!container) return;
    
    container.innerHTML = recommendedParties.map(party => `
        <div class="party-card" onclick="showPartyDetails(${party.id})">
            <div class="party-type-indicator party-type-${party.type}">
                ${party.type === 'boliche' ? 'BOLICHE' : 'JODA'}
            </div>
            ${party.ageRestriction ? `<div class="age-restriction">${party.ageRestriction}</div>` : ''}
            <h3>${party.name}</h3>
            <div class="party-info">
                <span>📍 ${party.address}</span>
                <span>🎵 ${party.organizer || party.dj}</span>
                ${party.type === 'boliche' ? `<span>⭐ ${party.rating} (${party.reviews} reseñas)</span>` : ''}
                <span>🕒 ${party.schedule}</span>
                ${party.discount ? `<span style="color: #4CAF50;">🎉 ${party.discount}</span>` : ''}
                ${party.eventDate ? `<span style="color: #ffc107;">📅 ${party.eventDate}</span>` : ''}
            </div>
            <div class="party-price">
                ${party.entryPrice === 0 ? 'ENTRADA GRATIS' : '$' + party.entryPrice}
            </div>
        </div>
    `).join('');
}

// Load previas
function loadPrevias() {
    const container = document.getElementById('previas-list');
    if (!container) return;
    
    container.innerHTML = privatePrevias.map(previa => `
        <div class="previa-card">
            <div class="previa-header">
                <h3>${previa.name}</h3>
                <span class="previa-status">${previa.status === 'open' ? 'Abierta' : 'Cerrada'}</span>
            </div>
            <p><strong>Anfitrión:</strong> ${previa.host}</p>
            <p><strong>Ubicación:</strong> ${previa.location}</p>
            <p><strong>Fecha:</strong> ${previa.date}</p>
            <div class="previa-guests">
                <strong>Invitados:</strong> ${previa.currentGuests}/${previa.maxGuests}
            </div>
            <p>${previa.description}</p>
            <p><strong>Requisitos:</strong> ${previa.requirements}</p>
            ${previa.price > 0 ? `<p><strong>Precio:</strong> $${previa.price}</p>` : ''}
            <button class="previa-btn" onclick="showJoinPreviaModal(${previa.id})">
                Solicitar unirse
            </button>
        </div>
    `).join('');
}

// Load combis
function loadCombis() {
    const container = document.getElementById('combis-list');
    if (!container) return;
    
    container.innerHTML = combiGroups.map(combi => `
        <div class="combi-card">
            <h3>${combi.name}</h3>
            <div class="combi-route">
                <span>${combi.departure}</span>
                <span class="combi-arrow">→</span>
                <span>${combi.destination}</span>
            </div>
            <div class="combi-info">
                <span><strong>Salida:</strong> ${combi.departureTime}</span>
                <span><strong>Conductor:</strong> ${combi.driver}</span>
                <span><strong>Rating:</strong> ⭐ ${combi.driverRating}</span>
                <span><strong>Pasajeros:</strong> ${combi.currentPassengers}/${combi.capacity}</span>
            </div>
            <div class="combi-price">$${combi.price}</div>
            <button class="combi-btn" onclick="showCombiPaymentModal(${combi.id})">
                Pagar y Reservar
            </button>
        </div>
    `).join('');
}

// Show party details modal
function showPartyDetails(partyId) {
    const party = getPartyById(partyId);
    if (!party) return;

    const drinkMenuHtml = Object.entries(party.drinkMenu)
        .map(([drink, price]) => `
            <div class="drink-item">
                <span class="drink-name">${drink}</span>
                <span class="drink-price">$${price}</span>
            </div>
        `).join('');

    const estimatedDistance = Math.random() * 15 + 2;
    const uberCost = calculateUberCost(estimatedDistance);

    const reviewsHtml = party.type === 'boliche' && party.userReviews && party.userReviews.length > 0 ? 
        party.userReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-user">${review.user}</span>
                    <div>
                        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-comment">${review.comment}</div>
            </div>
        `).join('') : party.type === 'boliche' ? '<p>No hay reseñas aún. ¡Sé el primero en escribir una!</p>' : '';

    const partyDetails = document.getElementById('party-details');
    if (!partyDetails) return;
    
    partyDetails.innerHTML = `
        <div class="party-detail">
            <div class="party-type-indicator party-type-${party.type}">
                ${party.type === 'boliche' ? 'BOLICHE' : 'JODA'}
            </div>
            ${party.ageRestriction ? `<div class="age-restriction">${party.ageRestriction}</div>` : ''}
            <h2>${party.name}</h2>
            <p>${party.description}</p>
            
            <div class="detail-section">
                <h4>📍 Ubicación</h4>
                <p>${party.address}</p>
            </div>
            
            <div class="detail-section">
                <h4>💰 Entrada</h4>
                <p>${party.entryPrice === 0 ? 'GRATIS' : '$' + party.entryPrice}</p>
                ${party.discount ? `<p style="color: #4CAF50;">${party.discount}</p>` : ''}
                ${party.entryPrice > 0 && party.type === 'boliche' ? `
                    <button class="buy-ticket-btn" onclick="showPaymentModal(${party.entryPrice})">
                        Comprar Entrada - $${party.entryPrice}
                    </button>
                ` : ''}
            </div>
            
            <div class="detail-section">
                <h4>🎵 Música</h4>
                <p><strong>${party.type === 'fiesta' ? 'Organizador:' : 'DJ:'}</strong> ${party.organizer || party.dj}</p>
                <p><strong>Género:</strong> ${party.genre.charAt(0).toUpperCase() + party.genre.slice(1)}</p>
                ${party.eventDate ? `<p><strong>Fecha del evento:</strong> ${party.eventDate}</p>` : ''}
            </div>
            
            <div class="detail-section">
                <h4>🕒 Horarios</h4>
                <p>${party.schedule}</p>
                <p><strong>Capacidad:</strong> ${party.capacity} personas</p>
            </div>
            
            ${party.hasParking !== undefined ? `
                <div class="detail-section">
                    <h4>🅿️ Estacionamiento</h4>
                    <p>${party.hasParking ? `Disponible - $${party.parkingPrice}/noche` : 'No disponible'}</p>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h4>🍹 Precios de Bebidas</h4>
                <div class="drink-menu">
                    ${drinkMenuHtml}
                </div>
            </div>
            
            ${party.type === 'boliche' ? `
                <div class="detail-section">
                    <h4>⭐ Reseñas</h4>
                    <p>${party.rating}/5 estrellas (${party.reviews} reseñas)</p>
                    <button class="write-review-btn" onclick="showReviewModal(${party.id})">
                        Escribir Reseña
                    </button>
                    <div class="reviews-section">
                        ${reviewsHtml}
                    </div>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <div class="uber-section">
                    <h4>🚗 Transporte</h4>
                    <p>Distancia estimada: ${estimatedDistance.toFixed(1)} km</p>
                    <p>Costo estimado Uber: <strong>$${uberCost}</strong></p>
                    <button class="uber-btn" onclick="requestUber('${party.name}')">
                        Pedir Uber
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal('party-modal');
}

// Show join previa modal
function showJoinPreviaModal(previaId) {
    const previa = privatePrevias.find(p => p.id === previaId);
    if (!previa) return;
    
    const previaDetails = document.getElementById('previa-details');
    if (!previaDetails) return;
    
    previaDetails.innerHTML = `
        <h4>${previa.name}</h4>
        <p><strong>Anfitrión:</strong> ${previa.host}</p>
        <p><strong>Ubicación:</strong> ${previa.location}</p>
        <p><strong>Fecha:</strong> ${previa.date}</p>
        <p><strong>Invitados actuales:</strong> ${previa.currentGuests}/${previa.maxGuests}</p>
        <p>${previa.description}</p>
        <p><strong>Requisitos:</strong> ${previa.requirements}</p>
        ${previa.price > 0 ? `<p><strong>Precio:</strong> $${previa.price}</p>` : ''}
        ${previa.hasCode ? `<p><strong>Código de acceso disponible</strong></p>` : ''}
    `;
    
    showModal('join-previa-modal');
}

// Show create previa modal
function showCreatePreviaModal() {
    showModal('create-previa-modal');
}

// Show combi payment modal
function showCombiPaymentModal(combiId) {
    showPaymentModal(1500);
}

// Request Uber
function requestUber(destination) {
    const estimatedCost = Math.floor(Math.random() * 2000) + 800;
    showPaymentModal(estimatedCost);
}

// Payment Modal Functions
function showPaymentModal(amount = 0) {
    const paymentAmount = document.getElementById('payment-amount');
    if (paymentAmount && amount > 0) {
        paymentAmount.innerHTML = `
            <h4>Total a pagar</h4>
            <div class="amount">$${amount}</div>
        `;
    } else if (paymentAmount) {
        paymentAmount.innerHTML = '';
    }
    showModal('payment-modal');
}

// Review Modal Functions
function showReviewModal(partyId) {
    const party = getPartyById(partyId);
    if (!party || party.type !== 'boliche') {
        alert('Solo se pueden escribir reseñas para boliches.');
        return;
    }
    
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.dataset.partyId = partyId;
    }
    showModal('review-modal');
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Funciones faltantes para reseñas y compra de entradas

// Star rating helper functions
function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#FFD700';
        } else {
            star.style.color = 'rgba(255, 255, 255, 0.3)';
        }
    });
}

// Mejorar la función showPartyDetails para incluir reseñas y compra de entradas
function showPartyDetailsComplete(partyId) {
    const party = getPartyById(partyId);
    if (!party) return;

    const drinkMenuHtml = Object.entries(party.drinkMenu)
        .map(([drink, price]) => `
            <div class="drink-item">
                <span class="drink-name">${drink}</span>
                <span class="drink-price">$${price}</span>
            </div>
        `).join('');

    const estimatedDistance = Math.random() * 15 + 2;
    const uberCost = calculateUberCost(estimatedDistance);

    const reviewsHtml = party.type === 'boliche' && party.userReviews && party.userReviews.length > 0 ? 
        party.userReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-user">${review.user}</span>
                    <div>
                        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-comment">${review.comment}</div>
            </div>
        `).join('') : party.type === 'boliche' ? '<p>No hay reseñas aún. ¡Sé el primero en escribir una!</p>' : '';

    const partyDetails = document.getElementById('party-details');
    if (!partyDetails) return;
    
    partyDetails.innerHTML = `
        <div class="party-detail">
            <div class="party-type-indicator party-type-${party.type}">
                ${party.type === 'boliche' ? 'BOLICHE' : 'JODA'}
            </div>
            ${party.ageRestriction ? `<div class="age-restriction">${party.ageRestriction}</div>` : ''}
            <h2>${party.name}</h2>
            <p>${party.description}</p>
            
            <div class="detail-section">
                <h4>📍 Ubicación</h4>
                <p>${party.address}</p>
            </div>
            
            <div class="detail-section">
                <h4>💰 Entrada</h4>
                <p>${party.entryPrice === 0 ? 'GRATIS' : '$' + party.entryPrice}</p>
                ${party.discount ? `<p style="color: #4CAF50;">${party.discount}</p>` : ''}
                ${party.entryPrice > 0 ? `
                    <button class="buy-ticket-btn" onclick="showPaymentModal(${party.entryPrice})">
                        Comprar Entrada - $${party.entryPrice}
                    </button>
                ` : ''}
            </div>
            
            <div class="detail-section">
                <h4>🎵 Música</h4>
                <p><strong>${party.type === 'fiesta' ? 'Organizador:' : 'DJ:'}</strong> ${party.organizer || party.dj}</p>
                <p><strong>Género:</strong> ${party.genre.charAt(0).toUpperCase() + party.genre.slice(1)}</p>
                ${party.eventDate ? `<p><strong>Fecha del evento:</strong> ${party.eventDate}</p>` : ''}
            </div>
            
            <div class="detail-section">
                <h4>🕒 Horarios</h4>
                <p>${party.schedule}</p>
                <p><strong>Capacidad:</strong> ${party.capacity} personas</p>
            </div>
            
            ${party.hasParking !== undefined ? `
                <div class="detail-section">
                    <h4>🅿️ Estacionamiento</h4>
                    <p>${party.hasParking ? `Disponible - $${party.parkingPrice}/noche` : 'No disponible'}</p>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <h4>🍹 Precios de Bebidas</h4>
                <div class="drink-menu">
                    ${drinkMenuHtml}
                </div>
            </div>
            
            ${party.type === 'boliche' ? `
                <div class="detail-section">
                    <h4>⭐ Reseñas</h4>
                    <p>${party.rating}/5 estrellas (${party.reviews} reseñas)</p>
                    <button class="write-review-btn" onclick="showReviewModal(${party.id})">
                        Escribir Reseña
                    </button>
                    <div class="reviews-section">
                        ${reviewsHtml}
                    </div>
                </div>
            ` : ''}
            
            <div class="detail-section">
                <div class="uber-section">
                    <h4>🚗 Transporte</h4>
                    <p>Distancia estimada: ${estimatedDistance.toFixed(1)} km</p>
                    <p>Costo estimado Uber: <strong>$${uberCost}</strong></p>
                    <button class="uber-btn" onclick="requestUber('${party.name}')">
                        Pedir Uber
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal('party-modal');
}

// Sobrescribir la función original
showPartyDetails = showPartyDetailsComplete;

// Mejorar los listeners de eventos para incluir funcionalidad de búsqueda
function setupSearchListeners() {
    const mainSearchInput = document.getElementById('main-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filtered = partiesData.filter(party => 
                party.name.toLowerCase().includes(searchTerm) ||
                party.genre.toLowerCase().includes(searchTerm) ||
                party.dj.toLowerCase().includes(searchTerm) ||
                (party.organizer && party.organizer.toLowerCase().includes(searchTerm))
            );
            addPartyMarkers(filtered);
        });
    }
    
    const mainFilterBtn = document.querySelector('.main-filter-btn');
    if (mainFilterBtn) {
        mainFilterBtn.addEventListener('click', function() {
            showModal('filter-modal');
        });
    }
}

// Agregar los listeners de búsqueda al inicializar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupSearchListeners();
    }, 1000);
});
