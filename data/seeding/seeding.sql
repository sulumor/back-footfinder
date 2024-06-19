-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "gender", "position", "nationality", "team" RESTART IDENTITY CASCADE;


INSERT INTO gender(label) VALUES
('Homme'),
('Femme'),
('Non-binaire');


INSERT INTO position(label) VALUES 
('Gardien'),
('Libéro'),
('Défenseur gauche'),
('Défenseur droit'),
('Milieu défensif gauche'),
('Milieu défensif droit'),
('Milieu défensif central'),
('Milieu gauche'),
('Milieu droit'),
('Milieu offensif'),
('Ailier gauche'),
('Ailier droit'),
('Attaquant'),
('Avant-centre'),
('Remplaçant');

INSERT INTO nationality(label) VALUES 
('Française'),
('Algérienne'),
('Marocaine'),
('Tunisienne'),
('Portugaise'),
('Italienne'),
('Espagnole'),
('Turque'),
('Britannique'),
('Allemande'),
('Belge'),
('Roumaine'),
('Polonaise'),
('Sénégalaise'),
('Malienne'),
('Ivoirienne'),
('Congolaise (RDC)'),
('Camerounaise'),
('Chinoise'),
('Indienne'),
('Pakistanaise'),
('Sri Lankaise'),
('Bangladaise'),
('Brésilienne'),
('Américaine'),
('Canadienne'),
('Russe'),
('Vietnamienne'),
('Philippine'),
('Libanaise');

INSERT INTO team(club_name, stadium_name,  logo, adress, zip_code, city, latitude, longitude) VALUES
('RC Lens', 'Stade Bollaert-Delelis', 'SVG' ,'177 av. Alfred Maes', '62300', 'Lens', 50.253495, 24.83207),
('Paris Saint-Germain', 'Parc des Princes', 'psg_logo.png', '123 Avenue des Champs-Élysées', '75008', 'Paris', 48.8566, 2.3522),
('Olympique de Marseille', 'Stade Vélodrome', 'om_logo.png', '456 Rue de la République', '13001', 'Marseille', 43.2965, 5.3699),
('Olympique Lyonnais', 'Groupama Stadium', 'ol_logo.png', '789 Rue de Gerland', '69007', 'Lyon', 45.7235, 4.8322),
('AS Monaco', 'Stade Louis II', 'monaco_logo.png', '101 Avenue des Papalins', '98000', 'Monaco', 43.7325, 7.4188),
('Lille OSC', 'Stade Pierre-Mauroy', 'lille_logo.png', '202 Rue de l''Hôtel de Ville', '59000', 'Lille', 50.6292, 3.0572),
('FC Nantes', 'Stade de la Beaujoire', 'nantes_logo.png', '303 Quai Malakoff', '44000', 'Nantes', 47.2388, -1.5649),
('Stade Rennais FC', 'Roazhon Park', 'rennes_logo.png', '404 Route de Lorient', '35000', 'Rennes', 48.1056, -1.6660),
('OGC Nice', 'Allianz Riviera', 'nice_logo.png', '505 Boulevard des Jardiniers', '06200', 'Nice', 43.7034, 7.2663),
('Strasbourg', 'Stade de la Meinau', 'strasbourg_logo.png', '606 Route du Polygone', '67100', 'Strasbourg', 48.5937, 7.7476),
('Montpellier HSC', 'Stade de la Mosson', 'montpellier_logo.png', '707 Avenue du Mondial 98', '34080', 'Montpellier', 43.6022, 3.9085),
('Bordeaux', 'Stade Matmut-Atlantique', 'bordeaux_logo.png', '808 Cours Jules Ladoumegue', '33300', 'Bordeaux', 44.9283, -0.5583),
('Angers SCO', 'Stade Raymond Kopa', 'angers_logo.png', '909 Boulevard Pierre de Coubertin', '49000', 'Angers', 47.4647, -0.5513),
('AS Saint-Étienne', 'Stade Geoffroy-Guichard', 'st_etienne_logo.png', '101 Rue du Collège', '42000', 'Saint-Étienne', 45.4507, 4.3875),
('FC Metz', 'Stade Saint-Symphorien', 'metz_logo.png', '121 Rue Saint-Symphorien', '57050', 'Metz', 49.1128, 6.1774),
('Dijon FCO', 'Stade Gaston Gérard', 'dijon_logo.png', '131 Rue du Stade', '21000', 'Dijon', 47.2322, 5.0415),
('Nîmes Olympique', 'Stade des Costières', 'nimes_logo.png', '151 Avenue de la Bouvine', '30000', 'Nîmes', 43.8383, 4.3601);

COMMIT;
