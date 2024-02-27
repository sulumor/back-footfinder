BEGIN;

DROP FUNCTION IF EXISTS "delete_match", "delete_follow", "add_scout", "add_player", "update_player", "update_scout", "add_match", "update_match", "add_statistics", "update_statistics", "add_user", "add_follow";
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
  "meet_id" INT REFERENCES meet(id) ON DELETE SET NULL,
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
('avatar1.jpg', 'John', 'Doe', 'john.doe@email.com', 'hashed_password1', 2),
('avatar2.jpg', 'Jane', 'Smith', 'jane.smith@email.com', 'hashed_password2', 1),
('avatar3.jpg', 'Bob', 'Johnson', 'bob.johnson@email.com', 'hashed_password3', 2),
('avatar4.jpg', 'Alice', 'Williams', 'alice.williams@email.com', 'hashed_password4', 1),
('avatar5.jpg', 'Charlie', 'Brown', 'charlie.brown@email.com', 'hashed_password5', 2),
('avatar6.jpg', 'Eva', 'Miller', 'eva.miller@email.com', 'hashed_password6', 1),
('avatar7.jpg', 'David', 'Jones', 'david.jones@email.com', 'hashed_password7', 2),
('avatar8.jpg', 'Grace', 'Davis', 'grace.davis@email.com', 'hashed_password8', 1),
('avatar9.jpg', 'Frank', 'Wilson', 'frank.wilson@email.com', 'hashed_password9', 2),
('avatar10.jpg', 'Helen', 'Moore', 'helen.moore@email.com', 'hashed_password10', 1),
('avatar11.jpg', 'Isaac', 'Lee', 'isaac.lee@email.com', 'hashed_password11', 2),
('avatar12.jpg', 'Olivia', 'Taylor', 'olivia.taylor@email.com', 'hashed_password12', 1),
('avatar13.jpg', 'Jack', 'Harris', 'jack.harris@email.com', 'hashed_password13', 2),
('avatar14.jpg', 'Sophie', 'Clark', 'sophie.clark@email.com', 'hashed_password14', 1),
('avatar15.jpg', 'Mason', 'Allen', 'mason.allen@email.com', 'hashed_password15', 2),
('avatar16.jpg', 'Lucas', 'Martin', 'lucas.martin@email.com', 'hashed_password16', 1),
('avatar17.jpg', 'Emma', 'Brown', 'emma.brown@email.com', 'hashed_password17', 2),
('avatar18.jpg', 'Liam', 'Wilson', 'liam.wilson@email.com', 'hashed_password18', 1),
('avatar19.jpg', 'Ava', 'Anderson', 'ava.anderson@email.com', 'hashed_password19', 2),
('avatar20.jpg', 'Noah', 'Garcia', 'noah.garcia@email.com', 'hashed_password20', 1),
('avatar21.jpg', 'Sophia', 'Martinez', 'sophia.martinez@email.com', 'hashed_password21', 2),
('avatar22.jpg', 'William', 'Taylor', 'william.taylor@email.com', 'hashed_password22', 1),
('avatar23.jpg', 'Isabella', 'Hernandez', 'isabella.hernandez@email.com', 'hashed_password23', 2),
('avatar24.jpg', 'James', 'Young', 'james.young@email.com', 'hashed_password24', 1),
('avatar25.jpg', 'Benjamin', 'King', 'benjamin.king@email.com', 'hashed_password25', 2),
('avatar26.jpg', 'Olivia', 'Wright', 'olivia.wright@email.com', 'hashed_password26', 1),
('avatar27.jpg', 'Emma', 'Lopez', 'emma.lopez@email.com', 'hashed_password27', 2),
('avatar28.jpg', 'Alexander', 'Hill', 'alexander.hill@email.com', 'hashed_password28', 1),
('avatar29.jpg', 'Mia', 'Scott', 'mia.scott@email.com', 'hashed_password29', 2),
('avatar30.jpg', 'Daniel', 'Green', 'daniel.green@email.com', 'hashed_password30', 1),
('avatar31.jpg', 'Ethan', 'Adams', 'ethan.adams@email.com', 'hashed_password31', 2),
('avatar32.jpg', 'Charlotte', 'Baker', 'charlotte.baker@email.com', 'hashed_password32', 1),
('avatar33.jpg', 'Amelia', 'Rivera', 'amelia.rivera@email.com', 'hashed_password33', 2),
('avatar34.jpg', 'Jacob', 'Perez', 'jacob.perez@email.com', 'hashed_password34', 1);



