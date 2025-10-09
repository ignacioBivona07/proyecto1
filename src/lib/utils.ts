import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Distance calculation utilities
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Price formatting
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Date formatting
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

// Rating utilities
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function generateStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars)
}

// Location utilities
export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    )
  })
}

// Venue type utilities
export function getVenueTypeColor(type: string): string {
  const colors = {
    boliche: '#3B82F6', // blue-500
    fiesta: '#EF4444',  // red-500
    restaurant: '#F59E0B', // amber-500
    parking: '#10B981', // green-500
    bar: '#8B5CF6',     // violet-500
  }
  return colors[type as keyof typeof colors] || '#6B7280' // gray-500
}

export function getVenueTypeIcon(type: string): string {
  const icons = {
    boliche: '🎵',
    fiesta: '🎉',
    restaurant: '🍟',
    parking: '🅿️',
    bar: '🍺',
  }
  return icons[type as keyof typeof icons] || '📍'
}

// Music genre utilities
export function getMusicGenreColor(genre: string): string {
  const colors = {
    electronica: '#06B6D4', // cyan-500
    reggaeton: '#F97316',   // orange-500
    rock: '#DC2626',        // red-600
    cumbia: '#65A30D',      // lime-600
    pop: '#EC4899',         // pink-500
    house: '#8B5CF6',       // violet-500
    techno: '#1F2937',      // gray-800
  }
  return colors[genre as keyof typeof colors] || '#6B7280'
}

// Access code generation
export function generateAccessCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// URL utilities
export function getAppUrl(path: string = ''): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  return `http://localhost:3000${path}`
}

// Error handling
export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'Ocurrió un error inesperado'
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidDNI(dni: string): boolean {
  const dniRegex = /^\d{7,8}$/
  return dniRegex.test(dni.replace(/\D/g, ''))
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s-()]{10,}$/
  return phoneRegex.test(phone)
}