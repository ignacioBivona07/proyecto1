// Mock data for parties and venues in Buenos Aires - ACTUALIZADO
const partiesData = [
    // BOLICHES (Lugares fijos +18)
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
        discount: null,
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 800,
        userReviews: [
            { user: "Martín", rating: 5, comment: "Increíble ambiente y música de primera", date: "2024-01-15" },
            { user: "Sofia", rating: 4, comment: "Muy bueno pero un poco caro", date: "2024-01-10" },
            { user: "Diego", rating: 5, comment: "El mejor boliche de zona norte", date: "2024-01-08" }
        ]
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
        discount: "20% OFF hasta las 01:00",
        ageRestriction: "+18",
        hasParking: false,
        parkingPrice: 0,
        userReviews: [
            { user: "Ana", rating: 4, comment: "Buena música pero muy lleno", date: "2024-01-12" },
            { user: "Carlos", rating: 5, comment: "Excelente reggaeton toda la noche", date: "2024-01-09" }
        ]
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
        discount: null,
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 600,
        userReviews: [
            { user: "Lucía", rating: 5, comment: "Ambiente único, bandas increíbles", date: "2024-01-14" },
            { user: "Pablo", rating: 4, comment: "Muy buena propuesta alternativa", date: "2024-01-11" }
        ]
    },
    {
        id: 4,
        name: "Bahrein",
        type: "boliche",
        lat: -34.5901,
        lng: -58.4201,
        address: "Lavalle 345, Microcentro",
        entryPrice: 3000,
        genre: "electronica",
        dj: "DJ Pacha",
        rating: 4.4,
        reviews: 456,
        description: "Uno de los boliches más tradicionales de Buenos Aires con 3 pisos de música.",
        drinkMenu: {
            "Fernet con Coca": 1300,
            "Cerveza": 900,
            "Vodka": 1600,
            "Champagne": 8000,
            "Agua": 600
        },
        schedule: "00:30 - 06:00",
        capacity: 1200,
        discount: null,
        ageRestriction: "+18",
        hasParking: false,
        parkingPrice: 0,
        userReviews: [
            { user: "Valentina", rating: 4, comment: "Clásico de Buenos Aires, siempre bueno", date: "2024-01-13" }
        ]
    },

    // FIESTAS (Eventos temporales organizados - SIN RESEÑAS porque son eventos únicos)
    {
        id: 8,
        name: "Fiesta Neon Party",
        type: "fiesta",
        lat: -34.5912,
        lng: -58.4201,
        address: "Galpón Industrial, La Boca",
        entryPrice: 1500,
        genre: "electronica",
        dj: "DJ Mariano",
        organizer: "Colectivo Neon",
        rating: 0, // Sin rating porque es evento único
        reviews: 0, // Sin reseñas porque es evento único
        description: "Fiesta temática con luces neón y música electrónica. ¡Trae ropa blanca!",
        drinkMenu: {
            "Cerveza": 600,
            "Fernet con Coca": 900,
            "Vodka": 1200,
            "Agua": 300
        },
        schedule: "22:00 - 05:00",
        capacity: 200,
        discount: "Entrada anticipada $1200",
        eventDate: "2024-02-10",
        ageRestriction: "+16",
        hasParking: false,
        parkingPrice: 0,
        userReviews: [] // Sin reseñas para eventos únicos
    },
    {
        id: 9,
        name: "Reggaeton Fest",
        type: "fiesta",
        lat: -34.6037,
        lng: -58.3816,
        address: "Salón de Eventos, Palermo",
        entryPrice: 2000,
        genre: "reggaeton",
        dj: "DJ Luna & MC Flow",
        organizer: "Urban Collective",
        rating: 0,
        reviews: 0,
        description: "La fiesta de reggaeton más grande del mes con los mejores DJs.",
        drinkMenu: {
            "Cerveza": 700,
            "Ron": 1100,
            "Tequila": 1400,
            "Agua": 400
        },
        schedule: "23:00 - 06:00",
        capacity: 300,
        discount: null,
        eventDate: "2024-02-15",
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 400,
        userReviews: []
    }
];

