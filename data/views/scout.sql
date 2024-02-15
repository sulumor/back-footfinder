/*permet d'inclure les informations sur le joueur telles que la date de naissance, la nationalité, l'avatar, le genre, le pied fort et le nombre de matchs joués.*/
BEGIN;

CREATE VIEW scout_view AS
    SELECT
        "user"."id" AS "id",
        "scout"."id" AS "scout_id",
        "firstname",
        "lastname",
        "email",
        "club",
        "city", 
        ARRAY_AGG( DISTINCT "follow"."player_id") AS "player_id"
    FROM "scout"
        JOIN "user" ON "scout"."user_id" = "user"."id"
        JOIN "follow" ON "scout"."id" = "follow"."scout_id"
    GROUP BY "user"."id", "scout"."club", "scout"."city", "scout"."id";

COMMIT;
