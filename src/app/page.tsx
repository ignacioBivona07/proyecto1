'use client'

import { useState } from 'react'
import MapView from '@/components/map/MapView'
import RecommendationsView from '@/components/recommendations/RecommendationsView'
import PreviasView from '@/components/previas/PreviasView'
import CombisView from '@/components/combis/CombisView'
import OrganizeView from '@/components/organize/OrganizeView'
import MobileHeader from '@/components/layout/MobileHeader'
import MobileNavigation from '@/components/layout/MobileNavigation'

export type ViewType = 'map' | 'recommendations' | 'previas' | 'combis' | 'organize'

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewType>('map')
  const [searchQuery, setSearchQuery] = useState('')

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <MapView searchQuery={searchQuery} />
      case 'recommendations':
        return <RecommendationsView searchQuery={searchQuery} />
      case 'previas':
        return <PreviasView />
      case 'combis':
        return <CombisView />
      case 'organize':
        return <OrganizeView />
      default:
        return <MapView searchQuery={searchQuery} />
    }
  }

  return (
    <div className="app-container">
      <MobileHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
      />
      
      <main className="mobile-content">
        {renderView()}
      </main>
      
      <MobileNavigation 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  )
}