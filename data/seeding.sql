BEGIN;


INSERT INTO role(libellé) VALUES
('joueur'),
('recruteur');


INSERT INTO utilisateur(nom, prénom, email, mot_de_passe, role_id) VALUES
('Dujardin', 'Jean', 'jean.dujardin@mail.io','yjjk8E676a9JQZ', 1),
('Dupont', 'Nicolas', 'nicolas.dupon@mail.io','X346Dc5V7kfYmv', 2),
('Ronaldo', 'Cristiano', 'cr7@mail.io', '629Mc9Jh7KEepk', 1),
('Barnett', 'Jonathan', 'jonh.barnett@mail.io', '3E62gp8Sn9KeHf', 2),
('Maradona', 'Diego', 'elpibedeoro@mail.io', 'tNs7PcBwp4556E', 1);


INSERT INTO poste(libellé) VALUES 
('attaquant'),
('défenseur'),
('gardien'),
('milieu de terrain');

INSERT INTO joueur(date_de_naissance, nationalité, avatar, genre, pied_fort, nombre_de_match_joué,utilisateur_id, poste_id) VALUES
('19/06/1982', 'français', 'SVG', 'masculin', 'gauche', 20, 1, 1),
('05/01/1990', 'français', 'SVG', 'masculin', 'droite', 30, 3, 2),
('11/12/1996', 'français', 'SVG', 'masculin', 'gauche', 12, 5, 4);

INSERT INTO recruteur(club, ville, utilisateur_id) VALUES
('RCLens', 'Lens', 2),
('OM', 'Marseille', 4);

INSERT INTO equipe(nom_club, logo, adresse, code_postal, ville, latitude, longitude) VALUES
('RCLens', 'SVG' ,'177 av. Alfred Maes', '62300', 'Lens', '50.253495', '24.83207'),
('OM', 'SVG' ,'3 boulevard Michelet', '13008', 'Marseille', '43.27008', '53.95660');

INSERT INTO match(score, rencontre_id) VALUES
('2', 1),
('3', 2);

INSERT INTO statistique(passes_decisives, buts_marqués, minutes_jouées, carton_rouge, carton_jaune, arrêts, buts_encaissés, forme_physique, match_id) VALUES
('12', '2', '70', '0', '1', '0', '1', 'En forme', 1),
('7', '1', '93', '1', '2', '0', '2', 'En forme', 2);

INSERT INTO rencontrer(equipe_id_comme_domicile, equipe_id_comme_extérieur) VALUES
(1, 2),
(2, 1);

INSERT INTO rattacher(joueur_id, equipe_id, saison) VALUES
(1, 1, 2023),
(2, 2, 2023),
(4, 1, 2023);

INSERT INTO suivre(joueur_id, recruteur) VALUES
(1, 2),
(3, 4),
(5, 4);


COMMIT;