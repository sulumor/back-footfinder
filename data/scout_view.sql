/*permet d'inclure les informations sur le joueur telles que la date de naissance, la nationalité, l'avatar, le genre, le pied fort et le nombre de matchs joués.*/

CREATE VIEW scout_view AS
SELECT
    scout.id AS scout_id,
    scout.club AS scout_club,
    scout.city AS scout_city,
    "user".id AS user_id,
    "user".firstname AS scout_firstname,
    "user".lastname AS scout_lastname,
    "user".email AS scout_email,
    "user".role_id AS scout_role_id
FROM
    "scout"
JOIN
    "user" ON scout.user_id = "user".id;
