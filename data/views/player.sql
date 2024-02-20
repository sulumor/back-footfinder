BEGIN ;

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
        "number_of_matches_played" 
    FROM "player" 
        JOIN "user" ON "player"."user_id" = "user"."id"
        JOIN "position" ON "player"."position_id" = "position"."id"
        JOIN "follow" ON "player"."id" = "follow"."player_id" 
        JOIN "link" ON "link"."player_id" = "player"."id"
        JOIN "team" ON "link"."team_id" = "team"."id"
    GROUP BY "user"."id","player"."id", "player"."birth_date","player"."weight","player"."height" "player"."nationality", "player"."genre", "player"."strong_foot","position"."label", "player"."number_of_matches_played","player"."height","player"."weight";
;

COMMIT;
