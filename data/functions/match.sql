BEGIN;

CREATE FUNCTION "add_match"(json) RETURNS "match_view" AS $$

  INSERT INTO "meet" (team_id_as_home, team_id_as_outside) VALUES (($1->>'homeTeam')::int, ($1->>'awayTeam')::int);

  INSERT INTO "match" (meet_id, score) VALUES ((SELECT "id" FROM "meet" ORDER BY "id" DESC LIMIT 1), COALESCE($1->>'score', '-'));

  INSERT INTO "play" (match_id, player_id) VALUES ((SELECT id FROM "match" ORDER BY "id" DESC LIMIT 1), ($1->>'id')::int);

  SELECT * FROM "match_view" WHERE "match_id" = (SELECT id FROM "match" ORDER BY "id" DESC LIMIT 1);
 
$$ LANGUAGE sql STRICT;


COMMIT;