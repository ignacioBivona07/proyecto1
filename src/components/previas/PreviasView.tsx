'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PreviasView() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const mockPrevias = [
    {
      id: 1,
      name: "Previa Palermo",
      host: "Martín",
      location: "Palermo Soho",
      date: "Sábado 23:00",
      maxGuests: 15,
      currentGuests: 8,
      description: "Previa tranquila antes de ir a Crobar. BYOB",
      price: 0,
      hasCode: false
    },
    {
      id: 2,
      name: "Pre Fiesta Electrónica",
      host: "Sofía",
      location: "Villa Crespo",
      date: "Viernes 22:30",
      maxGuests: 20,
      currentGuests: 12,
      description: "Previa con música electrónica antes del after",
      price: 1000,
      hasCode: true
    }
  ]

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Previas Privadas</h2>
          <p className="text-sm text-muted-foreground">Únete a previas antes de salir</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="nightlife-button"
          size="sm"
        >
          + Crear Previa
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          🔍 Buscar previas
        </Button>
        <Button variant="outline" size="sm">
          📍 Cerca de mí
        </Button>
      </div>

      {/* Previas list */}
      <div className="space-y-4">
        {mockPrevias.map(previa => (
          <div key={previa.id} className="nightlife-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{previa.name}</h3>
                <p className="text-sm text-muted-foreground">📍 {previa.location}</p>
                <p className="text-sm text-nightlife-primary">🕒 {previa.date}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">
                  👤 {previa.currentGuests}/{previa.maxGuests}
                </Badge>
                {previa.hasCode && (
                  <Badge variant="outline" className="ml-1">
                    🔒 Con código
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-sm mb-3">{previa.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Host: <strong>{previa.host}</strong></span>
                {previa.price > 0 && (
                  <Badge variant="outline" className="text-green-600">
                    ${previa.price}
                  </Badge>
                )}
                {previa.price === 0 && (
                  <Badge variant="outline" className="text-green-600">
                    Gratis
                  </Badge>
                )}
              </div>
              <Button size="sm" className="nightlife-button">
                Solicitar unirse
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create form modal placeholder */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Crear Nueva Previa</h3>
            <div className="space-y-4">
              <input 
                className="w-full p-2 border rounded" 
                placeholder="Nombre de la previa"
              />
              <textarea 
                className="w-full p-2 border rounded" 
                placeholder="Descripción"
                rows={3}
              />
              <input 
                className="w-full p-2 border rounded" 
                placeholder="Ubicación"
              />
              <input 
                type="datetime-local" 
                className="w-full p-2 border rounded"
              />
              <input 
                type="number" 
                className="w-full p-2 border rounded" 
                placeholder="Máximo de invitados"
              />
            </div>
            <div className="flex space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => setShowCreateForm(false)}
                className="flex-1 nightlife-button"
              >
                Crear Previa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}