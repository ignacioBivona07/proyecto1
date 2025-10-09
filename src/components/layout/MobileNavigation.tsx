'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ViewType } from '@/app/page'

interface MobileNavigationProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function MobileNavigation({ 
  currentView, 
  onViewChange 
}: MobileNavigationProps) {
  const navigationItems = [
    {
      id: 'map' as ViewType,
      label: 'Mapa',
      icon: '🗺️',
      description: 'Ver en mapa'
    },
    {
      id: 'recommendations' as ViewType,
      label: 'Recomendadas',
      icon: '🔥',
      description: 'Para hoy',
      badge: '12'
    },
    {
      id: 'previas' as ViewType,
      label: 'Previas',
      icon: '🎉',
      description: 'Únete'
    },
    {
      id: 'combis' as ViewType,
      label: 'Combis',
      icon: '🚐',
      description: 'Compartir'
    },
    {
      id: 'organize' as ViewType,
      label: 'Organizar',
      icon: '✨',
      description: 'Crear evento'
    }
  ]

  return (
    <nav className="mobile-nav p-2">
      <div className="flex justify-around items-center">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange(item.id)}
            className={`
              flex flex-col items-center space-y-1 h-auto py-2 px-3 relative
              ${currentView === item.id ? 
                'bg-gradient-to-r from-nightlife-primary to-nightlife-secondary text-white' : 
                'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
            <span className="text-[10px] opacity-75">{item.description}</span>
            
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
      
      {/* Active indicator */}
      <div className="flex justify-around items-center mt-1">
        {navigationItems.map((item) => (
          <div
            key={`indicator-${item.id}`}
            className={`
              h-1 flex-1 mx-1 rounded-full transition-all duration-300
              ${currentView === item.id ? 
                'bg-gradient-to-r from-nightlife-primary to-nightlife-secondary' : 
                'bg-transparent'
              }
            `}
          />
        ))}
      </div>
    </nav>
  )
}