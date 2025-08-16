// Mock data for parties and venues in Buenos Aires
const partiesData = [
    // BOLICHES
    {
        id: 1,
        name: "Crobar",
        type: "boliche",
        lat: -34.5755,
        lng: -58.4205,
        address: "Paseo de la Costa, Vicente López",
        entryPrice: 3500,
        genre: "electronica",
        dj: "Hernán Cattáneo",
        rating: 4.5,
        reviews: 234,
        description: "El boliche más exclusivo de la zona norte con la mejor música electrónica.",
        drinkMenu: {
            "Fernet con Coca": 1200,
            "Cerveza": 800,
            "Vodka": 1500,
            "Whisky": 2000,
            "Agua": 500
        },
        schedule: "23:00 - 06:00",
        capacity: 800,
        discount: null
    },
    {
        id: 2,
        name: "Kika",
        type: "boliche",
        lat: -34.5889,
        lng: -58.3974,
        address: "Honduras 5339, Palermo",
        entryPrice: 2500,
        genre: "reggaeton",
        dj: "DJ Tao",
        rating: 4.2,
        reviews: 189,
        description: "La mejor música urbana y reggaeton en el corazón de Palermo.",
        drinkMenu: {
            "Fernet con Coca": 1100,
            "Cerveza": 750,
            "Ron": 1300,
            "Tequila": 1600,
            "Agua": 450
        },
        schedule: "00:00 - 05:00",
        capacity: 500,
        discount: "20% OFF hasta las 01:00"
    },
    {
        id: 3,
        name: "Niceto Club",
        type: "boliche",
        lat: -34.5845,
        lng: -58.4267,
        address: "Niceto Vega 5510, Palermo",
        entryPrice: 2000,
        genre: "rock",
        dj: "Banda en vivo",
        rating: 4.7,
        reviews: 312,
        description: "Música en vivo y ambiente alternativo. El lugar perfecto para los amantes del rock.",
        drinkMenu: {
            "Cerveza Artesanal": 900,
            "Fernet con Coca": 1000,
            "Gin Tonic": 1400,
            "Whisky": 1800,
            "Agua": 400
        },
        schedule: "22:00 - 04:00",
        capacity: 300,
        discount: null
    },
    // AFTERS
    {
        id: 4,
        name: "After Warehouse",
        type: "after",
        lat: -34.5912,
        lng: -58.4201,
        address: "Galpón Industrial, La Boca",
        entryPrice: 1500,
        genre: "techno",
        dj: "DJ Mariano",
        organizer: "Colectivo Underground",
        rating: 4.6,
        reviews: 156,
        description: "After underground en galpón industrial. Música techno hasta el amanecer.",
        drinkMenu: {
            "Cerveza": 600,
            "Fernet con Coca": 900,
            "Vodka": 1200,
            "Agua": 300
        },
        schedule: "06:00 - 14:00",
        capacity: 200,
        discount: null
    },
    {
        id: 5,
        name: "Sunrise After",
        type: "after",
        lat: -34.6037,
        lng: -58.3816,
        address: "Terraza Privada, Palermo",
        entryPrice: 2000,
        genre: "house",
        dj: "DJ Luna",
        organizer: "After Collective",
        rating: 4.4,
        reviews: 89,
        description: "After en terraza con vista panorámica. House music y buen ambiente.",
        drinkMenu: {
            "Cerveza": 700,
            "Fernet con Coca": 1000,
            "Gin Tonic": 1300,
            "Agua": 400
        },
        schedule: "07:00 - 15:00",
        capacity: 150,
        discount: "Entrada gratis antes de las 08:00"
    },
    // OTROS
    {
        id: 6,
        name: "Evento Especial",
        type: "otros",
        lat: -34.5234,
        lng: -58.4987,
        address: "Ubicación por confirmar",
        entryPrice: 0,
        genre: "variado",
        dj: "Por confirmar",
        rating: 4.0,
        reviews: 23,
        description: "Evento especial próximamente. Mantente atento a las actualizaciones.",
        drinkMenu: {
            "Por confirmar": 0
        },
        schedule: "Por confirmar",
        capacity: 0,
        discount: "Próximamente"
    }
];

