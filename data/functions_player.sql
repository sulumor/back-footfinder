BEGIN;

DROP FUNCTION IF EXISTS "update_player";
DROP TYPE IF EXISTS "fullPlayer";

CREATE TYPE "fullPlayer" as (
  "id" int,
  "firstname" text,
  "lastname" text,
  "email" text,
  "birth_date" timestamp,
  "nationality" text,
  "avatar" text,
  "genre" text,
  "strong_foot" text,
  "club_name" text,
  "position" text,
  "number_of_matches_played" int
);

CREATE FUNCTION "update_player"(json) RETURNS "fullPlayer" AS $$
  UPDATE "user" SET 
    "firstname" = COALESCE($1->>'firstname', "firstname"),
    "lastname" = COALESCE($1->>'lastname', "lastname"),
    "email" = COALESCE($1->>'email', "email"),
    "password" = COALESCE($1->>'password', "password")
  WHERE id = ($1->>'id')::int;

-- VOIR POUR MODIFIER BIRTH DATE CAR SOUCIS DE TIMEZONE
  UPDATE "player" SET 
    "birth_date" = COALESCE(($1->>'birth_date')::timestamp, "birth_date"),
    "nationality" = COALESCE($1->>'nationality', "nationality"),
    "avatar" = COALESCE($1->>'avatar', "avatar"),
    "genre" = COALESCE($1->>'genre', "genre"),
    "strong_foot" = COALESCE($1->>'strong_foot', "strong_foot"),
    "number_of_matches_played" = COALESCE(($1->>'number_of_matches_played')::int, "number_of_matches_played"),
    "position_id" = COALESCE((SELECT id FROM "position" WHERE "label"=$1->>'position')::int, "position_id")
  WHERE "user_id" = ($1->>'id')::int;

  SELECT "user"."id" AS "id",
  "firstname",
  "lastname",
  "email",
  "birth_date",
  "nationality", 
  "avatar",
  "genre",
  "strong_foot", 
  "team"."club_name",
  "position"."label" AS "position",
  "number_of_matches_played" 
  FROM "player" 
    JOIN "user" ON "player"."user_id" = "user"."id"
    JOIN "position" ON "player"."position_id" = "position"."id" 
    JOIN "link" ON "link"."player_id" = "player"."id"
    JOIN "team" ON "link"."team_id" = "team"."id"
  WHERE "player"."user_id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

COMMIT;