// Datos de parkings cerca de boliches y fiestas
const parkingsData = [
    {
        id: 1,
        name: "Parking Palermo 24hs",
        lat: -34.5875,
        lng: -58.4150,
        address: "Av. Santa Fe 3200, Palermo",
        pricePerHour: 300,
        capacity: 50,
        available24h: true,
        security: true
    },
    {
        id: 2,
        name: "Estacionamiento Vicente López",
        lat: -34.5745,
        lng: -58.4195,
        address: "Maipú 1200, Vicente López",
        pricePerHour: 250,
        capacity: 80,
        available24h: true,
        security: true
    },
    {
        id: 3,
        name: "Parking Microcentro",
        lat: -34.6027,
        lng: -58.3806,
        address: "Corrientes 1100, Microcentro",
        pricePerHour: 400,
        capacity: 120,
        available24h: true,
        security: true
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
    }
];

// Mock data for party organization services
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
            reviews: 45
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
            experience: "5 años"
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
            reviews: 89
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
            priceRange: "$50,000 - $200,000"
        }
    ]
};

// Mock data for private parties (previas)
const privatePrevias = [
    {
        id: 1,
        name: "Previa Palermo",
        host: "Martín",
        hostId: "user123",
        location: "Palermo Soho",
        exactLocation: "Thames 1234, Palermo",
        lat: -34.5875,
        lng: -58.4150,
        date: "Sábado 23:00",
        maxGuests: 15,
        currentGuests: 8,
        description: "Previa tranquila antes de ir a Crobar. BYOB (trae tu bebida)",
        requirements: "Solo buena onda",
        status: "open",
        price: 0,
        hasCode: false,
        accessCode: null,
        members: ["user456", "user789"],
        pendingRequests: ["user101", "user102"],
        chatMessages: []
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
        paidPassengers: 8,
        driver: "Carlos",
        driverRating: 4.8,
        status: "available",
        passengers: ["user123", "user456"]
    }
];

// Variables globales para ubicación del usuario
let userLocation = null;
let userAcceptedPrevias = [];

// Function to get recommended parties by type
function getRecommendedParties(type = 'boliche') {
    let filtered;
    if (type === 'joda') {
        filtered = partiesData.filter(party => party.type === 'fiesta');
    } else {
        filtered = partiesData.filter(party => party.type === type);
    }
    
    return filtered.filter(party => 
        party.discount !== null || party.rating >= 4.5
    ).sort((a, b) => b.rating - a.rating);
}

// Function to filter parties by criteria and type
function filterParties(priceRange, genre, type = 'boliche') {
    return partiesData.filter(party => {
        let matchesPrice = true;
        let matchesGenre = true;
        let matchesType;
        
        if (type === 'joda') {
            matchesType = party.type === 'fiesta';
        } else {
            matchesType = party.type === type;
        }

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
        case 'fiesta':
            return 'red';
        case 'restaurant':
            return 'yellow';
        case 'parking':
            return 'green';
        case 'combi':
            return 'orange';
        default:
            return 'blue';
    }
}

// Function to calculate estimated Uber cost with user location
function calculateUberCost(distance, userLat = null, userLng = null) {
    const baseRate = 500;
    const perKmRate = 200;
    
    if (userLat && userLng && userLocation) {
        const realDistance = calculateDistance(userLocation.lat, userLocation.lng, userLat, userLng);
        distance = realDistance;
    }
    
    const estimatedCost = baseRate + (distance * perKmRate);
    return Math.round(estimatedCost);
}

// Function to calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Function to get party by ID
function getPartyById(id) {
    return partiesData.find(party => party.id === id);
}

// Function to get restaurant by ID
function getRestaurantById(id) {
    return restaurantsData.find(restaurant => restaurant.id === id);
}

// Function to get parking by ID
function getParkingById(id) {
    return parkingsData.find(parking => parking.id === id);
}

// Function to add user review - SOLO para boliches
function addUserReview(partyId, userName, rating, comment) {
    const party = getPartyById(partyId);
    if (party && party.type === 'boliche') {
        const newReview = {
            user: userName,
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0]
        };
        
        party.userReviews.push(newReview);
        
        const totalReviews = party.userReviews.length;
        const totalRating = party.userReviews.reduce((sum, review) => sum + review.rating, 0);
        party.rating = Math.round((totalRating / totalReviews) * 10) / 10;
        party.reviews = totalReviews;
        
        return true;
    }
    return false;
}

