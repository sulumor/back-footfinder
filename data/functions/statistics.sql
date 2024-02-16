BEGIN;

CREATE FUNCTION "add_statistics"(json) RETURNS "statistics_view" AS $$

  INSERT INTO "statistics" ("assists", "goals_scored", "minutes_played", "red_card", "yellow_card", "stops", "goals_conceded", "fitness", "match_id") 
    VALUES (
      COALESCE(($1->>'assists')::int, NULL), 
      COALESCE(($1->>'goals_scored')::int, NULL), 
      COALESCE(($1->>'minutes_played')::int, NULL), 
      COALESCE(($1->>'red_card')::int, NULL), 
      COALESCE(($1->>'yellow_card')::int, NULL), 
      COALESCE(($1->>'stops')::int, NULL), 
      COALESCE(($1->>'goals_conceded')::int, NULL), 
      COALESCE($1->>'fitness', NULL), 
      ($1->>'matchId')::int
    );

    SELECT * FROM "statistics_view" WHERE "match_id" = ($1->>'matchId')::int;

$$ LANGUAGE sql STRICT;
COMMIT;