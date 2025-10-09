'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Venue {
  id: number
  name: string
  type: string
  address: string
  entryPrice: number
  genre: string
  rating: number
  distance: number
  image: string
  discount?: string | null
  isRecommended: boolean
  reason: string
}

interface VenueCardProps {
  venue: Venue
}

export default function VenueCard({ venue }: VenueCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getGenreColor = (genre: string) => {
    const colors = {
      electronica: 'bg-cyan-500',
      reggaeton: 'bg-orange-500',
      rock: 'bg-red-600',
      cumbia: 'bg-lime-600',
      pop: 'bg-pink-500',
      house: 'bg-violet-500'
    }
    return colors[genre as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="nightlife-card overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {venue.isRecommended && (
            <Badge className="bg-gradient-to-r from-nightlife-primary to-nightlife-secondary text-white">
              ⭐ Recomendado
            </Badge>
          )}
          {venue.discount && (
            <Badge variant="destructive" className="bg-green-600">
              💰 {venue.discount}
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge className={`${getGenreColor(venue.genre)} text-white`}>
            {venue.genre}
          </Badge>
        </div>

        {/* Distance badge */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            📍 {venue.distance} km
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{venue.name}</h3>
              <p className="text-sm text-muted-foreground">{venue.address}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <span>⭐</span>
              <span className="font-medium">{venue.rating}</span>
            </div>
          </div>
          
          {venue.reason && (
            <p className="text-xs text-nightlife-primary mt-1">
              💡 {venue.reason}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Entrada</p>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(venue.entryPrice)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Estimado Uber</p>
            <p className="text-sm font-medium">
              {formatPrice(venue.distance * 200 + 500)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Ver detalles
          </Button>
          <Button size="sm" className="flex-1 nightlife-button">
            Comprar entrada
          </Button>
        </div>

        {/* Quick info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>🕒 Abre a las 23:00</span>
          <span>👥 Hasta 800 personas</span>
          <span>🅿️ Parking disponible</span>
        </div>
      </div>
    </div>
  )
}