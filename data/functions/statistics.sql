BEGIN;

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

COMMIT;