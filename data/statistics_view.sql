CREATE VIEW statistics_view AS
SELECT
    stats.id AS statistics_id,
    stats.assists,
    stats.goals_scored,
    stats.minutes_played,
    stats.red_card,
    stats.yellow_card,
    stats.stops,
    stats.goals_conceded,
    stats.fitness,
    match.id AS match_id,
    match.score,
    match.meet_id,
    player.id AS player_id,
    player.genre,
    player.strong_foot,
    player.number_of_matches_played,
    "user".id AS user_id,
    "user".firstname AS player_firstname,
    "user".lastname AS player_lastname,
    position.id AS position_id,
    position.label AS position_label
FROM
    "statistics"
JOIN
    "match" ON stats.match_id = "match".id
JOIN
    "player" ON stats.player_id = player.id
JOIN
    "user" ON player.user_id = "user".id
JOIN
    position ON player.position_id = position.id;
