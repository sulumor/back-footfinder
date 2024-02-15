CREATE VIEW team_view AS
SELECT
    "team"."id" AS "team_id",
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