// Fast food restaurants data
const restaurantsData = [
    {
        id: 1,
        name: "McDonald's Palermo",
        type: "restaurant",
        lat: -34.5875,
        lng: -58.4150,
        address: "Av. Santa Fe 3253, Palermo",
        hours: "24hs",
        category: "fast-food"
    },
    {
        id: 2,
        name: "McDonald's Puerto Madero",
        type: "restaurant",
        lat: -34.6118,
        lng: -58.3634,
        address: "Alicia Moreau de Justo 1150, Puerto Madero",
        hours: "24hs",
        category: "fast-food"
    },
    {
        id: 3,
        name: "Burger King Palermo",
        type: "restaurant",
        lat: -34.5823,
        lng: -58.4200,
        address: "Av. Córdoba 5690, Palermo",
        hours: "10:00 - 02:00",
        category: "fast-food"
    }
];

// Mock data for party organization services with rankings
const organizationServices = {
    venues: [
        {
            id: 1,
            name: "Salón Eventos Premium",
            type: "Salón",
            capacity: 200,
            pricePerHour: 15000,
            location: "Palermo",
            amenities: ["Sonido básico", "Iluminación", "Baños", "Cocina"],
            rating: 4.8,
            reviews: 45,
            rank: 1
        },
        {
            id: 2,
            name: "Terraza Sky",
            type: "Terraza",
            capacity: 150,
            pricePerHour: 20000,
            location: "Puerto Madero",
            amenities: ["Vista panorámica", "Bar", "Parrilla", "Aire libre"],
            rating: 4.6,
            reviews: 32,
            rank: 2
        },
        {
            id: 3,
            name: "Galpón Industrial",
            type: "Galpón",
            capacity: 300,
            pricePerHour: 12000,
            location: "La Boca",
            amenities: ["Espacio amplio", "Parking", "Seguridad"],
            rating: 4.3,
            reviews: 28,
            rank: 3
        }
    ],
    djs: [
        {
            id: 1,
            name: "DJ Martín",
            genre: "Electrónica",
            pricePerEvent: 25000,
            rating: 4.9,
            reviews: 67,
            experience: "5 años",
            rank: 1
        },
        {
            id: 2,
            name: "DJ Sofía",
            genre: "Reggaeton",
            pricePerEvent: 20000,
            rating: 4.7,
            reviews: 54,
            experience: "3 años",
            rank: 2
        },
        {
            id: 3,
            name: "DJ Carlos",
            genre: "House",
            pricePerEvent: 22000,
            rating: 4.5,
            reviews: 41,
            experience: "4 años",
            rank: 3
        }
    ],
    equipment: [
        {
            id: 1,
            name: "Pro Audio Solutions",
            type: "Audio Completo",
            pricePerDay: 8000,
            description: "Sistema profesional con amplificadores, parlantes y micrófono",
            rating: 4.8,
            reviews: 89,
            rank: 1
        },
        {
            id: 2,
            name: "Light & Sound Pro",
            type: "Audio + Luces",
            pricePerDay: 12000,
            description: "Paquete completo con sonido profesional y efectos LED + láser",
            rating: 4.6,
            reviews: 76,
            rank: 2
        },
        {
            id: 3,
            name: "Basic Sound Rental",
            type: "Audio Básico",
            pricePerDay: 5000,
            description: "Equipo básico ideal para eventos pequeños",
            rating: 4.2,
            reviews: 34,
            rank: 3
        }
    ],
    organizers: [
        {
            id: 1,
            name: "Party Masters",
            speciality: "Fiestas Electrónicas",
            eventsOrganized: 156,
            rating: 4.9,
            reviews: 234,
            priceRange: "$50,000 - $200,000",
            rank: 1
        },
        {
            id: 2,
            name: "Urban Events",
            speciality: "Fiestas Urbanas",
            eventsOrganized: 89,
            rating: 4.7,
            reviews: 167,
            priceRange: "$30,000 - $150,000",
            rank: 2
        },
        {
            id: 3,
            name: "Night Collective",
            speciality: "Afters",
            eventsOrganized: 67,
            rating: 4.5,
            reviews: 98,
            priceRange: "$20,000 - $100,000",
            rank: 3
        }
    ]
};

