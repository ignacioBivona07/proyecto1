'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Mock data based on the original prototype
const mockVenues = [
  {
    id: 1,
    name: "Crobar",
    type: "boliche",
    lat: -34.5755,
    lng: -58.4205,
    address: "Paseo de la Costa, Vicente López",
    entryPrice: 3500,
    genre: "electronica",
    rating: 4.5,
    description: "El boliche más exclusivo de la zona norte"
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
    rating: 4.2,
    description: "La mejor música urbana y reggaeton"
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
    rating: 4.7,
    description: "Música en vivo y ambiente alternativo"
  }
]

const mockEvents = [
  {
    id: 8,
    name: "Fiesta Neon Party",
    type: "fiesta",
    lat: -34.5912,
    lng: -58.4201,
    address: "Galpón Industrial, La Boca",
    entryPrice: 1500,
    genre: "electronica",
    description: "Fiesta temática con luces neón"
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
    description: "La fiesta de reggaeton más grande"
  }
]

const mockRestaurants = [
  {
    id: 1,
    name: "McDonald's Palermo",
    type: "restaurant",
    lat: -34.5875,
    lng: -58.4150,
    address: "Av. Santa Fe 3253, Palermo",
    hours: "24hs"
  }
]

const mockParkings = [
  {
    id: 1,
    name: "Parking Palermo 24hs",
    type: "parking",
    lat: -34.5875,
    lng: -58.4150,
    address: "Av. Santa Fe 3200, Palermo",
    pricePerHour: 300
  }
]

// Custom marker icons
const createCustomIcon = (color: string, icon: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="venue-marker ${color.replace('#', '')} flex items-center justify-center" 
           style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
        <span style="font-size: 14px;">${icon}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  })
}

const venueIcon = createCustomIcon('#3B82F6', '🎵')
const eventIcon = createCustomIcon('#EF4444', '🎉') 
const restaurantIcon = createCustomIcon('#F59E0B', '🍟')
const parkingIcon = createCustomIcon('#10B981', '🅿️')

interface MapComponentProps {
  center: { lat: number; lng: number }
  searchQuery: string
  activeFilters: {
    venues: boolean
    events: boolean
    restaurants: boolean
    parkings: boolean
    combis: boolean
  }
}

function MapController({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView([center.lat, center.lng], 12)
  }, [map, center])
  
  return null
}

export default function MapComponent({ center, searchQuery, activeFilters }: MapComponentProps) {
  const [filteredData, setFilteredData] = useState({
    venues: mockVenues,
    events: mockEvents,
    restaurants: mockRestaurants,
    parkings: mockParkings
  })

  useEffect(() => {
    // Filter data based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredData({
        venues: mockVenues.filter(v => 
          v.name.toLowerCase().includes(query) || 
          v.genre.toLowerCase().includes(query) ||
          v.address.toLowerCase().includes(query)
        ),
        events: mockEvents.filter(e => 
          e.name.toLowerCase().includes(query) || 
          e.genre.toLowerCase().includes(query) ||
          e.address.toLowerCase().includes(query)
        ),
        restaurants: mockRestaurants.filter(r => 
          r.name.toLowerCase().includes(query) ||
          r.address.toLowerCase().includes(query)
        ),
        parkings: mockParkings.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
        )
      })
    } else {
      setFilteredData({
        venues: mockVenues,
        events: mockEvents,
        restaurants: mockRestaurants,
        parkings: mockParkings
      })
    }
  }, [searchQuery])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      className="w-full h-full z-0"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController center={center} />

      {/* User location marker */}
      <Marker
        position={[center.lat, center.lng]}
        icon={createCustomIcon('#8B5CF6', '📍')}
      >
        <Popup>
          <div className="text-center">
            <strong>Tu ubicación</strong>
            <br />
            <small className="text-muted-foreground">Buenos Aires, Argentina</small>
          </div>
        </Popup>
      </Marker>

      {/* Venue markers */}
      {activeFilters.venues && filteredData.venues.map(venue => (
        <Marker
          key={venue.id}
          position={[venue.lat, venue.lng]}
          icon={venueIcon}
        >
          <Popup>
            <div className="space-y-2 min-w-[200px]">
              <div>
                <h3 className="font-semibold text-lg">{venue.name}</h3>
                <p className="text-sm text-muted-foreground">{venue.address}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
                  {venue.genre}
                </span>
                <span className="text-sm font-medium">
                  ⭐ {venue.rating}
                </span>
              </div>
              <div>
                <p className="text-sm">{venue.description}</p>
                <p className="text-sm font-medium text-green-600">
                  Entrada: {formatPrice(venue.entryPrice)}
                </p>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded text-sm hover:opacity-90">
                Ver detalles
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Event markers */}
      {activeFilters.events && filteredData.events.map(event => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={eventIcon}
        >
          <Popup>
            <div className="space-y-2 min-w-[200px]">
              <div>
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-muted-foreground">{event.address}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                  {event.genre}
                </span>
                <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded">
                  Evento único
                </span>
              </div>
              <div>
                <p className="text-sm">{event.description}</p>
                <p className="text-sm font-medium text-green-600">
                  Entrada: {formatPrice(event.entryPrice)}
                </p>
              </div>
              <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-4 rounded text-sm hover:opacity-90">
                Comprar entrada
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Restaurant markers */}
      {activeFilters.restaurants && filteredData.restaurants.map(restaurant => (
        <Marker
          key={restaurant.id}
          position={[restaurant.lat, restaurant.lng]}
          icon={restaurantIcon}
        >
          <Popup>
            <div className="space-y-2 min-w-[200px]">
              <div>
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground">{restaurant.address}</p>
              </div>
              <div>
                <p className="text-sm">🕒 {restaurant.hours}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Parking markers */}
      {activeFilters.parkings && filteredData.parkings.map(parking => (
        <Marker
          key={parking.id}
          position={[parking.lat, parking.lng]}
          icon={parkingIcon}
        >
          <Popup>
            <div className="space-y-2 min-w-[200px]">
              <div>
                <h3 className="font-semibold text-lg">{parking.name}</h3>
                <p className="text-sm text-muted-foreground">{parking.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">
                  ${parking.pricePerHour}/hora
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}