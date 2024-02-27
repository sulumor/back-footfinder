BEGIN;

DROP FUNCTION IF EXISTS "delete_follow", "add_scout", "add_player", "update_player", "update_scout", "add_match", "update_match", "add_statistics", "update_statistics", "add_user", "add_follow";
DROP VIEW IF EXISTS "player_view","scout_view","statistics_view","team_view","match_view", "auth_view";
DROP TABLE IF EXISTS "role","user", "position", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow";

CREATE TABLE "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "avatar" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role_id" INT NOT NULL REFERENCES role(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "position" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "player" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "birth_date" DATE,
  "nationality" TEXT NOT NULL,
  "genre" TEXT NOT NULL,
  "height" INT NOT NULL,
  "weight" INT NOT NULL,
  "strong_foot" TEXT NOT NULL,
  "number_of_matches_played" INT NOT NULL DEFAULT 0,
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "position_id" INT REFERENCES position(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "scout" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club" TEXT DEFAULT NULL,
  "city" TEXT NOT NULL,
  "user_id" INT REFERENCES "user"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "team" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club_name" TEXT NOT NULL,
  "stadium_name" TEXT NOT NULL,
  "logo" TEXT NOT NULL,
  "adress" TEXT NOT NULL,
  "zip_code" TEXT NOT NULL CHECK(
    "zip_code" ~ '^\d{5}$'),
  "city" TEXT NOT NULL,
  "latitude" NUMERIC(8,6) NOT NULL,
  "longitude" NUMERIC(8,6) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "meet" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  "team_id_as_home" INT REFERENCES team(id),
  "team_id_as_outside" INT REFERENCES team(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "match" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "score" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "meet_id" INT REFERENCES meet(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "play" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "player_id" INT REFERENCES player(id),
  "match_id" INT REFERENCES match(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "statistics" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "assists" INT DEFAULT NULL,
  "goals_scored" INT DEFAULT NULL,
  "minutes_played" INT DEFAULT NULL,
  "red_card" INT DEFAULT NULL,
  "yellow_card" INT DEFAULT NULL,
  "stops" INT DEFAULT NULL,
  "goals_conceded" INT DEFAULT NULL,
  "fitness" TEXT DEFAULT NULL,
  "match_id" INT REFERENCES match(id) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "link" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "player_id" INT REFERENCES player(id),
  "team_id" INT REFERENCES team(id),
  "season" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "follow" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
  "player_id" INT REFERENCES player(id),
  "scout_id" INT REFERENCES scout(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

TRUNCATE TABLE "role", "position", "user", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow" RESTART IDENTITY CASCADE;

INSERT INTO role(label) VALUES
  ('joueur'),
  ('recruteur');


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

INSERT INTO "user"(avatar,firstname,lastname, email, password, role_id) VALUES
('SVG','Jean', 'Dujardin', 'jean.dujardin@mail.io','$2b$12$jRVrTwaorAHZFzfiNI/ZJeAYKWHvxoYn0fJNtsAMbxL1jVwZ7b3dW', 1),
('SVG',  'Nicolas', 'Dupont', 'nicolas.dupon@mail.io','$2b$12$Uw9.Ybd93sL7MF.TQwLbzOwOjU9gPsQaM5pj66eOjD4A1C444M5ku', 2),
('SVG',  'Cristiano', 'Ronaldo', 'cr7@mail.io', '629Mc9Jh7KEepk', 1),
('SVG',  'Jonathan', 'Barnett', 'jonh.barnett@mail.io', '3E62gp8Sn9KeHf', 2),
('SVG',  'Diego', 'Maradona','elpibedeoro@mail.io', 'tNs7PcBwp4556E', 1),
('avatar1.jpg', 'John', 'Doe', 'john.doe@email.com', 'hashed_password1', 1),
('avatar2.jpg', 'Jane', 'Smith', 'jane.smith@email.com', 'hashed_password2', 2),
('avatar3.jpg', 'Bob', 'Johnson', 'bob.johnson@email.com', 'hashed_password3', 1),
('avatar4.jpg', 'Alice', 'Williams', 'alice.williams@email.com', 'hashed_password4', 2),
('avatar5.jpg', 'Charlie', 'Brown', 'charlie.brown@email.com', 'hashed_password5', 1),
('avatar6.jpg', 'Eva', 'Miller', 'eva.miller@email.com', 'hashed_password6', 2),
('avatar7.jpg', 'David', 'Jones', 'david.jones@email.com', 'hashed_password7', 1),
('avatar8.jpg', 'Grace', 'Davis', 'grace.davis@email.com', 'hashed_password8', 2),
('avatar9.jpg', 'Frank', 'Wilson', 'frank.wilson@email.com', 'hashed_password9', 1),
('avatar10.jpg', 'Helen', 'Moore', 'helen.moore@email.com', 'hashed_password10', 2),
('avatar11.jpg', 'Isaac', 'Lee', 'isaac.lee@email.com', 'hashed_password11', 1),
('avatar12.jpg', 'Olivia', 'Taylor', 'olivia.taylor@email.com', 'hashed_password12', 2),
('avatar13.jpg', 'Jack', 'Harris', 'jack.harris@email.com', 'hashed_password13', 1),
('avatar14.jpg', 'Sophie', 'Clark', 'sophie.clark@email.com', 'hashed_password14', 2),
('avatar15.jpg', 'Mason', 'Allen', 'mason.allen@email.com', 'hashed_password15', 1),
('avatar16.jpg', 'Lucas', 'Martin', 'lucas.martin@email.com', 'hashed_password16', 2),
('avatar17.jpg', 'Emma', 'Brown', 'emma.brown@email.com', 'hashed_password17', 1),
('avatar18.jpg', 'Liam', 'Wilson', 'liam.wilson@email.com', 'hashed_password18', 2),
('avatar19.jpg', 'Ava', 'Anderson', 'ava.anderson@email.com', 'hashed_password19', 1),
('avatar20.jpg', 'Noah', 'Garcia', 'noah.garcia@email.com', 'hashed_password20', 2),
('avatar21.jpg', 'Sophia', 'Martinez', 'sophia.martinez@email.com', 'hashed_password21', 1),
('avatar22.jpg', 'William', 'Taylor', 'william.taylor@email.com', 'hashed_password22', 2),
('avatar23.jpg', 'Isabella', 'Hernandez', 'isabella.hernandez@email.com', 'hashed_password23', 1),
('avatar24.jpg', 'James', 'Young', 'james.young@email.com', 'hashed_password24', 2),
('avatar25.jpg', 'Benjamin', 'King', 'benjamin.king@email.com', 'hashed_password25', 1),
('avatar26.jpg', 'Olivia', 'Wright', 'olivia.wright@email.com', 'hashed_password26', 2),
('avatar27.jpg', 'Emma', 'Lopez', 'emma.lopez@email.com', 'hashed_password27', 1),
('avatar28.jpg', 'Alexander', 'Hill', 'alexander.hill@email.com', 'hashed_password28', 2),
('avatar29.jpg', 'Mia', 'Scott', 'mia.scott@email.com', 'hashed_password29', 1),
('avatar30.jpg', 'Daniel', 'Green', 'daniel.green@email.com', 'hashed_password30', 2),
('avatar31.jpg', 'Ethan', 'Adams', 'ethan.adams@email.com', 'hashed_password31', 1),
('avatar32.jpg', 'Charlotte', 'Baker', 'charlotte.baker@email.com', 'hashed_password32', 2),
('avatar33.jpg', 'Amelia', 'Rivera', 'amelia.rivera@email.com', 'hashed_password33', 1),
('avatar34.jpg', 'Jacob', 'Perez', 'jacob.perez@email.com', 'hashed_password34', 2);



INSERT INTO player(birth_date, nationality, genre, height, weight, strong_foot, number_of_matches_played, user_id, position_id) VALUES
('1993-05-21', 'Brésilien', 'Homme', 183, 63, 'Droit', 50, 1, 13),
('1995-08-14', 'Espagnol', 'Homme', 193, 93,'Gauche', 30, 4, 2),
('1990-12-03', 'Anglais', 'Homme', 185, 69,'Droit', 80, 6, 3),
('1992-04-18', 'Allemand', 'Homme', 143, 43,'Gauche', 60, 8, 4),
('1994-09-02', 'Argentin', 'Homme', 194, 87,'Droit', 45, 10, 5),
('1996-01-25', 'Italien', 'Homme', 183, 79,'Gauche', 70, 12, 6),
('1991-06-08', 'Français', 'Homme', 180, 83,'Droit', 55, 14, 7),
('1998-02-15', 'Portugais', 'Homme',198, 110, 'Gauche', 40, 16, 8),
('1999-10-30', 'Néerlandais', 'Homme',200, 99, 'Droit', 65, 18, 9),
('1997-07-14', 'Belge', 'Homme',181, 73, 'Gauche', 75, 20, 10),
('1993-11-28', 'Suédois', 'Homme', 178, 63,'Droit', 62, 22, 1),
('1993-05-22', 'Brésilien', 'Homme', 184, 65, 'Droit', 52, 3, 13),
('1995-08-15', 'Espagnol', 'Homme', 190, 95,'Gauche', 32, 5, 2),
('1990-12-04', 'Anglais', 'Homme', 182, 70,'Droit', 82, 7, 3),
('1992-04-19', 'Allemand', 'Homme', 148, 48,'Gauche', 62, 9, 4),
('1994-09-03', 'Argentin', 'Homme', 196, 90,'Droit', 47, 11, 5),
('1996-01-26', 'Italien', 'Homme', 186, 81,'Gauche', 72, 13, 6),
('1991-06-09', 'Français', 'Homme', 183, 85,'Droit', 57, 15, 7),
('1998-02-16', 'Portugais', 'Homme',195, 115, 'Gauche', 42, 17, 8),
('1999-10-31', 'Néerlandais', 'Homme',202, 105, 'Droit', 67, 19, 9),
('1997-07-15', 'Belge', 'Homme',184, 75, 'Gauche', 77, 21, 10),
('1993-11-29', 'Suédois', 'Homme', 181, 65,'Droit', 64, 23, 1),
('1993-05-23', 'Brésilien', 'Homme', 182, 67, 'Droit', 54, 4, 13),
('1995-08-16', 'Espagnol', 'Homme', 189, 97,'Gauche', 34, 6, 2),
('1990-12-05', 'Anglais', 'Homme', 184, 73,'Droit', 84, 8, 3),
('1992-04-20', 'Allemand', 'Homme', 150, 53,'Gauche', 64, 10, 4),
('1994-09-04', 'Argentin', 'Homme', 198, 92,'Droit', 49, 12, 5),
('1996-01-27', 'Italien', 'Homme', 188, 83,'Gauche', 74, 14, 6),
('1991-06-10', 'Français', 'Homme', 186, 87,'Droit', 59, 16, 7),
('1998-02-17', 'Portugais', 'Homme',196, 120, 'Gauche', 44, 18, 8),
('1999-11-01', 'Néerlandais', 'Homme',204, 110, 'Droit', 69, 20, 9),
('1997-07-16', 'Belge', 'Homme',187, 77, 'Gauche', 79, 22, 10),
('1993-11-30', 'Suédois', 'Homme', 183, 67,'Droit', 66, 2, 1);

INSERT INTO scout(club, city, user_id) VALUES
('RC Lens', 'Lens', 2),
('Olympique Marseille', 'Marseille', 4),
('Real Madrid', 'Madrid', 7),
('Paris Saint-Germain', 'Paris', 9),
('Chelsea FC', 'London', 11),
('AC Milan', 'Milan', 13),
('Bayern Munich', 'Munich', 15),
('RC Lens', 'Lens', 17),
('RC Lens', 'Lens', 19),
('FC Barcelona', 'Barcelona', 3),
('Bayern Munich', 'Munich', 8),
('Manchester City', 'Manchester', 10),
('Juventus FC', 'Turin', 12),
('Atletico Madrid', 'Madrid', 16),
('Liverpool FC', 'Liverpool', 18),
('Borussia Dortmund', 'Dortmund', 20),
('Ajax Amsterdam', 'Amsterdam', 21),
('AC Milan', 'Milan', 22),
('Inter Milan', 'Milan', 23),
('Olympique Lyonnais', 'Lyon', 24),
('AS Roma', 'Rome', 25),
('Valencia CF', 'Valencia', 26),
('Sevilla FC', 'Seville', 27),
('Lille OSC', 'Lille', 28),
('SSC Napoli', 'Naples', 29),
('Everton FC', 'Liverpool', 30),
('FC Porto', 'Porto', 31),
('Bayer Leverkusen', 'Leverkusen', 32),
('AS Monaco', 'Monaco', 33),
('Villarreal CF', 'Villarreal', 34),
('Tottenham Hotspur', 'London', 35),
('Leicester City', 'Leicester', 37),
('Sporting Lisbon', 'Lisbon', 38),
('SS Lazio', 'Rome', 39);

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
(12, 1),
(2, 3),
(5, 6),
(4, 7),
(10, 8),
(1, 9),
(11, 2),
(3, 12),
(13, 4),
(9, 14),
(15, 1),
(6, 16),
(2, 17),
(4, 11),
(8, 5),
(12, 6),
(1, 10);

INSERT INTO match(score, meet_id, date) VALUES
('2-0', 1,'2023-09-22T20:00:00Z'),
('0-2', 2,'2023-09-29T20:00:00Z'),
('1-1', 3,'2023-10-19T20:00:00Z'),
('0-1', 4,'2023-10-26T20:00:00Z'),
('1-2', 5,'2023-11-22T20:00:00Z'),
('2-2', 6,'2024-01-03T20:00:00Z'),
('1-0', 7,'2024-02-15T20:00:00Z'),
('0-1', 8,'2024-03-01T20:00:00Z'),
('3-1', 9,'2023-09-23T20:00:00Z'),
('1-3', 10,'2023-09-30T20:00:00Z'),
('1-0', 11,'2023-10-20T20:00:00Z'),
('2-0', 12,'2023-10-27T20:00:00Z'),
('0-0', 13,'2023-11-23T20:00:00Z'),
('2-1', 14,'2024-01-04T20:00:00Z'),
('0-2', 15,'2024-02-16T20:00:00Z'),
('1-0', 16,'2024-03-02T20:00:00Z'),
('2-0', 17,'2023-09-24T20:00:00Z'),
('1-1', 18,'2023-10-01T20:00:00Z'),
('0-3', 19,'2023-10-21T20:00:00Z'),
('2-1', 20,'2023-10-28T20:00:00Z');



INSERT INTO play(player_id, match_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1,10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20);


INSERT INTO statistics(assists, goals_scored, minutes_played, red_card, yellow_card, stops, goals_conceded, fitness, match_id) VALUES
('1', '2', '70', '0', '0', '0', '0', 'En forme', 1),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 2),
('0', '1', '79', '0', '0', '0', '0', 'En forme', 3),
('3', '0', '92', '0', '0', '0', '0', 'En forme', 4),
('0', '1', '87', '0', '1', '0', '0', 'En forme', 5),
('0', '3', '95', '0', '0', '0', '0', 'En forme', 6),
('4', '0', '90', '0', '0', '0', '0', 'En forme', 7),
('0', '0', '90', '0', '0', '0', '0', 'absent', 8),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 9),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 10),
('10','0', '90',  '0', '0', '0', '0',  'absent', 11),
('0', '0', '90', '0', '3', '0', '0', 'En forme', 12),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 13),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 14),
('0', '4', '90', '0', '0', '0', '0', 'En forme', 15),
('8', '0', '90', '0', '0', '0', '0', 'absent', 16),
('0', '10','90', '0', '1', '0', '0', 'En forme', 17),
('0', '0', '90', '0', '3', '0', '0', 'En forme', 18),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 19),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 20);



INSERT INTO link(player_id, team_id, season) VALUES
(1, 1, '2023-2024'),
(1, 6, '2022-2023'),
(1, 6, '2021-2022'),
(2, 2, '2023-2024'),
(3, 1, '2023-2024'),
(2, 3, '2023-2024'),
(3, 5, '2023-2024'),
(4, 4, '2023-2024'),
(5, 6, '2023-2024'),
(6, 2, '2023-2024'),
(7, 1, '2023-2024'),
(8, 5, '2023-2024'),
(9, 3, '2023-2024'),
(10, 4, '2023-2024'),
(11, 2, '2023-2024'),
(12, 1, '2023-2024'),
(13, 6, '2023-2024'),
(14, 3, '2023-2024'),
(15, 2, '2023-2024'),
(16, 1, '2023-2024'),
(17, 4, '2023-2024'),
(18, 5, '2023-2024'),
(19, 6, '2023-2024'),
(20, 3, '2023-2024');

INSERT INTO follow(player_id, scout_id) VALUES
(1, 2),
(1, 1),
(1, 5),
(1, 3),
(3, 1),
(2, 1);

COMMIT;