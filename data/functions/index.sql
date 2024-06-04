BEGIN;

DROP FUNCTION IF EXISTS "delete_match","delete_follow", "update_player", "update_scout", "add_match", "update_match", "add_statistics", "update_statistics", "add_user", "add_player", "add_scout", "add_follow";

CREATE FUNCTION "add_match"(json) RETURNS "statistics_view" AS $$

  INSERT INTO "meet" ("team_id_as_home", "team_id_as_outside") VALUES (($1->>'homeTeam')::int, ($1->>'awayTeam')::int);

  INSERT INTO "match" ("meet_id", "score", "date") VALUES ((SELECT "id" FROM "meet" ORDER BY "id" DESC LIMIT 1), COALESCE($1->>'score', '-'), ($1->>'date')::date);

  INSERT INTO "play" ("match_id", "player_id") VALUES ((SELECT "id" FROM "match" ORDER BY "id" DESC LIMIT 1), (SELECT "id" FROM "player" WHERE "user_id" = ($1->>'id')::int));

  INSERT INTO "statistics" ("match_id") 
    VALUES (
      (SELECT "id" FROM "match" ORDER BY "id" DESC LIMIT 1)
    );

  SELECT * FROM "statistics_view" WHERE "match_id" = (SELECT "id" FROM "match" ORDER BY "id" DESC LIMIT 1);
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "update_match"(json) RETURNS "match_view" AS $$

  UPDATE "match" SET 
    "score" = COALESCE(($1->>'score'), "score")
  WHERE "id" = (($1->>'matchId')::int);

  UPDATE "meet" SET 
    "team_id_as_home" = COALESCE(($1->>'homeTeam')::int, "team_id_as_home"),
    "team_id_as_outside" = COALESCE(($1->>'awayTeam')::int, "team_id_as_outside")
  WHERE "id" = (SELECT "meet_id" FROM "match" WHERE "id" = (($1->>'matchId')::int));

  SELECT * FROM "match_view" WHERE "match_id" = ($1->>'matchId')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "delete_match"(json) RETURNS "match_view" AS $$

  DELETE FROM "statistics" WHERE "match_id"=($1->>'id')::int;

  DELETE FROM "play" WHERE "match_id"=($1->>'id')::int;

  DELETE FROM "meet" WHERE "id"=(SELECT "meet_id" FROM "match" WHERE "id"=($1->>'id')::int);
  
  DELETE FROM "match" WHERE "id"=($1->>'id')::int;

  SELECT * FROM "match_view" WHERE "match_id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