INSERT INTO player(birth_date, nationality, genre, height, weight, strong_foot, number_of_matches_played, user_id, position_id) VALUES
('1993-05-21', 'Brésilien', 'Homme', 183, 63, 'Droit', 50, 1, 13),
('1995-08-14', 'Espagnol', 'Homme', 193, 93,'Gauche', 30, 3, 2),
('1990-12-03', 'Anglais', 'Homme', 185, 69,'Droit', 80, 5, 3),
('1992-04-18', 'Allemand', 'Homme', 143, 43,'Gauche', 60, 7, 4),
('1994-09-02', 'Argentin', 'Homme', 194, 87,'Droit', 45, 9, 5),
('1996-01-25', 'Italien', 'Homme', 183, 79,'Gauche', 70, 11, 6),
('1991-06-08', 'Français', 'Homme', 180, 83,'Droit', 55, 13, 7),
('1998-02-15', 'Portugais', 'Homme',198, 110, 'Gauche', 40, 15, 8),
('1999-10-30', 'Néerlandais', 'Homme',200, 99, 'Droit', 65, 17, 9),
('1997-07-14', 'Belge', 'Homme',181, 73, 'Gauche', 75, 19, 10),
('1993-11-28', 'Suédois', 'Homme', 178, 63,'Droit', 62, 21, 1),
('1993-05-22', 'Brésilien', 'Homme', 184, 65, 'Droit', 52, 23, 13),
('1995-08-15', 'Espagnol', 'Homme', 190, 95,'Gauche', 32, 25, 2),
('1990-12-04', 'Anglais', 'Homme', 182, 70,'Droit', 82, 27, 3),
('1992-04-19', 'Allemand', 'Homme', 148, 48,'Gauche', 62, 29, 4),
('1994-09-03', 'Argentin', 'Homme', 196, 90,'Droit', 47, 31, 5),
('1996-01-26', 'Italien', 'Homme', 186, 81,'Gauche', 72, 33, 6),
('1991-06-09', 'Français', 'Homme', 183, 85,'Droit', 57, 35, 7),
('1998-02-16', 'Portugais', 'Homme',195, 115, 'Gauche', 42, 37, 8),
('1999-10-31', 'Néerlandais', 'Homme',202, 105, 'Droit', 67, 39, 9);

INSERT INTO scout(club, city, user_id) VALUES
('RC Lens', 'Lens', 2),
('Olympique Marseille', 'Marseille', 4),
('Real Madrid', 'Madrid', 6),
('Paris Saint-Germain', 'Paris', 8),
('Chelsea FC', 'London', 10),
('AC Milan', 'Milan', 12),
('Bayern Munich', 'Munich', 14),
('RC Lens', 'Lens', 16),
('RC Lens', 'Lens', 18),
('FC Barcelona', 'Barcelona', 20),
('Bayern Munich', 'Munich', 22),
('Manchester City', 'Manchester', 24),
('Juventus FC', 'Turin', 26),
('Atletico Madrid', 'Madrid', 28),
('Liverpool FC', 'Liverpool', 30),
('Borussia Dortmund', 'Dortmund', 32),
('Ajax Amsterdam', 'Amsterdam', 34),
('AC Milan', 'Milan', 36),
('Inter Milan', 'Milan', 38);

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
('2-2', 6,'2023-12-03T20:00:00Z'),
('1-0', 7,'2023-12-15T20:00:00Z'),
('0-1', 8,'2023-12-25T20:00:00Z'),
('3-1', 9,'2024-01-15T20:00:00Z'),
('1-3', 10,'2024-01-24T20:00:00Z'),
('1-0', 11,'2024-02-02T20:00:00Z'),
('2-0', 12,'2024-02-15T20:00:00Z'),
('0-0', 13,'2024-02-22T20:00:00Z'),
('-', 14,'2024-03-01T20:00:00Z'),
('-', 15,'2024-03-09T20:00:00Z'),
('-', 16,'2024-03-16T20:00:00Z'),
('-', 17,'2024-03-22T20:00:00Z'),
('-', 18,'2024-03-29T20:00:00Z'),
('-', 19,'2024-04-05T20:00:00Z'),
('-', 20,'2024-04-12T20:00:00Z'),
('2-1', 21,'2023-04-12T20:00:00Z'),
('0-0', 22,'2023-04-12T20:00:00Z'),
('1-3', 23,'2023-04-12T20:00:00Z');



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
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(2, 21),
(2, 22),
(2, 23);


INSERT INTO statistics(assists, goals_scored, minutes_played, red_card, yellow_card, stops, goals_conceded, fitness, match_id) VALUES
('1', '2', '70', '0', '0', '0', '0', 'En forme', 1),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 2),
('0', '1', '79', '0', '0', '0', '0', 'En forme', 3),
('3', '0', '92', '0', '0', '0', '0', 'En forme', 4),
('0', '1', '87', '0', '1', '0', '0', 'En forme', 5),
('0', '3', '95', '0', '0', '0', '0', 'En forme', 6),
('4', '0', '90', '0', '0', '0', '0', 'En forme', 7),
('0', '0', '0', '0', '0', '0', '0', 'absent', 8),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 9),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 10),
('0','0', '0',  '0', '0', '0', '0',  'absent', 11),
('0', '0', '90', '0', '3', '0', '0', 'En forme', 12),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 13),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 17),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 18),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 19),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 20),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 21),
('0', '0', '90', '0', '0', '0', '0', 'En forme', 22),
('0','0', '0',  '0', '0', '0', '0',  'absent', 23);



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