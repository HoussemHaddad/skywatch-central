export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Station = {
  id: string
  name: string
  location: string | null
  status: 'active' | 'inactive' | 'maintenance'
  created_at: string
  updated_at: string
  created_by: string | null
}

export type Antenne = {
  id: string
  name: string
  type: string | null
  station_id: string
  status: 'active' | 'inactive' | 'maintenance'
  created_at: string
  updated_at: string
}

export type Transmission = {
  id: string
  antenne_id: string
  start_time: string
  end_time: string | null
  status: 'active' | 'completed' | 'failed' | 'cancelled'
  data_type: string | null
  created_at: string
  updated_at: string
}

export type Derangement = {
  id: string
  antenne_id: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  reported_at: string
  resolved_at: string | null
  created_at: string
  updated_at: string
  reported_by: string | null
}
