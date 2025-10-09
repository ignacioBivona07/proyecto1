// User types
export interface User {
  id: string
  email: string
  name?: string
  surname?: string
  dni?: string
  phone?: string
  avatar?: string
  birthDate?: Date
  isVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  preferences?: UserPreferences
}

export interface UserPreferences {
  id: string
  userId: string
  musicGenres: string[]
  venueTypes: string[]
  priceRangeLow: number
  priceRangeHigh: number
  maxDistance: number
  shareLocation: boolean
  showToFriends: boolean
  eventNotifications: boolean
  previaNotifications: boolean
  chatNotifications: boolean
}

export interface UserLocation {
  id: string
  userId: string
  latitude: number
  longitude: number
  address?: string
  city: string
  isActive: boolean
}

// Venue types
export interface Venue {
  id: string
  name: string
  type: VenueType
  address: string
  latitude: number
  longitude: number
  city: string
  description?: string
  capacity: number
  hasParking: boolean
  parkingPrice?: number
  rating: number
  reviewCount: number
  isActive: boolean
  menuItems?: VenueMenuItem[]
  reviews?: Review[]
}

export interface VenueType {
  id: string
  name: string
  displayName: string
  icon?: string
  color: string
}

export interface VenueMenuItem {
  id: string
  venueId: string
  name: string
  price: number
  category: 'drink' | 'food' | 'entrance'
  isActive: boolean
}

// Event types
export interface Event {
  id: string
  name: string
  description?: string
  venue?: Venue
  venueId?: string
  organizerId: string
  organizer: User
  eventDate: Date
  startTime: Date
  endTime?: Date
  basePrice: number
  isRecurrent: boolean
  recurrencePattern?: string
  address?: string
  latitude?: number
  longitude?: number
  city: string
  ageRestriction: string
  capacity: number
  currentAttendees: number
  musicGenres: MusicGenre[]
  eventTypes: EventType[]
  isActive: boolean
  isPublished: boolean
}

export interface MusicGenre {
  id: string
  name: string
  displayName: string
  color: string
}

export interface EventType {
  id: string
  name: string
  displayName: string
}

// Ticket types
export interface Ticket {
  id: string
  eventId: string
  event: Event
  userId: string
  user: User
  ticketType: string
  price: number
  quantity: number
  guestName?: string
  guestSurname?: string
  guestDNI?: string
  status: TicketStatus
  purchaseDate: Date
  qrCode?: string
  isValidated: boolean
  validatedAt?: Date
  paymentId?: string
  payment?: Payment
}

export enum TicketStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  VALIDATED = 'VALIDATED'
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  paymentMethod: string
  externalPaymentId?: string
  paymentStatus: PaymentStatus
  preferenceId?: string
  paymentData?: any
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

// Previa types
export interface Previa {
  id: string
  name: string
  description: string
  hostId: string
  host: User
  address: string
  latitude?: number
  longitude?: number
  city: string
  scheduledDate: Date
  duration?: number
  maxGuests: number
  currentGuests: number
  entryPrice: number
  requirements?: string
  isPublic: boolean
  requiresApproval: boolean
  accessCode?: string
  status: PreviaStatus
  members?: PreviaMember[]
  messages?: PreviaChatMessage[]
  joinRequests?: PreviaJoinRequest[]
}

export enum PreviaStatus {
  ACTIVE = 'ACTIVE',
  FULL = 'FULL',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface PreviaMember {
  id: string
  previaId: string
  userId: string
  user: User
  joinedAt: Date
  role: PreviaRole
}

export enum PreviaRole {
  HOST = 'HOST',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface PreviaChatMessage {
  id: string
  previaId: string
  userId: string
  user: User
  message: string
  messageType: 'text' | 'image' | 'location'
  createdAt: Date
}

export interface PreviaJoinRequest {
  id: string
  previaId: string
  userId: string
  user: User
  message?: string
  status: RequestStatus
  createdAt: Date
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// Combi types
export interface CombiGroup {
  id: string
  name: string
  departure: string
  destination: string
  departureTime: Date
  capacity: number
  currentPassengers: number
  pricePerPerson: number
  driverName: string
  driverPhone?: string
  driverRating: number
  status: CombiStatus
  passengers?: CombiPassenger[]
}

export enum CombiStatus {
  AVAILABLE = 'AVAILABLE',
  FULL = 'FULL',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface CombiPassenger {
  id: string
  combiId: string
  userId: string
  user: User
  hasPaid: boolean
  boardingPoint?: string
  joinedAt: Date
}

// Review types
export interface Review {
  id: string
  userId: string
  user: User
  venueId?: string
  venue?: Venue
  rating: number
  comment?: string
  isVerified: boolean
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Map types
export interface MapMarker {
  id: string
  type: 'venue' | 'event' | 'restaurant' | 'parking' | 'previa' | 'combi'
  name: string
  latitude: number
  longitude: number
  data: any
}

export interface MapFilters {
  venues: boolean
  events: boolean
  restaurants: boolean
  parkings: boolean
  previas: boolean
  combis: boolean
  musicGenres: string[]
  venueTypes: string[]
  priceRange: {
    min: number
    max: number
  }
  distance: number
}

// Form types
export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  surname: string
  birthDate: string
  acceptTerms: boolean
}

export interface LoginForm {
  email: string
  password: string
}

export interface CreatePreviaForm {
  name: string
  description: string
  address: string
  scheduledDate: string
  maxGuests: number
  entryPrice: number
  requirements?: string
  isPublic: boolean
  requiresApproval: boolean
  generateAccessCode: boolean
}

export interface JoinPreviaForm {
  message?: string
  accessCode?: string
}

// Socket types
export interface SocketMessage {
  type: 'message' | 'join' | 'leave' | 'typing'
  previaId: string
  userId: string
  userName: string
  message?: string
  timestamp: Date
}

// Notification types
export interface AppNotification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}