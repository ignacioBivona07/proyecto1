// Global variables
let map;
let markers = [];
let restaurantMarkers = [];
let currentView = 'map';
let filteredParties = partiesData;
let currentRecommendationType = 'boliche';
let showRestaurants = false;

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
    // Center map on Buenos Aires
    map = L.map('map').setView([-34.6037, -58.3816], 12);

    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Add party markers
    addPartyMarkers(partiesData);
}

// Add party markers to map with different colors
function addPartyMarkers(parties) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    parties.forEach(party => {
        const color = getMarkerColor(party.type);
        
        // Create custom icon based on type
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${color === 'blue' ? '#007bff' : color === 'red' ? '#dc3545' : color === 'white' ? '#ffffff' : '#ffc107'};
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
                    <p><strong>${party.type === 'after' ? 'Organizador:' : 'DJ:'}</strong> ${party.organizer || party.dj}</p>
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

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            showView(view);
            
            // Update active nav button
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search input
    document.querySelector('.search-input').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = partiesData.filter(party => 
            party.name.toLowerCase().includes(searchTerm) ||
            party.genre.toLowerCase().includes(searchTerm) ||
            party.dj.toLowerCase().includes(searchTerm) ||
            (party.organizer && party.organizer.toLowerCase().includes(searchTerm))
        );
        addPartyMarkers(filtered);
    });

    // Filter button
    document.querySelector('.filter-btn').addEventListener('click', function() {
        showModal('filter-modal');
    });

    // Apply filters button
    document.querySelector('.apply-filters-btn').addEventListener('click', function() {
        const priceFilter = document.getElementById('price-filter').value;
        const genreFilter = document.getElementById('genre-filter').value;
        
        filteredParties = filterParties(priceFilter, genreFilter, currentRecommendationType);
        addPartyMarkers(filteredParties);
        hideModal('filter-modal');
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal.id);
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this.id);
            }
        });
    });

    // Category buttons in organize view
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            showOrganizationServices(category);
        });
    });

    // Restaurant toggle button
    document.getElementById('toggle-restaurants').addEventListener('click', function() {
        showRestaurants = !showRestaurants;
        this.classList.toggle('active');
        addRestaurantMarkers();
    });

    // Recommendation tabs
    setupRecommendationTabs();
}

// Setup recommendation tabs
function setupRecommendationTabs() {
    const tabsContainer = document.getElementById('recommendations-tabs');
    
    // Create tab buttons
    const tabs = ['boliche', 'after', 'otros'];
    const tabNames = { 'boliche': 'Boliches', 'after': 'After', 'otros': 'Otros' };
    
    tabsContainer.innerHTML = tabs.map(type => 
        `<button class="tab-btn ${type === 'boliche' ? 'active' : ''}" data-type="${type}">${tabNames[type]}</button>`
    ).join('');

    // Add event listeners to tabs
    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            currentRecommendationType = type;
            
            // Update active tab
            tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load recommendations for this type
            loadRecommendedParties(type);
        });
    });
}

// Show specific view
function showView(viewName) {
    currentView = viewName;
    
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    // Show/hide additional controls
    const tabsContainer = document.getElementById('recommendations-tabs');
    const mapControls = document.getElementById('map-controls');
    
    if (viewName === 'recommendations') {
        tabsContainer.style.display = 'flex';
        mapControls.style.display = 'none';
    } else if (viewName === 'map') {
        tabsContainer.style.display = 'none';
        mapControls.style.display = 'flex';
        // Refresh map
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    } else {
        tabsContainer.style.display = 'none';
        mapControls.style.display = 'none';
    }
}

// Load recommended parties by type
function loadRecommendedParties(type = 'boliche') {
    const recommendedParties = getRecommendedParties(type);
    const container = document.getElementById('recommended-parties');
    
    container.innerHTML = recommendedParties.map(party => `
        <div class="party-card" onclick="showPartyDetails(${party.id})">
            <h3>${party.name}</h3>
            <div class="party-info">
                <span>📍 ${party.address}</span>
                <span>🎵 ${party.organizer || party.dj}</span>
                <span>⭐ ${party.rating} (${party.reviews} reseñas)</span>
                <span>🕒 ${party.schedule}</span>
                ${party.discount ? `<span style="color: #4CAF50;">🎉 ${party.discount}</span>` : ''}
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
            <button class="previa-btn" onclick="joinPrevia(${previa.id})">
                Solicitar unirse
            </button>
        </div>
    `).join('');
}

