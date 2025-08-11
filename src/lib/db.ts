import { supabase } from './supabase'
import type { Antenne, Derangement, Profile, Station, Transmission } from './types'

export const db = {
  // Profiles
  profiles: {
    async get(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data as Profile
    },
    async upsert(profile: Partial<Profile> & { id: string }) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
        .single()
      if (error) throw error
      return data as Profile
    }
  },

  // Stations
  stations: {
    async getAll() {
      const { data, error } = await supabase
        .from('stations_de_base')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      // Map French DB columns to English Station type
      return (data || []).map((row: any) => ({
        id: row.id?.toString(),
        name: row.nom,
        location: row.localisation,
        status: mapStatus(row.statut),
        created_at: row.created_at || '',
        updated_at: row.updated_at || '',
        created_by: row.created_by || null,
        type: row.type || '',
        power: row.puissance || '',
        typeTech: row.typetech || ''
      })) as Station[];
    },
    async create(station: Omit<Station, 'id' | 'created_at' | 'updated_at'>) {
      // Map English fields to French DB columns
      const dbStation = {
        nom: station.name,
        localisation: station.location,
        statut: reverseMapStatus(station.status),
        type: (station as any).type || '',
        puissance: (station as any).power || '',
        typetech: (station as any).typeTech || '',
        created_by: station.created_by || null
      };
      const { data, error } = await supabase
        .from('stations_de_base')
        .insert(dbStation)
        .select()
        .single();
      if (error) throw error;
      return data as Station;
    },
    async update(id: string, updates: Partial<Station>) {
      // Map English fields to French DB columns for update
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.nom = updates.name;
      if (updates.location !== undefined) dbUpdates.localisation = updates.location;
      if (updates.status !== undefined) dbUpdates.statut = reverseMapStatus(updates.status as string);
      if ((updates as any).type !== undefined) dbUpdates.type = (updates as any).type;
      if ((updates as any).power !== undefined) dbUpdates.puissance = (updates as any).power;
      if ((updates as any).typeTech !== undefined) dbUpdates.typetech = (updates as any).typeTech;
      if (updates.created_by !== undefined) dbUpdates.created_by = updates.created_by;
      const { data, error } = await supabase
        .from('stations_de_base')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Station;
    }
  },

// Helper to map French status to English
function mapStatus(statut: string): 'active' | 'inactive' | 'maintenance' {
  switch ((statut || '').toLowerCase()) {
    case 'actif': return 'active';
    case 'inactif': return 'inactive';
    case 'maintenance': return 'maintenance';
    default: return 'inactive';
  }
}

// Helper to map English status to French
function reverseMapStatus(status: string): string {
  switch ((status || '').toLowerCase()) {
    case 'active': return 'Actif';
    case 'inactive': return 'Inactif';
    case 'maintenance': return 'Maintenance';
    default: return 'Inactif';
  }
}
  },

  // Antennes
  antennes: {
    async getByStation(stationId: string) {
      const { data, error } = await supabase
        .from('antennes')
        .select('*')
        .eq('station_id', stationId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as Antenne[]
    },
    async create(antenne: Omit<Antenne, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('antennes')
        .insert(antenne)
        .select()
        .single()
      if (error) throw error
      return data as Antenne
    },
    async update(id: string, updates: Partial<Antenne>) {
      const { data, error } = await supabase
        .from('antennes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Antenne
    }
  },

  // Transmissions
  transmissions: {
    async getByAntenne(antenneId: string) {
      const { data, error } = await supabase
        .from('transmissions')
        .select('*')
        .eq('antenne_id', antenneId)
        .order('start_time', { ascending: false })
      if (error) throw error
      return data as Transmission[]
    },
    async create(transmission: Omit<Transmission, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('transmissions')
        .insert(transmission)
        .select()
        .single()
      if (error) throw error
      return data as Transmission
    },
    async update(id: string, updates: Partial<Transmission>) {
      const { data, error } = await supabase
        .from('transmissions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Transmission
    }
  },

  // Derangements
  derangements: {
    async getByAntenne(antenneId: string) {
      const { data, error } = await supabase
        .from('derangements')
        .select('*')
        .eq('antenne_id', antenneId)
        .order('reported_at', { ascending: false })
      if (error) throw error
      return data as Derangement[]
    },
    async create(derangement: Omit<Derangement, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('derangements')
        .insert(derangement)
        .select()
        .single()
      if (error) throw error
      return data as Derangement
    },
    async update(id: string, updates: Partial<Derangement>) {
      const { data, error } = await supabase
        .from('derangements')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Derangement
    }
  },

  // Realtime subscriptions
  subscriptions: {
    onStationChanges(callback: (payload: { new: Station; old: Station | null }) => void) {
      return supabase
        .channel('station_changes')
        .on(
          'postgres_changes' as never,
          { event: '*', schema: 'public', table: 'stations' },
          callback as never
        )
        .subscribe()
    },
    onAntenneChanges(callback: (payload: { new: Antenne; old: Antenne | null }) => void) {
      return supabase
        .channel('antenne_changes')
        .on(
          'postgres_changes' as never,
          { event: '*', schema: 'public', table: 'antennes' },
          callback as never
        )
        .subscribe()
    },
    onDerangementChanges(callback: (payload: { new: Derangement; old: Derangement | null }) => void) {
      return supabase
        .channel('derangement_changes')
        .on(
          'postgres_changes' as never,
          { event: '*', schema: 'public', table: 'derangements' },
          callback as never
        )
        .subscribe()
    }
  }
}
