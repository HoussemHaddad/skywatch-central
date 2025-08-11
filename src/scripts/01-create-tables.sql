-- Create stations_de_base table
CREATE TABLE IF NOT EXISTS stations_de_base (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    statut VARCHAR(50) CHECK (statut IN ('Actif', 'Maintenance', 'Inactif')) DEFAULT 'Actif',
    type VARCHAR(10) CHECK (type IN ('3G', '4G', '5G')) NOT NULL,
    puissance VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transmissions table
CREATE TABLE IF NOT EXISTS transmissions (
    id SERIAL PRIMARY KEY,
    station_id INTEGER REFERENCES stations_de_base(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('Fibre', 'Microwave', 'Satellite')) NOT NULL,
    debit VARCHAR(50) NOT NULL,
    statut VARCHAR(50) CHECK (statut IN ('Actif', 'Maintenance', 'Inactif')) DEFAULT 'Actif',
    operateur VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create antennes table
CREATE TABLE IF NOT EXISTS antennes (
    id SERIAL PRIMARY KEY,
    station_id INTEGER REFERENCES stations_de_base(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('Sectorielle', 'Omnidirectionnelle', 'Directionnelle')) NOT NULL,
    frequence VARCHAR(50) NOT NULL,
    azimut VARCHAR(50) NOT NULL,
    inclinaison VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create derangements table
CREATE TABLE IF NOT EXISTS derangements (
    id SERIAL PRIMARY KEY,
    station_id INTEGER REFERENCES stations_de_base(id) ON DELETE CASCADE,
    type VARCHAR(255) NOT NULL,
    severite VARCHAR(50) CHECK (severite IN ('Critique', 'Majeure', 'Mineure')) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    statut VARCHAR(50) CHECK (statut IN ('En cours', 'Résolu', 'Planifié')) DEFAULT 'En cours',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transmissions_station_id ON transmissions(station_id);
CREATE INDEX IF NOT EXISTS idx_antennes_station_id ON antennes(station_id);
CREATE INDEX IF NOT EXISTS idx_derangements_station_id ON derangements(station_id);
CREATE INDEX IF NOT EXISTS idx_derangements_statut ON derangements(statut);
CREATE INDEX IF NOT EXISTS idx_stations_statut ON stations_de_base(statut);
