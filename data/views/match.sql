BEGIN;

CREATE VIEW match_view AS
  SELECT
    "player"."user_id" AS "id",
    "match"."id" AS "match_id",
    "score",
    "team_id_as_home",
    "team_id_as_outside"
  FROM "match"
    JOIN "meet" ON "meet"."id" = "match"."meet_id"
    JOIN "play" ON "play"."match_id" = "match"."id"
    JOIN "player" ON "player"."id" = "play"."player_id";

COMMIT;