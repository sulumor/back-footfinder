-- SQLBook: Code
BEGIN;

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

    SELECT * FROM "scout_view" WHERE "id" = ($1->>'id')::int;

$$ LANGUAGE sql STRICT;

COMMIT;