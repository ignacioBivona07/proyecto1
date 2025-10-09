'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Dynamic import to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted/20">
      <div className="text-center space-y-2">
        <div className="loading-skeleton w-12 h-12 rounded-full mx-auto"></div>
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  )
})

interface MapViewProps {
  searchQuery: string
}

export default function MapView({ searchQuery }: MapViewProps) {
  const [activeFilters, setActiveFilters] = useState({
    venues: true,
    events: true,
    restaurants: false,
    parkings: false,
    combis: false
  })

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Error getting location:', error)
          // Default to Buenos Aires center
          setUserLocation({
            lat: -34.6037,
            lng: -58.3816
          })
        }
      )
    } else {
      // Default to Buenos Aires center
      setUserLocation({
        lat: -34.6037,
        lng: -58.3816
      })
    }
  }, [])

  const toggleFilter = (filterType: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }))
  }

  const filterButtons = [
    { key: 'venues' as const, label: 'Boliches', icon: '🎵', color: 'bg-blue-500' },
    { key: 'events' as const, label: 'Fiestas', icon: '🎉', color: 'bg-red-500' },
    { key: 'restaurants' as const, label: 'Comida', icon: '🍟', color: 'bg-yellow-500' },
    { key: 'parkings' as const, label: 'Parking', icon: '🅿️', color: 'bg-green-500' },
    { key: 'combis' as const, label: 'Combis', icon: '🚐', color: 'bg-orange-500' }
  ]

  return (
    <div className="relative h-full w-full">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(filter => (
            <Button
              key={filter.key}
              variant={activeFilters[filter.key] ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter.key)}
              className={`
                flex items-center space-x-1 h-8 px-2
                ${activeFilters[filter.key] ? filter.color : ''}
              `}
            >
              <span className="text-sm">{filter.icon}</span>
              <span className="text-xs">{filter.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Location indicator */}
      <div className="absolute top-20 left-4 z-10">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur">
          📍 Buenos Aires
        </Badge>
      </div>

      {/* Map Container */}
      <div className="w-full h-full">
        {userLocation && (
          <MapComponent 
            center={userLocation}
            searchQuery={searchQuery}
            activeFilters={activeFilters}
          />
        )}
      </div>

      {/* Quick Stats */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="nightlife-card p-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>12 Boliches</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>8 Fiestas</span>
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              Radio: 10km
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}