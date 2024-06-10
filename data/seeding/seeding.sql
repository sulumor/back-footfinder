-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "gender", "position", "nationality" RESTART IDENTITY CASCADE;


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


COMMIT;
