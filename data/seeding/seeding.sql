-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "role", "position" RESTART IDENTITY CASCADE;


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


COMMIT;
