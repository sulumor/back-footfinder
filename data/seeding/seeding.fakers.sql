BEGIN;

TRUNCATE TABLE "user", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow" RESTART IDENTITY CASCADE;


INSERT INTO "user"(avatar,firstname,lastname, email, password, role_id) VALUES
('SVG','Dujardin', 'Jean', 'jean.dujardin@mail.io','yjjk8E676a9JQZ', 1),
('SVG', 'Dupont', 'Nicolas', 'nicolas.dupon@mail.io','X346Dc5V7kfYmv', 2),
('SVG', 'Ronaldo', 'Cristiano', 'cr7@mail.io', '629Mc9Jh7KEepk', 1),
('SVG', 'Barnett', 'Jonathan', 'jonh.barnett@mail.io', '3E62gp8Sn9KeHf', 2),
('SVG', 'Maradona', 'Diego', 'elpibedeoro@mail.io', 'tNs7PcBwp4556E', 1);


INSERT INTO player(birth_date, nationality, genre, height, weight,  strong_foot, number_of_matches_played, user_id, position_id) VALUES

('1993-05-21', 'Brésilien', 'Homme', 183, 63, 'Droit', 50, 1, 13),
('1995-08-14', 'Espagnol', 'Homme', 193, 93,'Gauche', 30, 3, 2),
('1990-12-03', 'Anglais', 'Homme', 185, 69,'Droit', 80, 5, 3),
('1992-04-18', 'Allemand', 'Homme', 143, 43,'Gauche', 60, 6, 4),
('1994-09-02', 'Argentin', 'Homme', 194, 87,'Droit', 45, 8, 5),
('1996-01-25', 'Italien', 'Homme', 183, 79,'Gauche', 70, 10, 6),
('1991-06-08', 'Français', 'Homme', 180, 83,'Droit', 55, 12, 7),
('1998-02-15', 'Portugais', 'Homme',198, 110, 'Gauche', 40, 14, 8),
('1999-10-30', 'Néerlandais', 'Homme',200, 99, 'Droit', 65, 16, 9),
('1997-07-14', 'Belge', 'Homme',181, 73, 'Gauche', 75, 18, 10),
('1993-11-28', 'Suédois', 'Homme', 178, 63,'Droit', 62, 20, 1);


INSERT INTO scout(club, city, user_id) VALUES
('RC Lens', 'Lens', 2),
('Olympique Marseille', 'Marseille', 4),
('Real Madrid', 'Madrid', 7),
('Paris Saint-Germain', 'Paris', 9),
('Chelsea FC', 'London', 11),
('AC Milan', 'Milan', 13),
('Bayern Munich', 'Munich', 15),
('RC Lens', 'Lens', 17),
('RC Lens', 'Lens', 19);

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


INSERT INTO meet(team_id_as_home, team_id_as_outside) VALUES
(1, 2),
(3, 1),
(1, 5),
(8, 1),
(1, 4),
(9, 1),
(12, 1);

INSERT INTO match(score, meet_id) VALUES
('2-3', 1),
('3-1', 2);


INSERT INTO play(player_id, match_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

INSERT INTO statistics(assists, goals_scored, minutes_played, red_card, yellow_card, stops, goals_conceded, fitness, match_id) VALUES
('1', '2', '70', '0', '0', '0', '0', 'En forme', 1),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 2),
('0', '1', '79', '0', '0', '0', '0', 'En forme', 3),
('0', '0', '92', '0', '0', '0', '0', 'En forme', 4),
('0', '1', '87', '0', '1', '0', '0', 'En forme', 5),
('0', '3', '95', '0', '0', '0', '0', 'En forme', 6),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 7);


INSERT INTO link(player_id, team_id, season) VALUES
(1, 1, '2023-2024'),
(1, 6, '2022-2023'),
(1, 6, '2021-2022'),
(2, 2, '2023-2024'),
(3, 1, '2023-2024');

INSERT INTO follow(player_id, scout_id) VALUES
(1, 2),
(1, 1),
(1, 5),
(1, 3),
(3, 1),
(2, 1);


COMMIT;