// Load combis
function loadCombis() {
    const container = document.getElementById('combis-list');
    
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
            <button class="combi-btn" onclick="joinCombi(${combi.id})">
                Reservar lugar
            </button>
        </div>
    `).join('');
}

// Show organization services
function showOrganizationServices(category) {
    const services = organizationServices[category];
    const categoryNames = {
        'venues': 'Lugares',
        'djs': 'DJs',
        'equipment': 'Equipos',
        'organizers': 'Organizadores'
    };

    const content = `
        <h3>Top ${categoryNames[category]}</h3>
        <div class="services-list">
            ${services.map(service => `
                <div class="service-card">
                    <div class="service-header">
                        <h4>${service.name}</h4>
                        <span class="service-rank">#${service.rank}</span>
                    </div>
                    <div class="service-info">
                        ${category === 'venues' ? `
                            <span><strong>Tipo:</strong> ${service.type}</span>
                            <span><strong>Capacidad:</strong> ${service.capacity} personas</span>
                            <span><strong>Ubicación:</strong> ${service.location}</span>
                            <span><strong>Servicios:</strong> ${service.amenities.join(', ')}</span>
                        ` : category === 'djs' ? `
                            <span><strong>Género:</strong> ${service.genre}</span>
                            <span><strong>Experiencia:</strong> ${service.experience}</span>
                        ` : category === 'equipment' ? `
                            <span><strong>Tipo:</strong> ${service.type}</span>
                            <span><strong>Descripción:</strong> ${service.description}</span>
                        ` : `
                            <span><strong>Especialidad:</strong> ${service.speciality}</span>
                            <span><strong>Eventos organizados:</strong> ${service.eventsOrganized}</span>
                            <span><strong>Rango de precios:</strong> ${service.priceRange}</span>
                        `}
                        <span class="service-rating">⭐ ${service.rating} (${service.reviews} reseñas)</span>
                    </div>
                    <div class="service-price">
                        ${category === 'venues' ? `$${service.pricePerHour}/hora` : 
                          category === 'djs' ? `$${service.pricePerEvent}/evento` :
                          category === 'equipment' ? `$${service.pricePerDay}/día` :
                          service.priceRange}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('services-content').innerHTML = content;
    showModal('services-modal');
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

    // Calculate estimated distance (mock calculation)
    const estimatedDistance = Math.random() * 15 + 2; // 2-17 km
    const uberCost = calculateUberCost(estimatedDistance);

    document.getElementById('party-details').innerHTML = `
        <div class="party-detail">
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
            </div>
            
            <div class="detail-section">
                <h4>🎵 Música</h4>
                <p><strong>${party.type === 'after' ? 'Organizador:' : 'DJ:'}</strong> ${party.organizer || party.dj}</p>
                <p><strong>Género:</strong> ${party.genre.charAt(0).toUpperCase() + party.genre.slice(1)}</p>
            </div>
            
            <div class="detail-section">
                <h4>🕒 Horarios</h4>
                <p>${party.schedule}</p>
                <p><strong>Capacidad:</strong> ${party.capacity} personas</p>
            </div>
            
            <div class="detail-section">
                <h4>🍹 Precios de Bebidas</h4>
                <div class="drink-menu">
                    ${drinkMenuHtml}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>⭐ Reseñas</h4>
                <p>${party.rating}/5 estrellas (${party.reviews} reseñas)</p>
            </div>
            
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

// Join previa function
function joinPrevia(previaId) {
    const previa = privatePrevias.find(p => p.id === previaId);
    if (previa) {
        alert(`Solicitud enviada para unirse a "${previa.name}". ${previa.host} recibirá tu solicitud.`);
    }
}

// Join combi function
function joinCombi(combiId) {
    const combi = combiGroups.find(c => c.id === combiId);
    if (combi) {
        if (combi.currentPassengers < combi.capacity) {
            alert(`¡Lugar reservado en ${combi.name}! Te contactaremos con los detalles del viaje.`);
            combi.currentPassengers++;
            loadCombis(); // Refresh the list
        } else {
            alert('Lo siento, esta combi está llena.');
        }
    }
}

// Request Uber (mock function)
function requestUber(destination) {
    alert(`Redirigiendo a Uber para ir a ${destination}...\n\nEn una app real, esto abriría la aplicación de Uber con el destino preconfigurado.`);
}

// Show modal
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add some interactive features for better UX
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            hideModal(modal.id);
        });
    }
});

// Add touch gestures for mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Swipe up to close modal (if modal is open)
    if (diff > 50) {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            hideModal(activeModal.id);
        }
    }
});

// Simulate real-time updates (optional feature)
setInterval(() => {
    // Randomly update some party data to simulate real-time changes
    const randomParty = partiesData[Math.floor(Math.random() * partiesData.length)];
    const randomChange = Math.floor(Math.random() * 3);
    
    switch(randomChange) {
        case 0:
            // Update review count
            randomParty.reviews += Math.floor(Math.random() * 3);
            break;
        case 1:
            // Slight rating change
            randomParty.rating += (Math.random() - 0.5) * 0.1;
            randomParty.rating = Math.max(1, Math.min(5, randomParty.rating));
            randomParty.rating = Math.round(randomParty.rating * 10) / 10;
            break;
    }
}, 30000); // Update every 30 seconds