// Mock data for private parties (previas)
const privatePrevias = [
    {
        id: 1,
        name: "Previa Palermo",
        host: "Martín",
        location: "Palermo Soho",
        date: "Sábado 23:00",
        maxGuests: 15,
        currentGuests: 8,
        description: "Previa tranquila antes de ir a Crobar. BYOB (trae tu bebida)",
        requirements: "Solo buena onda",
        status: "open"
    },
    {
        id: 2,
        name: "Pre Fiesta Electrónica",
        host: "Sofía",
        location: "Villa Crick",
        date: "Viernes 22:30",
        maxGuests: 20,
        currentGuests: 12,
        description: "Previa con música electrónica antes del after. Terraza disponible",
        requirements: "Contribución $1000 para bebidas",
        status: "open"
    }
];

// Mock data for combi groups
const combiGroups = [
    {
        id: 1,
        name: "Combi Zona Norte",
        departure: "Vicente López Centro",
        destination: "Crobar",
        departureTime: "00:30",
        price: 1500,
        capacity: 15,
        currentPassengers: 8,
        driver: "Carlos",
        driverRating: 4.8,
        status: "available"
    },
    {
        id: 2,
        name: "Combi Palermo Express",
        departure: "Plaza Serrano",
        destination: "Bahrein",
        departureTime: "01:00",
        price: 1200,
        capacity: 12,
        currentPassengers: 5,
        driver: "Ana",
        driverRating: 4.6,
        status: "available"
    },
    {
        id: 3,
        name: "After Shuttle",
        departure: "Palermo",
        destination: "After Warehouse",
        departureTime: "06:00",
        price: 800,
        capacity: 10,
        currentPassengers: 3,
        driver: "Diego",
        driverRating: 4.9,
        status: "available"
    }
];

// Function to get recommended parties by type
function getRecommendedParties(type = 'boliche') {
    let filtered = partiesData.filter(party => party.type === type);
    return filtered.filter(party => 
        party.discount !== null || party.rating >= 4.5
    ).sort((a, b) => b.rating - a.rating);
}

// Function to filter parties by criteria and type
function filterParties(priceRange, genre, type = 'boliche') {
    return partiesData.filter(party => {
        let matchesPrice = true;
        let matchesGenre = true;
        let matchesType = party.type === type;

        if (priceRange) {
            switch(priceRange) {
                case 'free':
                    matchesPrice = party.entryPrice === 0;
                    break;
                case 'low':
                    matchesPrice = party.entryPrice <= 2000;
                    break;
                case 'medium':
                    matchesPrice = party.entryPrice > 2000 && party.entryPrice <= 5000;
                    break;
                case 'high':
                    matchesPrice = party.entryPrice > 5000;
                    break;
            }
        }

        if (genre) {
            matchesGenre = party.genre === genre;
        }

        return matchesPrice && matchesGenre && matchesType;
    });
}

// Function to get marker color by type
function getMarkerColor(type) {
    switch(type) {
        case 'boliche':
            return 'blue';
        case 'after':
            return 'red';
        case 'otros':
            return 'white';
        case 'restaurant':
            return 'yellow';
        default:
            return 'blue';
    }
}

// Function to calculate estimated Uber cost (mock calculation)
function calculateUberCost(distance) {
    const baseRate = 500; // Base rate in ARS
    const perKmRate = 200; // Rate per km in ARS
    const estimatedCost = baseRate + (distance * perKmRate);
    return Math.round(estimatedCost);
}

// Function to get party by ID
function getPartyById(id) {
    return partiesData.find(party => party.id === id);
}

// Function to get restaurant by ID
function getRestaurantById(id) {
    return restaurantsData.find(restaurant => restaurant.id === id);
}

