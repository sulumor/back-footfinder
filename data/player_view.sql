/*affiche les informations détaillées sur chaque joueur, y compris la date de naissance, la nationalité, l'avatar, le genre, le pied fort, le nombre de matchs joués, ainsi que les informations sur l'utilisateur associé à chaque joueur (prénom, nom, email) et, le libellé de la position du joueur.*/

CREATE VIEW player_view AS
SELECT
    player.id AS player_id,
    player.birth_date,
    player.nationality,
    player.genre,
    player.strong_foot,
    player.number_of_matches_played,
    "user".id AS user_id,
    "user".firstname AS user_firstname,
    "user".lastname AS user_lastname,
    position.label AS position_label,
    team.club_name AS team_name,
    team.city AS team_city
FROM
    "player"

     JOIN
    "user" ON player.user_id = "user".id
 JOIN

    "position" ON player.position_id = "position".id;

    JOIN
    "team"  ON player.team_id = "team".id;