CREATE FUNCTION "add_player"(json) RETURNS "player_view" AS $$

  INSERT INTO "player"("user_id") VALUES 
  (($1->>'id')::int);

  SELECT * FROM "player_view" WHERE "id" = ($1->>'id')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "update_player"(json) RETURNS "player_view" AS $$
  UPDATE "user" SET 
    "avatar" = COALESCE($1->>'avatar', "avatar"),
    "firstname" = COALESCE($1->>'firstname', "firstname"),
    "lastname" = COALESCE($1->>'lastname', "lastname"),
    "email" = COALESCE($1->>'email', "email"),
    "password" = COALESCE($1->>'password', "password"),
    "nationality_id" = COALESCE((SELECT id FROM "nationality" WHERE "label"=$1->>'nationality')::int, "nationality_id"),
    "gender_id" = COALESCE((SELECT id FROM "gender" WHERE "label"=$1->>'gender')::int, "gender_id")
  WHERE id = ($1->>'id')::int;

  UPDATE "player" SET 
    "birth_date" = COALESCE(($1->>'birth_date')::date, "birth_date"),
    "height" = COALESCE(($1->>'height')::int, "height"),
    "weight" = COALESCE(($1->>'weight')::int, "weight"),
    "strong_foot" = COALESCE(($1->>'strong_foot')::boolean, "strong_foot"),
    "number_of_matches_played" = COALESCE(($1->>'number_of_matches_played')::int, "number_of_matches_played"),
    "position_id" = COALESCE((SELECT id FROM "position" WHERE "label"=$1->>'position')::int, "position_id")
  WHERE "user_id" = ($1->>'id')::int;


  SELECT * FROM "player_view" WHERE "id" = ($1->>'id')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "add_scout"(json) RETURNS "scout_view" AS $$
  INSERT INTO scout(user_id) VALUES ( 
      ($1->>'id')::int
  );

  SELECT * FROM "scout_view" WHERE "id" = ($1->>'id')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "update_scout"(json) RETURNS "scout_view" AS $$
    UPDATE "user" SET
        "avatar" = COALESCE($1->>'avatar', "avatar"),
        "firstname" = COALESCE($1->>'firstname', "firstname"),
        "lastname" = COALESCE($1->>'lastname', "lastname"),
        "email" = COALESCE($1->>'email', "email"),
        "password" = COALESCE($1->>'password', "password"),
        "nationality_id" = COALESCE((SELECT id FROM "nationality" WHERE "label"=$1->>'nationality')::int, "nationality_id"),
        "gender_id" = COALESCE((SELECT id FROM "gender" WHERE "label"=$1->>'gender')::int, "gender_id")
    WHERE id = ($1->>'id')::int;

    UPDATE "scout" SET
        "club" = COALESCE($1->>'club', "club"),
        "city" = COALESCE($1->>'city', "city"),
        "updated_at" = now()
    WHERE "user_id" = ($1->>'id')::int;

    SELECT * FROM "scout_view" WHERE "id" = ($1->>'id')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "add_statistics"(json) RETURNS "statistics_view" AS $$

  INSERT INTO "statistics" ("assists", "goals_scored", "minutes_played", "red_card", "yellow_card", "stops", "goals_conceded", "fitness", "match_id") 
    VALUES (
      COALESCE(($1->>'assists')::int, 0), 
      COALESCE(($1->>'goals_scored')::int, 0), 
      COALESCE(($1->>'minutes_played')::int, 0), 
      COALESCE(($1->>'red_card')::int, 0), 
      COALESCE(($1->>'yellow_card')::int, 0), 
      COALESCE(($1->>'stops')::int, 0), 
      COALESCE(($1->>'goals_conceded')::int, 0), 
      COALESCE($1->>'fitness', 'absent'), 
      ($1->>'matchId')::int
    );

  SELECT * FROM "statistics_view" WHERE "match_id" = ($1->>'matchId')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "update_statistics"(json) RETURNS "statistics_view" AS $$

  UPDATE "statistics" SET 
    "assists" = COALESCE(($1->>'assists')::int, "assists"), 
    "goals_scored" = COALESCE(($1->>'goals_scored')::int, "goals_scored"), 
    "minutes_played" = COALESCE(($1->>'minutes_played')::int, "minutes_played"), 
    "red_card" = COALESCE(($1->>'red_card')::int, "red_card"), 
    "yellow_card" = COALESCE(($1->>'yellow_card')::int, "yellow_card"), 
    "stops" = COALESCE(($1->>'stops')::int, "stops"), 
    "goals_conceded" = COALESCE(($1->>'goals_conceded')::int, "goals_conceded"), 
    "fitness" = COALESCE($1->>'fitness', "fitness")
  WHERE "match_id" = ($1->>'matchId')::int;

  UPDATE "match" SET 
    "score" = COALESCE(($1->>'score'), "score")
  WHERE "id" = (($1->>'matchId')::int);

  SELECT * FROM "statistics_view" WHERE "match_id" = ($1->>'matchId')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "add_user"(json) RETURNS "auth_view" AS $$

  INSERT INTO "user" (avatar,firstname,lastname, email, password, gender_id, role) VALUES
    (
      COALESCE($1->>'avatar', ''), 
      $1->>'firstname',
      $1->>'lastname',
      $1->>'email',
      $1->>'password',
      (SELECT id FROM "gender" WHERE "label"=$1->>'gender')::int,
      ($1->>'role')::boolean
    );

  SELECT * FROM "auth_view" WHERE "id"=(SELECT "id" FROM "user" ORDER BY "id" DESC LIMIT 1);
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "add_follow"(json) RETURNS "scout_view" AS $$
  INSERT INTO "follow"(scout_id,player_id)VALUES(
    ((SELECT "id" FROM "scout" WHERE "user_id"=($1->>'scoutId')::int)::int),
    ((SELECT "id" FROM "player" WHERE "user_id"=($1->>'id')::int)::int)
  );

  SELECT * FROM scout_view WHERE id=($1->>'scoutId')::int;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION "delete_follow"(json) RETURNS "scout_view" AS $$
  DELETE FROM "follow" 
    WHERE "scout_id"= (
      (SELECT "id" FROM "scout" WHERE "user_id"=($1->>'scoutId')::int)::int
    ) AND "player_id" = (
      (SELECT "id" FROM "player" WHERE "user_id"=($1->>'id')::int)::int
    );
  
  SELECT * FROM "scout_view" WHERE "id"=($1->>'scoutId')::int;
$$ LANGUAGE sql STRICT;

COMMIT;