// Function to generate random access code
function generateAccessCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to create new previa
function createPrevia(previaData) {
    const newPrevia = {
        id: Date.now(),
        name: previaData.name,
        host: previaData.hostName,
        hostId: "currentUser",
        location: previaData.location,
        exactLocation: previaData.location,
        lat: -34.5875 + (Math.random() - 0.5) * 0.05,
        lng: -58.4150 + (Math.random() - 0.5) * 0.05,
        date: previaData.date,
        maxGuests: parseInt(previaData.maxGuests),
        currentGuests: 1,
        description: previaData.description,
        requirements: previaData.requirements || "Ninguno",
        status: "open",
        price: parseInt(previaData.price) || 0,
        hasCode: previaData.autoAccept,
        accessCode: previaData.autoAccept ? generateAccessCode() : null,
        members: ["currentUser"],
        pendingRequests: [],
        chatMessages: [
            { 
                user: previaData.hostName, 
                message: `¡Bienvenidos a ${previaData.name}!`, 
                timestamp: new Date().toISOString() 
            }
        ]
    };
    
    privatePrevias.push(newPrevia);
    return newPrevia;
}

// Function to check if user can see previa location
function canSeePrevia(previaId, userId) {
    const previa = privatePrevias.find(p => p.id === previaId);
    if (!previa) return false;
    
    if (previa.hostId === userId) return true;
    if (previa.members.includes(userId)) return true;
    
    return false;
}

// Function to get visible previas for user
function getVisiblePrevias(userId) {
    return privatePrevias.filter(previa => canSeePrevia(previa.id, userId));
}

// Agregar más boliches que faltaban
partiesData.push(
    {
        id: 5,
        name: "Mint",
        type: "boliche",
        lat: -34.5823,
        lng: -58.4156,
        address: "Costa Rica 6038, Palermo",
        entryPrice: 2800,
        genre: "house",
        dj: "DJ Fer Palacio",
        rating: 4.3,
        reviews: 278,
        description: "House music de calidad en un ambiente sofisticado.",
        drinkMenu: {
            "Fernet con Coca": 1200,
            "Cerveza": 850,
            "Gin Tonic": 1500,
            "Mojito": 1400,
            "Agua": 500
        },
        schedule: "00:00 - 05:30",
        capacity: 600,
        discount: "Ladies free hasta 01:00",
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 700,
        userReviews: []
    },
    {
        id: 6,
        name: "Groove",
        type: "boliche",
        lat: -34.5756,
        lng: -58.4189,
        address: "Av. Figueroa Alcorta 6442, Palermo",
        entryPrice: 2200,
        genre: "reggaeton",
        dj: "DJ Agus",
        rating: 4.1,
        reviews: 167,
        description: "Reggaeton y música urbana con la mejor pista de baile.",
        drinkMenu: {
            "Fernet con Coca": 1100,
            "Cerveza": 800,
            "Ron": 1300,
            "Agua": 450
        },
        schedule: "23:30 - 05:00",
        capacity: 400,
        discount: null,
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 500,
        userReviews: []
    },
    {
        id: 7,
        name: "Roxy Live",
        type: "boliche",
        lat: -34.6012,
        lng: -58.3845,
        address: "Av. Rivadavia 456, San Telmo",
        entryPrice: 1800,
        genre: "rock",
        dj: "Bandas en vivo",
        rating: 4.6,
        reviews: 203,
        description: "El templo del rock nacional con bandas en vivo todas las noches.",
        drinkMenu: {
            "Cerveza": 700,
            "Fernet con Coca": 950,
            "Whisky": 1600,
            "Agua": 400
        },
        schedule: "21:00 - 03:00",
        capacity: 350,
        discount: null,
        ageRestriction: "+18",
        hasParking: false,
        parkingPrice: 0,
        userReviews: []
    }
);

