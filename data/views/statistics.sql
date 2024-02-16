BEGIN;

CREATE VIEW statistics_view AS
    SELECT
        "player"."id" AS "id",
        "match"."id" AS "match_id",
        "score",
        "team_id_as_home",
        "team_id_as_outside",
        "assists",
        "goals_scored",
        "minutes_played",
        "red_card",
        "yellow_card",
        "stops",
        "goals_conceded",
        "fitness"
    FROM "match"
        JOIN "meet" ON "meet"."id" = "match"."meet_id"
        JOIN "play" ON "play"."match_id" = "match"."id"
        JOIN "player" ON "player"."id" = "play"."player_id"
        JOIN "statistics" ON "statistics"."match_id" =  "match"."id";

COMMIT;
