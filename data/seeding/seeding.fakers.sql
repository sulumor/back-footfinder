-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "user", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow" RESTART IDENTITY CASCADE;


INSERT INTO "user"(avatar,firstname,lastname, email, password, role_id) VALUES
('SVG','Dujardin', 'Jean', 'jean.dujardin@mail.io','yjjk8E676a9JQZ', 1),
('SVG', 'Dupont', 'Nicolas', 'nicolas.dupon@mail.io','X346Dc5V7kfYmv', 2),
('SVG', 'Ronaldo', 'Cristiano', 'cr7@mail.io', '629Mc9Jh7KEepk', 1),
('SVG', 'Barnett', 'Jonathan', 'jonh.barnett@mail.io', '3E62gp8Sn9KeHf', 2),
('SVG', 'Maradona', 'Diego', 'elpibedeoro@mail.io', 'tNs7PcBwp4556E', 1);


INSERT INTO player(birth_date, nationality, genre, strong_foot, number_of_matches_played, user_id, position_id) VALUES
('19/06/1982', 'français', 'masculin', 'gauche', 20, 1, 1),
('05/01/1990', 'français', 'masculin', 'droite', 30, 3, 2),
('11/12/1996', 'français', 'masculin', 'gauche', 12, 5, 4);

INSERT INTO scout(club, city, user_id) VALUES
('RCLens', 'Lens', 2),
('OM', 'Marseille', 4);

INSERT INTO team(club_name, logo, adress, zip_code, city, latitude, longitude) VALUES
('RCLens', 'SVG' ,'177 av. Alfred Maes', '62300', 'Lens', '50.253495', '24.83207'),
('OM', 'SVG' ,'3 boulevard Michelet', '13008', 'Marseille', '43.27008', '53.95660');

INSERT INTO meet(team_id_as_home, team_id_as_outside) VALUES
(1, 2),
(2, 1);

INSERT INTO match(score, date, meet_id) VALUES
('2-3','2023-12-28', 1),
('3-1','2024-01-13', 2);


INSERT INTO play(player_id, match_id) VALUES
(1, 1),
(1, 2),
(3, 2),
(2, 1);

INSERT INTO statistics(assists, goals_scored, minutes_played, red_card, yellow_card, stops, goals_conceded, fitness, match_id) VALUES
('12', '2', '70', '0', '1', '0', '1', 'En forme', 1),
('7', '1', '93', '1', '2', '0', '2', 'En forme', 2);


INSERT INTO link(player_id, team_id, season) VALUES
(1, 1, '2023-2024'),
(1, 2, '2022-2023'),
(2, 2, '2023-2024'),
(3, 1, '2023-2024');

INSERT INTO follow(player_id, scout_id) VALUES
(1, 2),
(1, 1),
(3, 1),
(2, 1);


COMMIT;