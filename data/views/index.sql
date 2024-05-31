BEGIN;

DROP VIEW IF EXISTS "player_view","scout_view","statistics_view","team_view","match_view", "auth_view";

CREATE VIEW match_view AS
  SELECT
    "player"."user_id" AS "id",
    "match"."id" AS "match_id",
    "score",
    "date",
    "team_id_as_home",
    "team_id_as_outside"
  FROM "match"
    JOIN "meet" ON "meet"."id" = "match"."meet_id"
    JOIN "play" ON "play"."match_id" = "match"."id"
    JOIN "player" ON "player"."id" = "play"."player_id";

CREATE VIEW player_view AS  
    SELECT "user"."id" AS "id",
    "player"."id" AS "player_id",
        "firstname",
        "lastname",
        "email",
        "birth_date",
        "nationality", 
        "avatar",
        "genre",
        "height",
        "weight",
        "strong_foot",
        ARRAY_AGG( DISTINCT "link"."team_id") AS "team_id",
        ARRAY_AGG( DISTINCT "follow"."scout_id") AS "scout_id", 
        "position"."label" AS "position",
        "number_of_matches_played",
        "role"."label" AS "role"  
    FROM "player" 
        FULL JOIN "user" ON "player"."user_id" = "user"."id"
        FULL JOIN "position" ON "player"."position_id" = "position"."id"
        FULL JOIN "role" ON "user"."role_id" = "role"."id"
        FULL JOIN "follow" ON "player"."id" = "follow"."player_id" 
        FULL JOIN "link" ON "link"."player_id" = "player"."id"
        FULL JOIN "team" ON "link"."team_id" = "team"."id"
    GROUP BY "role"."label", "user"."id","player"."id", "player"."birth_date", "player"."nationality", "player"."genre", "player"."strong_foot","position"."label", "player"."number_of_matches_played","player"."height","player"."weight";

CREATE VIEW scout_view AS
    SELECT
        "user"."id" AS "id",
        "scout"."id" AS "scout_id",
        "avatar",
        "firstname",
        "lastname",
        "email",
        "club",
        "city", 
        ARRAY_AGG( DISTINCT "follow"."player_id") AS "player_id",
        "role"."label" AS "role"
    FROM "scout"
        JOIN "user" ON "scout"."user_id" = "user"."id"
        JOIN "role" ON "user"."role_id" = "role"."id"
        LEFT JOIN "follow" ON "scout"."id" = "follow"."scout_id"
    GROUP BY "user"."id", "scout"."club", "scout"."city", "scout"."id", "role"."label";

CREATE VIEW statistics_view AS
    SELECT
        "player"."user_id" AS "id",
        "match"."id" AS "match_id",
        "score",
        "date",
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

CREATE VIEW team_view AS
    SELECT
        "team"."id" AS "team_id",
        "stadium_name",
        "club_name",
        "logo",
        "adress",
        "zip_code",
        "city",
        "latitude",
        "longitude",
        "season",
        "player_id"
    FROM
        "team" 
    JOIN "link"  ON "link"."team_id" = "team"."id";

CREATE VIEW auth_view AS
  SELECT 
    "user"."id", 
    "avatar", 
    "firstname", 
    "lastname",
    "email",
    "password",
    "role"."label" AS "role" 
  FROM "user" 
    JOIN "role" ON "user"."role_id" = "role"."id";

COMMIT;