export type RoomType = {
  id: string
  slug: string
  name_id: string
  name_en: string
  description_id: string
  description_en: string
  base_price: number
  max_guests: number
  bed_type: string
  created_at: string
}

export type RoomUnit = {
  id: string
  room_type_id: string
  unit_code: string
  is_active: boolean
}

export type RoomPhoto = {
  id: string
  room_type_id: string
  url: string
  sort_order: number
}

export type RatePlan = {
  id: string
  room_type_id: string
  start_date: string
  end_date: string
  price_override: number
  label: string
}

export type Guest = {
  id: string
  name: string
  email: string
  phone: string
  country: string
  created_at: string
}

export type Booking = {
  id: string
  room_unit_id: string
  guest_id: string
  check_in: string
  check_out: string
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_type: 'dp' | 'full'
  total_price: number
  amount_paid: number
  guest_count: number
  special_request: string
  created_at: string
}

export type Payment = {
  id: string
  booking_id: string
  amount: number
  method: string
  status: 'pending' | 'success' | 'failed'
  transaction_ref: string
  paid_at: string | null
  created_at: string
}

export type RoomTypeWithRelations = RoomType & {
  room_photos: RoomPhoto[]
  rate_plans: RatePlan[]
  room_units: RoomUnit[]
}
