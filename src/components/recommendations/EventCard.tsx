'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Event {
  id: number
  name: string
  type: string
  address: string
  entryPrice: number
  genre: string
  distance: number
  image: string
  eventDate: string
  organizer: string
  isRecommended: boolean
  reason: string
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
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

  const getDaysUntilEvent = (dateStr: string) => {
    const eventDate = new Date(dateStr)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Mañana'
    if (diffDays > 0) return `En ${diffDays} días`
    return 'Evento pasado'
  }

  return (
    <div className="nightlife-card overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {event.isRecommended && (
            <Badge className="bg-gradient-to-r from-nightlife-primary to-nightlife-secondary text-white">
              🔥 Imperdible
            </Badge>
          )}
          <Badge variant="destructive" className="bg-red-600">
            🎉 Evento único
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge className={`${getGenreColor(event.genre)} text-white`}>
            {event.genre}
          </Badge>
        </div>

        {/* Time badge */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            🕒 {getDaysUntilEvent(event.eventDate)}
          </Badge>
        </div>

        {/* Distance badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            📍 {event.distance} km
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-sm text-muted-foreground">{event.address}</p>
              <p className="text-sm text-nightlife-primary">
                📅 {formatEventDate(event.eventDate)}
              </p>
            </div>
          </div>
          
          {event.reason && (
            <p className="text-xs text-nightlife-primary mt-1">
              💡 {event.reason}
            </p>
          )}
        </div>

        {/* Organizer */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Organizado por:</span>
          <Badge variant="outline" className="text-xs">
            {event.organizer}
          </Badge>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Entrada anticipada</p>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(event.entryPrice)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Estimado Uber</p>
            <p className="text-sm font-medium">
              {formatPrice(event.distance * 200 + 500)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Ver detalles
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90">
            Comprar entrada
          </Button>
        </div>

        {/* Quick info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>🕒 22:00 - 06:00</span>
          <span>👥 Hasta 300 personas</span>
          <span>🎫 Entradas limitadas</span>
        </div>
      </div>
    </div>
  )
}