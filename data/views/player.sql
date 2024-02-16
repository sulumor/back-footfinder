/*affiche les informations détaillées sur chaque joueur, y compris la date de naissance, la nationalité, l'avatar, le genre, le pied fort, le nombre de matchs joués, ainsi que les informations sur l'utilisateur associé à chaque joueur (prénom, nom, email) et, le libellé de la position du joueur.*/

BEGIN ;

CREATE VIEW player_view AS  
    SELECT "user"."id" AS "id",
        "firstname",
        "lastname",
        "email",
        "birth_date",
        "nationality", 
        "avatar",
        "genre",
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
    GROUP BY "user"."id", "player"."birth_date", "player"."nationality", "player"."avatar", "player"."genre", "player"."strong_foot","position"."label", "player"."number_of_matches_played";

COMMIT;
