-- Add new columns to stations_de_base table
ALTER TABLE stations_de_base 
ADD COLUMN IF NOT EXISTS typetech VARCHAR(100),
ADD COLUMN IF NOT EXISTS fournisseur VARCHAR(255),
ADD COLUMN IF NOT EXISTS hauteur_support VARCHAR(50);

-- Update existing records with sample data
UPDATE stations_de_base SET 
    typetech = CASE 
        WHEN type = '5G' THEN 'Massive MIMO'
        WHEN type = '4G' THEN 'LTE Advanced'
        ELSE 'UMTS'
    END,
    fournisseur = CASE 
        WHEN id % 3 = 0 THEN 'Ericsson'
        WHEN id % 3 = 1 THEN 'Nokia'
        ELSE 'Huawei'
    END,
    hauteur_support = CASE 
        WHEN id % 4 = 0 THEN '30m'
        WHEN id % 4 = 1 THEN '25m'
        WHEN id % 4 = 2 THEN '35m'
        ELSE '40m'
    END
WHERE typetech IS NULL OR fournisseur IS NULL OR hauteur_support IS NULL;
