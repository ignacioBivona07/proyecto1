'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import VenueCard from './VenueCard'
import EventCard from './EventCard'

// Mock data for recommendations
const mockRecommendedVenues = [
  {
    id: 1,
    name: "Crobar",
    type: "boliche",
    address: "Paseo de la Costa, Vicente López",
    entryPrice: 3500,
    genre: "electronica",
    rating: 4.5,
    distance: 2.3,
    image: "https://placehold.co/400x250?text=Modern+nightclub+with+LED+lights+and+DJ+booth",
    discount: null,
    isRecommended: true,
    reason: "Cerca de ti y gran rating"
  },
  {
    id: 2,
    name: "Kika", 
    type: "boliche",
    address: "Honduras 5339, Palermo",
    entryPrice: 2500,
    genre: "reggaeton",
    rating: 4.2,
    distance: 1.8,
    image: "https://placehold.co/400x250?text=Urban+reggaeton+club+with+neon+signs",
    discount: "20% OFF hasta las 01:00",
    isRecommended: true,
    reason: "Con descuento especial"
  },
  {
    id: 3,
    name: "Niceto Club",
    type: "boliche", 
    address: "Niceto Vega 5510, Palermo",
    entryPrice: 2000,
    genre: "rock",
    rating: 4.7,
    distance: 3.1,
    image: "https://placehold.co/400x250?text=Alternative+rock+venue+with+live+stage",
    discount: null,
    isRecommended: true,
    reason: "Excelente para rock en vivo"
  }
]

const mockRecommendedEvents = [
  {
    id: 8,
    name: "Fiesta Neon Party",
    type: "fiesta",
    address: "Galpón Industrial, La Boca", 
    entryPrice: 1500,
    genre: "electronica",
    distance: 4.2,
    image: "https://placehold.co/400x250?text=Neon+party+warehouse+with+UV+lights",
    eventDate: "2024-02-10",
    organizer: "Colectivo Neon",
    isRecommended: true,
    reason: "Evento único esta semana"
  },
  {
    id: 9,
    name: "Reggaeton Fest",
    type: "fiesta",
    address: "Salón de Eventos, Palermo",
    entryPrice: 2000,
    genre: "reggaeton", 
    distance: 2.1,
    image: "https://placehold.co/400x250?text=Reggaeton+festival+with+multiple+DJs",
    eventDate: "2024-02-15",
    organizer: "Urban Collective",
    isRecommended: true,
    reason: "Los mejores DJs de reggaeton"
  }
]

type RecommendationType = 'boliches' | 'fiestas'

interface RecommendationsViewProps {
  searchQuery: string
}

export default function RecommendationsView({ searchQuery }: RecommendationsViewProps) {
  const [activeTab, setActiveTab] = useState<RecommendationType>('boliches')
  const [filteredVenues, setFilteredVenues] = useState(mockRecommendedVenues)
  const [filteredEvents, setFilteredEvents] = useState(mockRecommendedEvents)

  useEffect(() => {
    // Filter venues based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredVenues(
        mockRecommendedVenues.filter(venue =>
          venue.name.toLowerCase().includes(query) ||
          venue.genre.toLowerCase().includes(query) ||
          venue.address.toLowerCase().includes(query)
        )
      )
      setFilteredEvents(
        mockRecommendedEvents.filter(event =>
          event.name.toLowerCase().includes(query) ||
          event.genre.toLowerCase().includes(query) ||
          event.address.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredVenues(mockRecommendedVenues)
      setFilteredEvents(mockRecommendedEvents)
    }
  }, [searchQuery])

  return (
    <div className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'boliches' ? 'default' : 'outline'}
          onClick={() => setActiveTab('boliches')}
          className="flex-1"
        >
          🎵 Boliches
          <Badge variant="secondary" className="ml-2">
            {filteredVenues.length}
          </Badge>
        </Button>
        <Button
          variant={activeTab === 'fiestas' ? 'default' : 'outline'}
          onClick={() => setActiveTab('fiestas')}
          className="flex-1"
        >
          🎉 Fiestas
          <Badge variant="secondary" className="ml-2">
            {filteredEvents.length}
          </Badge>
        </Button>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          🔥 Para esta noche
        </Button>
        <Button variant="outline" size="sm">
          📍 Cerca de mí
        </Button>
        <Button variant="outline" size="sm">
          💰 Con descuentos
        </Button>
        <Button variant="outline" size="sm">
          ⭐ Mejor puntuados
        </Button>
      </div>

      {/* Header info */}
      <div className="nightlife-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {activeTab === 'boliches' ? 'Boliches Recomendados' : 'Fiestas de la Semana'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'boliches' 
                ? 'Los mejores lugares para salir esta noche'
                : 'Eventos únicos que no te podés perder'
              }
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Buenos Aires
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'boliches' ? (
          <>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))
            ) : (
              <div className="nightlife-card p-8 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">No se encontraron boliches</h3>
                <p className="text-sm text-muted-foreground">
                  Intentá con una búsqueda diferente o eliminá los filtros
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="nightlife-card p-8 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold mb-2">No se encontraron fiestas</h3>
                <p className="text-sm text-muted-foreground">
                  Intentá con una búsqueda diferente o eliminá los filtros
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Load more button */}
      {((activeTab === 'boliches' && filteredVenues.length > 0) ||
        (activeTab === 'fiestas' && filteredEvents.length > 0)) && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="w-full">
            Cargar más {activeTab === 'boliches' ? 'boliches' : 'fiestas'}
          </Button>
        </div>
      )}
    </div>
  )
}