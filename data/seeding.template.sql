-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "role", "position" RESTART IDENTITY CASCADE;


INSERT INTO role(label) VALUES
('joueur'),
('recruteur');


INSERT INTO position(label) VALUES 
('attaquant'),
('défenseur'),
('gardien'),
('arrières latéraux'),
('milieu de terrain défensif'),
('milieu de terrain offensif');


COMMIT;
