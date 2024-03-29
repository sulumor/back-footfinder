-- SQLBook: Code
BEGIN;

CREATE FUNCTION "add_scout"(json) RETURNS "scout_view" AS $$
    INSERT INTO scout(club, city, user_id) VALUES (
        $1->>'club',
        $1->>'city', 
        ($1->>'id')::int
    );

    INSERT INTO follow(scout_id, player_id) VALUES (
        ($1->>'id')::int
        ($1->>'player_id')::int 
    );

    SELECT * FROM "scout_view" WHERE "id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

CREATE FUNCTION "update_scout"(json) RETURNS "scout_view" AS $$
    UPDATE "user" SET
        "avatar" = COALESCE($1->>'avatar', "avatar"),
        "firstname" = COALESCE($1->>'firstname', "firstname"),
        "lastname" = COALESCE($1->>'lastname', "lastname"),
        "email" = COALESCE($1->>'email', "email"),
        "password" = COALESCE($1->>'password', "password")
    WHERE id = ($1->>'id')::int;

    UPDATE "scout" SET
        "club" = COALESCE($1->>'club', "club"),
        "city" = COALESCE($1->>'city', "city"),
        "updated_at" = now()
    WHERE "user_id" = ($1->>'id')::int;

    UPDATE "follow" SET
        "scout_id" = COALESCE($1->>'scout_id',"scout_id"),
        "player_id" = COALESCE($1->>'player_id', "player_id")
    WHERE "follow_id" = ($1->>'id')::int;

    SELECT * FROM "scout_view" WHERE "id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

COMMIT;