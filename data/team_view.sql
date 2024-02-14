CREATE VIEW team_view AS
SELECT
    team.id AS team_id,
    team.club_name,
    team.logo,
    team.adress,
    team.zip_code,
    team.city,
    team.latitude,
    team.longitude,
    player.player_id,
    player.firstname AS player_firstname,
    player.lastname AS player_lastname
FROM
    "team" 
JOIN
    player_view  ON team.team_id = player.team_id;
