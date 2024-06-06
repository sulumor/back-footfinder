BEGIN;

DROP VIEW IF EXISTS "scouts","player_view","scout_view","statistics_view","team_view","match_view", "auth_view", "gender_view", "nationality_view", "position_view";

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
      "longitude"
  FROM "team";

CREATE VIEW auth_view AS
  SELECT 
    "user"."id", 
    "avatar", 
    "firstname", 
    "lastname",
    "email",
    "password",
    "role" 
  FROM "user";

CREATE VIEW gender_view AS
  SELECT 
    "id", 
    "label"
  FROM "gender";

CREATE VIEW nationality_view AS
  SELECT 
    "id", 
    "label"
  FROM "nationality";

CREATE VIEW position_view AS
  SELECT 
    "id", 
    "label"
  FROM "position";

CREATE VIEW statistics_view AS
    SELECT
        "player"."user_id" AS "id",
        "match"."id" AS "match_id",
        "score",
        "date",
        (SELECT row_to_json(team_view) FROM team_view WHERE team_id = "team_id_as_home") as "home",
        (SELECT row_to_json(team_view) FROM team_view WHERE team_id = "team_id_as_outside") as "away",
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

CREATE VIEW match_view AS
  SELECT
    "player"."user_id" AS "id",
    "match"."id" AS "match_id",
    "score",
    "date",
    (SELECT row_to_json(team_view) FROM team_view WHERE team_id = "team_id_as_home") as "home",
    (SELECT row_to_json(team_view) FROM team_view WHERE team_id = "team_id_as_outside") as "away"
  FROM "match"
    JOIN "meet" ON "meet"."id" = "match"."meet_id"
    JOIN "play" ON "play"."match_id" = "match"."id"
    JOIN "player" ON "player"."id" = "play"."player_id";

CREATE VIEW scouts AS
    SELECT
        "user"."id" AS "id",
        "scout"."id" AS "scout_id",
        "avatar",
        "firstname",
        "lastname",
        "email",
        "club",
        "city", 
        "gender"."label" as "gender",
        "nationality"."label" as "nationality",
        "role"
    FROM "scout"
        JOIN "user" ON "scout"."user_id" = "user"."id"
        FULL JOIN "gender" ON "user"."gender_id" = "gender"."id"
        FULL JOIN "nationality" ON "user"."nationality_id" = "nationality"."id"
    GROUP BY "user"."id", "scout"."club", "scout"."city", "scout"."id", "gender"."label", "nationality"."label";

CREATE VIEW players AS  
    SELECT "user"."id" AS "id",
    "player"."id" AS "player_id",
        "firstname",
        "lastname",
        "email",
        "birth_date",
        "nationality"."label" as "nationality", 
        "avatar",
        "gender"."label" as "gender",
        "height",
        "weight",
        "strong_foot",
        "position"."label" AS "position",
        "number_of_matches_played",
        "role" 
    FROM "player" 
        FULL JOIN "user" ON "player"."user_id" = "user"."id"
        FULL JOIN "position" ON "player"."position_id" = "position"."id"
        FULL JOIN "gender" ON "user"."gender_id" = "gender"."id"
        FULL JOIN "nationality" ON "user"."nationality_id" = "nationality"."id"
    WHERE "user"."role" = true
    GROUP BY "gender"."label","nationality"."label", "user"."id","player"."id", "player"."birth_date", "player"."strong_foot","position"."label", "player"."number_of_matches_played","player"."height","player"."weight";

CREATE VIEW player_view AS  
    SELECT "user"."id" AS "id",
    "player"."id" AS "player_id",
        "firstname",
        "lastname",
        "email",
        "birth_date",
        "nationality"."label" as "nationality", 
        "avatar",
        "gender"."label" as "gender",
        "height",
        "weight",
        "strong_foot",
        (WITH json_rows AS (SELECT jsonb_agg(row_to_json("team_view")) AS teams FROM "team_view" WHERE "team_id" IN (SELECT "team_id" FROM "link" WHERE "link"."player_id" = "player"."id")) SELECT teams FROM json_rows),
        (WITH json_rows AS (SELECT jsonb_agg(row_to_json("scouts")) AS scouts FROM "scouts" WHERE "scout_id" IN (SELECT "scout_id" FROM "follow" WHERE "follow"."player_id" = "player"."id")) SELECT scouts from json_rows),
        "position"."label" AS "position",
        "number_of_matches_played",
        "role" 
    FROM "player" 
        FULL JOIN "user" ON "player"."user_id" = "user"."id"
        FULL JOIN "position" ON "player"."position_id" = "position"."id"
        FULL JOIN "gender" ON "user"."gender_id" = "gender"."id"
        FULL JOIN "nationality" ON "user"."nationality_id" = "nationality"."id"
    WHERE "user"."role" = true
    GROUP BY "gender"."label","nationality"."label", "user"."id","player"."id", "player"."birth_date", "player"."strong_foot","position"."label", "player"."number_of_matches_played","player"."height","player"."weight";
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
        (WITH json_rows AS (SELECT jsonb_agg(row_to_json("players")) AS players FROM "players" WHERE "player_id" IN (SELECT "player_id" FROM "follow" WHERE "follow"."scout_id" = "scout"."id")) SELECT players from json_rows),
        "gender"."label" as "gender",
        "nationality"."label" as "nationality",
        "role"
    FROM "scout"
        JOIN "user" ON "scout"."user_id" = "user"."id"
        FULL JOIN "gender" ON "user"."gender_id" = "gender"."id"
        FULL JOIN "nationality" ON "user"."nationality_id" = "nationality"."id"
    GROUP BY "user"."id", "scout"."club", "scout"."city", "scout"."id", "gender"."label", "nationality"."label";

COMMIT;