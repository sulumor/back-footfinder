-- SQLBook: Code
CREATE VIEW match_view AS
SELECT
    match.id AS match_id,
    match.score,
    match.meet_id,
    player.id AS player_id,
    statistics.id AS statistics_id
FROM
    "match"
JOIN
    "player" ON match.player_id = player.id
JOIN
    "statistics" ON match.id = statistics.match_id;
