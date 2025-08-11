-- Insert sample stations de base
INSERT INTO stations_de_base (nom, localisation, statut, type, puissance) VALUES
('BTS-Tunis-001', 'Tunis Centre', 'Actif', '4G', '20W'),
('BTS-Sfax-002', 'Sfax Nord', 'Maintenance', '5G', '40W'),
('BTS-Sousse-003', 'Sousse Ville', 'Actif', '4G', '30W'),
('BTS-Bizerte-004', 'Bizerte Port', 'Inactif', '3G', '15W'),
('BTS-Gabes-005', 'Gabes Centre', 'Actif', '5G', '35W'),
('BTS-Kairouan-006', 'Kairouan Medina', 'Actif', '4G', '25W');

-- Insert sample transmissions
INSERT INTO transmissions (station_id, type, debit, statut, operateur) VALUES
(1, 'Fibre', '1Gbps', 'Actif', 'Tunisie Telecom'),
(2, 'Microwave', '500Mbps', 'Actif', 'Ooredoo'),
(3, 'Fibre', '2Gbps', 'Maintenance', 'Orange'),
(4, 'Satellite', '100Mbps', 'Inactif', 'Tunisie Telecom'),
(5, 'Fibre', '1.5Gbps', 'Actif', 'Tunisie Telecom'),
(6, 'Microwave', '800Mbps', 'Actif', 'Ooredoo');

-- Insert sample antennes
INSERT INTO antennes (station_id, type, frequence, azimut, inclinaison) VALUES
(1, 'Sectorielle', '2600MHz', '120°', '3°'),
(2, 'Omnidirectionnelle', '3500MHz', '0°', '0°'),
(3, 'Sectorielle', '1800MHz', '240°', '5°'),
(4, 'Directionnelle', '900MHz', '90°', '2°'),
(5, 'Sectorielle', '3500MHz', '180°', '4°'),
(6, 'Sectorielle', '2600MHz', '60°', '3°');

-- Insert sample derangements
INSERT INTO derangements (station_id, type, severite, description, date, statut) VALUES
(1, 'Panne équipement', 'Critique', 'Panne du contrôleur principal', '2024-01-15', 'En cours'),
(2, 'Problème réseau', 'Majeure', 'Latence élevée sur liaison', '2024-01-14', 'Résolu'),
(3, 'Maintenance', 'Mineure', 'Maintenance préventive', '2024-01-13', 'Planifié'),
(4, 'Panne alimentation', 'Critique', 'Coupure électrique', '2024-01-12', 'En cours'),
(5, 'Problème antenne', 'Majeure', 'Désalignement antenne sectorielle', '2024-01-11', 'Résolu'),
(6, 'Maintenance', 'Mineure', 'Mise à jour firmware', '2024-01-10', 'Planifié');
