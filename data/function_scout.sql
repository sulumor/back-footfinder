-- SQLBook: Code
BEGIN;

DROP FUNCTION IF EXISTS "update_scout";
DROP TYPE IF EXISTS "fullScout";

CREATE TYPE "fullScout" AS (
    "id" int,
    "firstname" text,
    "lastname" text,
    "email" text,
    "password" text,
    "club" text,
    "city" text
);

CREATE FUNCTION "update_scout"(json) RETURNS "fullScout" AS $$
UPDATE "user" SET
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

SELECT "user"."id" AS "id",
"firstname",
"lastname", 
"email", 
"password",
"club",
"city"
FROM "scout"
JOIN "user" ON "scout"."user_id" = "user"."id"
WHERE "scout"."user_id" = ($1->>'id')::int;
 

$$ LANGUAGE sql STRICT;

COMMIT;