// Agregar más fiestas que faltaban
partiesData.push(
    {
        id: 10,
        name: "Cumbia Villera Night",
        type: "fiesta",
        lat: -34.5789,
        lng: -58.4123,
        address: "Club Social, Villa Crespo",
        entryPrice: 800,
        genre: "cumbia",
        dj: "Los Pibes del Barrio",
        organizer: "Cumbia Total",
        rating: 0,
        reviews: 0,
        description: "Noche de cumbia villera con los mejores grupos en vivo.",
        drinkMenu: {
            "Cerveza": 500,
            "Fernet con Coca": 800,
            "Vino": 600,
            "Agua": 300
        },
        schedule: "21:00 - 04:00",
        capacity: 400,
        discount: "2x1 en cervezas hasta las 23:00",
        eventDate: "2024-02-08",
        ageRestriction: "+16",
        hasParking: false,
        parkingPrice: 0,
        userReviews: []
    },
    {
        id: 11,
        name: "Techno Underground",
        type: "fiesta",
        lat: -34.6156,
        lng: -58.3634,
        address: "Warehouse Secreto, Puerto Madero",
        entryPrice: 2500,
        genre: "techno",
        dj: "DJ Dark & Minimal Crew",
        organizer: "Underground BA",
        rating: 0,
        reviews: 0,
        description: "Fiesta techno underground en ubicación secreta. Solo para conocedores.",
        drinkMenu: {
            "Cerveza": 800,
            "Vodka": 1400,
            "Gin": 1600,
            "Agua": 500
        },
        schedule: "01:00 - 10:00",
        capacity: 150,
        discount: null,
        eventDate: "2024-02-12",
        ageRestriction: "+21",
        hasParking: false,
        parkingPrice: 0,
        userReviews: []
    },
    {
        id: 12,
        name: "Fiesta de los 90s",
        type: "fiesta",
        lat: -34.5934,
        lng: -58.4067,
        address: "Salón Retro, Recoleta",
        entryPrice: 1200,
        genre: "pop",
        dj: "DJ Nostalgia",
        organizer: "90s Forever",
        rating: 0,
        reviews: 0,
        description: "Revive los mejores hits de los 90s en una noche llena de nostalgia.",
        drinkMenu: {
            "Cerveza": 650,
            "Fernet con Coca": 950,
            "Daiquiri": 1200,
            "Agua": 350
        },
        schedule: "22:00 - 04:00",
        capacity: 250,
        discount: "Disfraz de los 90s = 50% OFF",
        eventDate: "2024-02-20",
        ageRestriction: "+18",
        hasParking: true,
        parkingPrice: 300,
        userReviews: []
    }
);

// Agregar más combis que faltaban
combiGroups.push(
    {
        id: 2,
        name: "Combi Palermo Express",
        departure: "Plaza Serrano",
        destination: "Bahrein",
        departureTime: "01:00",
        price: 1200,
        capacity: 12,
        currentPassengers: 5,
        paidPassengers: 5,
        driver: "Ana",
        driverRating: 4.6,
        status: "available",
        passengers: ["user789", "user101"]
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
        paidPassengers: 3,
        driver: "Diego",
        driverRating: 4.9,
        status: "available",
        passengers: ["user102"]
    }
);

// Agregar más previas que faltaban
privatePrevias.push(
    {
        id: 2,
        name: "Pre Fiesta Electrónica",
        host: "Sofía",
        hostId: "user456",
        location: "Villa Crespo",
        exactLocation: "Warnes 2000, Villa Crespo",
        lat: -34.5789,
        lng: -58.4123,
        date: "Viernes 22:30",
        maxGuests: 20,
        currentGuests: 12,
        description: "Previa con música electrónica antes del after. Terraza disponible",
        requirements: "Contribución $1000 para bebidas",
        status: "open",
        price: 1000,
        hasCode: true,
        accessCode: "ELECTRO2024",
        members: ["user123", "user789", "user101"],
        pendingRequests: [],
        chatMessages: [
            { user: "Sofía", message: "Código de acceso: ELECTRO2024", timestamp: "2024-01-19 18:00" },
            { user: "Diego", message: "¡Genial! Ya confirmé mi asistencia", timestamp: "2024-01-19 18:30" }
        ]
    }
);

