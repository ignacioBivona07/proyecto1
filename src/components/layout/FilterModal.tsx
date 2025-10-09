'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { ViewType } from '@/app/page'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  currentView: ViewType
}

export default function FilterModal({ onClose, currentView }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([])
  const [distance, setDistance] = useState([25])

  const musicGenres = [
    { id: 'reggaeton', name: 'Reggaeton', color: '#F97316' },
    { id: 'electronica', name: 'Electrónica', color: '#06B6D4' },
    { id: 'rock', name: 'Rock', color: '#DC2626' },
    { id: 'cumbia', name: 'Cumbia', color: '#65A30D' },
    { id: 'pop', name: 'Pop', color: '#EC4899' },
    { id: 'house', name: 'House', color: '#8B5CF6' }
  ]

  const venueTypes = [
    { id: 'boliche', name: 'Boliches', icon: '🎵' },
    { id: 'bar', name: 'Bares', icon: '🍺' },
    { id: 'fiesta', name: 'Fiestas', icon: '🎉' },
    { id: 'restaurant', name: 'Restaurantes', icon: '🍟' }
  ]

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    )
  }

  const handleVenueTypeToggle = (typeId: string) => {
    setSelectedVenueTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const clearAllFilters = () => {
    setPriceRange([0, 10000])
    setSelectedGenres([])
    setSelectedVenueTypes([])
    setDistance([25])
  }

  const applyFilters = () => {
    // Here you would apply the filters to your data
    console.log('Applying filters:', {
      priceRange,
      selectedGenres,
      selectedVenueTypes,
      distance: distance[0]
    })
    onClose()
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Limpiar todo
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Precio de entrada</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Gratis</span>
            <span>${priceRange[0]} - ${priceRange[1]}</span>
            <span>$10,000+</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Distance */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Distancia máxima</Label>
        <div className="px-2">
          <Slider
            value={distance}
            onValueChange={setDistance}
            max={50}
            min={1}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>1 km</span>
            <span>{distance[0]} km</span>
            <span>50 km</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Music Genres */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Géneros musicales</Label>
        <div className="flex flex-wrap gap-2">
          {musicGenres.map(genre => (
            <Badge
              key={genre.id}
              variant={selectedGenres.includes(genre.id) ? "default" : "outline"}
              className="cursor-pointer hover:opacity-80"
              style={selectedGenres.includes(genre.id) ? 
                { backgroundColor: genre.color, borderColor: genre.color } : {}
              }
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Venue Types */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tipo de lugar</Label>
        <div className="grid grid-cols-2 gap-3">
          {venueTypes.map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedVenueTypes.includes(type.id)}
                onCheckedChange={() => handleVenueTypeToggle(type.id)}
              />
              <Label 
                htmlFor={type.id} 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>{type.icon}</span>
                <span className="text-sm">{type.name}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Filters for current view */}
      {currentView === 'recommendations' && (
        <>
          <Separator />
          <div className="space-y-3">
            <Label className="text-sm font-medium">Recomendaciones especiales</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="tonight" />
                <Label htmlFor="tonight" className="text-sm">Para esta noche</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nearby" />
                <Label htmlFor="nearby" className="text-sm">Cerca de mi ubicación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="discounts" />
                <Label htmlFor="discounts" className="text-sm">Con descuentos</Label>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Apply Button */}
      <div className="flex space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={applyFilters} className="flex-1 nightlife-button">
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}