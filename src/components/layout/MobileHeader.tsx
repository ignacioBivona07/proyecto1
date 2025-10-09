'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import FilterModal from './FilterModal'
import type { ViewType } from '@/app/page'

interface MobileHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  currentView: ViewType
}

export default function MobileHeader({
  searchQuery,
  onSearchChange,
  currentView
}: MobileHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'map':
        return 'FiestaMap'
      case 'recommendations':
        return 'Recomendadas'
      case 'previas':
        return 'Previas'
      case 'combis':
        return 'Combis'
      case 'organize':
        return 'Organizar'
      default:
        return 'FiestaMap'
    }
  }

  const shouldShowSearch = ['map', 'recommendations'].includes(currentView)

  return (
    <>
      <header className="mobile-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-nightlife-primary to-nightlife-secondary bg-clip-text text-transparent">
              {getHeaderTitle()}
            </h1>
            {currentView === 'recommendations' && (
              <Badge variant="secondary" className="text-xs">
                Buenos Aires
              </Badge>
            )}
          </div>
          
          {shouldShowSearch && (
            <div className="flex items-center space-x-2 flex-1 max-w-sm ml-4">
              <Input
                placeholder={currentView === 'map' ? "Buscar lugares..." : "Buscar fiestas..."}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-9 bg-muted/50"
              />
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 px-3">
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px]">
                  <FilterModal 
                    isOpen={showFilters}
                    onClose={() => setShowFilters(false)}
                    currentView={currentView}
                  />
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
        
        {/* Location indicator */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Buenos Aires, Argentina</span>
          </div>
        </div>
      </header>
    </>
  )
}