// Agregar más restaurantes que faltaban
restaurantsData.push(
    {
        id: 3,
        name: "McDonald's Microcentro",
        type: "restaurant",
        lat: -34.6037,
        lng: -58.3816,
        address: "Av. Corrientes 1145, Microcentro",
        hours: "24hs",
        category: "fast-food"
    },
    {
        id: 4,
        name: "Burger King Palermo",
        type: "restaurant",
        lat: -34.5823,
        lng: -58.4200,
        address: "Av. Córdoba 5690, Palermo",
        hours: "10:00 - 02:00",
        category: "fast-food"
    },
    {
        id: 5,
        name: "Burger King Recoleta",
        type: "restaurant",
        lat: -34.5934,
        lng: -58.4067,
        address: "Av. Callao 1234, Recoleta",
        hours: "10:00 - 02:00",
        category: "fast-food"
    }
);

// Agregar más parkings que faltaban
parkingsData.push(
    {
        id: 4,
        name: "Garage Puerto Madero",
        lat: -34.6146,
        lng: -58.3624,
        address: "Alicia Moreau de Justo 1000",
        pricePerHour: 500,
        capacity: 200,
        available24h: true,
        security: true
    },
    {
        id: 5,
        name: "Parking Recoleta",
        lat: -34.5924,
        lng: -58.4057,
        address: "Av. Callao 1300, Recoleta",
        pricePerHour: 350,
        capacity: 60,
        available24h: true,
        security: true
    },
    {
        id: 6,
        name: "Estacionamiento La Boca",
        lat: -34.5902,
        lng: -58.4191,
        address: "Av. Almirante Brown 500",
        pricePerHour: 200,
        capacity: 40,
        available24h: false,
        security: false
    }
);

// Agregar más servicios de organización que faltaban
organizationServices.venues.push(
    {
        id: 2,
        name: "Terraza Sky",
        type: "Terraza",
        capacity: 150,
        pricePerHour: 20000,
        location: "Puerto Madero",
        amenities: ["Vista panorámica", "Bar", "Parrilla", "Aire libre"],
        rating: 4.6,
        reviews: 32
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
        reviews: 28
    }
);

organizationServices.djs.push(
    {
        id: 2,
        name: "DJ Sofía",
        genre: "Reggaeton",
        pricePerEvent: 20000,
        rating: 4.7,
        reviews: 54,
        experience: "3 años"
    },
    {
        id: 3,
        name: "DJ Carlos",
        genre: "House",
        pricePerEvent: 22000,
        rating: 4.5,
        reviews: 41,
        experience: "4 años"
    }
);

organizationServices.equipment.push(
    {
        id: 2,
        name: "Light & Sound Pro",
        type: "Audio + Luces",
        pricePerDay: 12000,
        description: "Paquete completo con sonido profesional y efectos LED + láser",
        rating: 4.6,
        reviews: 76
    },
    {
        id: 3,
        name: "Basic Sound Rental",
        type: "Audio Básico",
        pricePerDay: 5000,
        description: "Equipo básico ideal para eventos pequeños",
        rating: 4.2,
        reviews: 34
    }
);

organizationServices.organizers.push(
    {
        id: 2,
        name: "Urban Events",
        speciality: "Fiestas Urbanas",
        eventsOrganized: 89,
        rating: 4.7,
        reviews: 167,
        priceRange: "$30,000 - $150,000"
    },
    {
        id: 3,
        name: "Night Collective",
        speciality: "Afters",
        eventsOrganized: 67,
        rating: 4.5,
        reviews: 98,
        priceRange: "$20,000 - $100,000"
    }
);


