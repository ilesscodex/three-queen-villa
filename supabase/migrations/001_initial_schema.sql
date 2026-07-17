-- ============================================================
-- Migration 001: Initial Schema for Three Queen Villa
-- ============================================================

-- 1. ENUMS
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
CREATE TYPE payment_type AS ENUM ('dp', 'full');

-- 2. ROOM_TYPES
CREATE TABLE room_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE,
  name_id     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  description_id TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  base_price  INTEGER NOT NULL,
  max_guests  INTEGER NOT NULL,
  bed_type    TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. ROOM_UNITS
CREATE TABLE room_units (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  unit_code   TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_room_units_room_type_id ON room_units(room_type_id);

-- 4. ROOM_PHOTOS
CREATE TABLE room_photos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_room_photos_room_type_id ON room_photos(room_type_id);

-- 5. RATE_PLANS
CREATE TABLE rate_plans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id  UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  price_override INTEGER NOT NULL,
  label         TEXT NOT NULL DEFAULT '',
  CONSTRAINT rate_plans_date_check CHECK (end_date >= start_date)
);

CREATE INDEX idx_rate_plans_room_type_id ON rate_plans(room_type_id);
CREATE INDEX idx_rate_plans_dates ON rate_plans(start_date, end_date);

-- 6. GUESTS
CREATE TABLE guests (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT NOT NULL DEFAULT '',
  country    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. BOOKINGS
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_unit_id    UUID NOT NULL REFERENCES room_units(id),
  guest_id        UUID NOT NULL REFERENCES guests(id),
  check_in        DATE NOT NULL,
  check_out       DATE NOT NULL,
  status          booking_status NOT NULL DEFAULT 'pending',
  payment_type    payment_type NOT NULL DEFAULT 'full',
  total_price     INTEGER NOT NULL,
  amount_paid     INTEGER NOT NULL DEFAULT 0,
  guest_count     INTEGER NOT NULL DEFAULT 1,
  special_request TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT bookings_date_check CHECK (check_out > check_in)
);

CREATE INDEX idx_bookings_room_unit_id ON bookings(room_unit_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON bookings(status);

-- 8. PAYMENTS
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID NOT NULL REFERENCES bookings(id),
  amount          INTEGER NOT NULL,
  method          TEXT NOT NULL DEFAULT '',
  status          payment_status NOT NULL DEFAULT 'pending',
  transaction_ref TEXT NOT NULL DEFAULT '',
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);

-- ============================================================
-- SEED DATA
-- ============================================================

-- 5 room types
INSERT INTO room_types (slug, name_id, name_en, description_id, description_en, base_price, max_guests, bed_type) VALUES
  ('traditional-house-king-ocean-view', 'Traditional House King Ocean View', 'Traditional House King Ocean View', 'Rumah tradisional dengan pemandangan laut yang menakjubkan. Dilengkapi tempat tidur King size dan fasilitas premium.', 'Traditional house with stunning ocean view. Features a King size bed and premium amenities.', 1500000, 2, 'King'),
  ('traditional-house-king', 'Traditional House King', 'Traditional House King', 'Rumah tradisional yang nyaman dengan tempat tidur King size. Cocok untuk pasangan.', 'Comfortable traditional house with a King size bed. Perfect for couples.', 1200000, 2, 'King'),
  ('traditional-house-queen', 'Traditional House Queen', 'Traditional House Queen', 'Rumah tradisional dengan tempat tidur Queen size. Pilihan ekonomis dengan nuansa tradisional.', 'Traditional house with a Queen size bed. Budget-friendly option with traditional vibes.', 900000, 2, 'Queen'),
  ('deluxe-room-king-single', 'Deluxe Room King Single', 'Deluxe Room King Single', 'Kamar deluxe dengan satu tempat tidur King. Cocok untuk solo traveler atau pasangan.', 'Deluxe room with a single King bed. Great for solo travelers or couples.', 700000, 2, 'Single (King)'),
  ('deluxe-room-queen-double', 'Deluxe Room Queen Double', 'Deluxe Room Queen Double', 'Kamar deluxe dengan dua tempat tidur Queen. Ideal untuk keluarga atau grup kecil.', 'Deluxe room with two Queen beds. Ideal for families or small groups.', 800000, 4, 'Queen Double');

-- 8 room units
DO $$
DECLARE
  th_kov_id UUID;
  th_kb_id UUID;
  th_q_id UUID;
  dx_ks_id UUID;
  dx_qd_id UUID;
BEGIN
  SELECT id INTO th_kov_id FROM room_types WHERE slug = 'traditional-house-king-ocean-view';
  SELECT id INTO th_kb_id FROM room_types WHERE slug = 'traditional-house-king';
  SELECT id INTO th_q_id FROM room_types WHERE slug = 'traditional-house-queen';
  SELECT id INTO dx_ks_id FROM room_types WHERE slug = 'deluxe-room-king-single';
  SELECT id INTO dx_qd_id FROM room_types WHERE slug = 'deluxe-room-queen-double';

  INSERT INTO room_units (room_type_id, unit_code) VALUES
    (th_kov_id, 'TH-KOV-01'),
    (th_kb_id,  'TH-KB-01'),
    (th_q_id,   'TH-Q-01'),
    (th_q_id,   'TH-Q-02'),
    (dx_ks_id,  'DX-KS-01'),
    (dx_ks_id,  'DX-KS-02'),
    (dx_qd_id,  'DX-QD-01'),
    (dx_qd_id,  'DX-QD-02');
END $$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Public read access for room_types (active only)
CREATE POLICY "Public read room_types"
  ON room_types FOR SELECT
  USING (true);

-- Public read access for room_units (active only)
CREATE POLICY "Public read active room_units"
  ON room_units FOR SELECT
  USING (is_active = true);

-- Public read access for room_photos
CREATE POLICY "Public read room_photos"
  ON room_photos FOR SELECT
  USING (true);

-- Public read access for rate_plans (future/active only)
CREATE POLICY "Public read rate_plans"
  ON rate_plans FOR SELECT
  USING (true);

-- Full access for authenticated admin
CREATE POLICY "Admin all room_types"
  ON room_types FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all room_units"
  ON room_units FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all room_photos"
  ON room_photos FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all rate_plans"
  ON rate_plans FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all guests"
  ON guests FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all bookings"
  ON bookings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin all payments"
  ON payments FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
