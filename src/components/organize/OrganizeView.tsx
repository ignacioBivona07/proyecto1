'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function OrganizeView() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Organizar Evento</h2>
        <p className="text-muted-foreground">
          Crea tu propio evento y genera ingresos
        </p>
      </div>

      {/* Event types */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">¿Qué querés organizar?</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              type: "Fiesta Privada",
              icon: "🎉",
              description: "Evento cerrado con lista de invitados",
              color: "bg-purple-500"
            },
            {
              type: "Evento Público", 
              icon: "🎵",
              description: "Venta libre de entradas",
              color: "bg-blue-500"
            },
            {
              type: "Previa Grande",
              icon: "🍻",
              description: "Previa con más de 50 personas",
              color: "bg-green-500"
            },
            {
              type: "After Hours",
              icon: "🌅", 
              description: "Evento después de las 6 AM",
              color: "bg-orange-500"
            }
          ].map((eventType, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 justify-start text-left"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`w-12 h-12 rounded-full ${eventType.color} flex items-center justify-center text-white text-xl`}>
                  {eventType.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{eventType.type}</h4>
                  <p className="text-sm text-muted-foreground">{eventType.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Services needed */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">¿Qué necesitás?</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { service: "DJ", icon: "🎧", available: 15 },
            { service: "Lugar", icon: "🏢", available: 8 },
            { service: "Sonido", icon: "🔊", available: 23 },
            { service: "Seguridad", icon: "🛡️", available: 12 },
            { service: "Bebidas", icon: "🍺", available: 7 },
            { service: "Decoración", icon: "🎈", available: 19 }
          ].map((service, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex-col space-y-1"
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="font-medium">{service.service}</span>
              <Badge variant="secondary" className="text-xs">
                {service.available} disponibles
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="nightlife-card p-4">
        <h3 className="font-semibold mb-3">📊 Estadísticas de organizadores</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">$85K</p>
            <p className="text-xs text-muted-foreground">Ingreso promedio</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">4.7⭐</p>
            <p className="text-xs text-muted-foreground">Rating promedio</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">156</p>
            <p className="text-xs text-muted-foreground">Eventos exitosos</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">¿Cómo funciona?</h3>
        <div className="space-y-3">
          {[
            { step: 1, title: "Creá tu evento", desc: "Definí lugar, fecha y tipo de evento" },
            { step: 2, title: "Configurá entradas", desc: "Precio, cantidad y modalidad de venta" },
            { step: 3, title: "Promocioná", desc: "Tu evento aparece en recomendados" },
            { step: 4, title: "Recibí pagos", desc: "Cobrás automáticamente por cada entrada" }
          ].map((step) => (
            <div key={step.step} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-nightlife-primary to-nightlife-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                {step.step}
              </div>
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3 pt-4">
        <Button className="w-full nightlife-button h-12 text-lg">
          ✨ Crear mi primer evento
        </Button>
        <Button variant="outline" className="w-full">
          📋 Ver eventos que organizo
        </Button>
      </div>
    </div>
  )
}