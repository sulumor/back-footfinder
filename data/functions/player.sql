BEGIN;

CREATE FUNCTION "update_player"(json) RETURNS "player_view" AS $$
  UPDATE "user" SET 
    "avatar" = COALESCE($1->>'avatar', "avatar"),
    "firstname" = COALESCE($1->>'firstname', "firstname"),
    "lastname" = COALESCE($1->>'lastname', "lastname"),
    "email" = COALESCE($1->>'email', "email"),
    "password" = COALESCE($1->>'password', "password")
  WHERE id = ($1->>'id')::int;

-- VOIR POUR MODIFIER BIRTH DATE CAR SOUCIS DE TIMEZONE
  UPDATE "player" SET 
    "birth_date" = COALESCE(($1->>'birth_date')::date, "birth_date"),
    "nationality" = COALESCE($1->>'nationality', "nationality"),
    "genre" = COALESCE($1->>'genre', "genre"),
    "strong_foot" = COALESCE($1->>'strong_foot', "strong_foot"),
    "number_of_matches_played" = COALESCE(($1->>'number_of_matches_played')::int, "number_of_matches_played"),
    "position_id" = COALESCE((SELECT id FROM "position" WHERE "label"=$1->>'position')::int, "position_id")
  WHERE "user_id" = ($1->>'id')::int;

  SELECT * FROM "player_view" WHERE "id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

COMMIT;