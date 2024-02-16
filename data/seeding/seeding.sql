-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "role", "position" RESTART IDENTITY CASCADE;


INSERT INTO role(label) VALUES
('joueur'),
('recruteur');


INSERT INTO position(label) VALUES 
('gardien'),
('libéro'),
('défenseur gauche'),
('défenseur droit'),
('milieu défensif gauche'),
('milieu défensif droit'),
('milieu défensif central'),
('milieu gauche'),
('milieu droit'),
('milieu offensif'),
('ailier gauche'),
('ailier droit'),
('attaquant'),
('avant-centre'),
('remplaçant');


COMMIT;
