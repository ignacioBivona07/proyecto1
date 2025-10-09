'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CombisView() {
  const mockCombis = [
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
      driverRating: 4.8
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
      driverRating: 4.6
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
      driverRating: 4.9
    }
  ]

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Combis Compartidas</h2>
        <p className="text-sm text-muted-foreground">Viaja seguro y económico</p>
      </div>

      {/* Quick filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          🚐 Todas las combis
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          🌙 Para esta noche
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          🌅 After hours
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          💰 Más baratas
        </Button>
      </div>

      {/* Info card */}
      <div className="nightlife-card p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">ℹ️</span>
          <h3 className="font-semibold">¿Cómo funcionan las combis?</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Unite a grupos de personas que van al mismo lugar. Más seguro y económico que ir solo.
        </p>
      </div>

      {/* Combis list */}
      <div className="space-y-4">
        {mockCombis.map(combi => (
          <div key={combi.id} className="nightlife-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{combi.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <span>🚐 {combi.departure}</span>
                  <span>→</span>
                  <span>📍 {combi.destination}</span>
                </div>
                <p className="text-sm text-nightlife-primary mt-1">
                  🕒 Salida: {combi.departureTime}
                </p>
              </div>
              <Badge 
                variant={combi.currentPassengers >= combi.capacity ? "destructive" : "secondary"}
              >
                👤 {combi.currentPassengers}/{combi.capacity}
              </Badge>
            </div>

            {/* Driver info */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm">Conductor: <strong>{combi.driver}</strong></span>
              <div className="flex items-center space-x-1 text-sm">
                <span>⭐</span>
                <span>{combi.driverRating}</span>
              </div>
            </div>

            {/* Price and action */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-green-600">
                  ${combi.price.toLocaleString()} por persona
                </p>
                <p className="text-xs text-muted-foreground">
                  Más barato que Uber
                </p>
              </div>
              
              <Button 
                size="sm" 
                className="nightlife-button"
                disabled={combi.currentPassengers >= combi.capacity}
              >
                {combi.currentPassengers >= combi.capacity ? 'Completa' : 'Unirse'}
              </Button>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Lugares ocupados</span>
                <span>{Math.round((combi.currentPassengers / combi.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-nightlife-primary to-nightlife-secondary rounded-full h-2 transition-all"
                  style={{ width: `${(combi.currentPassengers / combi.capacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create combi button */}
      <div className="text-center pt-4">
        <Button variant="outline" className="w-full">
          🚐 Crear nueva combi
        </Button>
      </div>
    </div>
  )
}