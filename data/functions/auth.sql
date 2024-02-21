BEGIN;

CREATE FUNCTION "add_user"(json) RETURNS "auth_view" AS $$

INSERT INTO "user" (avatar,firstname,lastname, email, password, role_id) VALUES
  (
    COALESCE($1->>'avatar', ''), 
    $1->>'firstname',
    $1->>'lastname',
    $1->>'email',
    $1->>'password',
    (SELECT "id" FROM "role" WHERE "label"=$1->>'role')::int
  );

  SELECT * FROM "auth_view" WHERE "id"=(SELECT "id" FROM "user" ORDER BY "id" DESC LIMIT 1);

$$ LANGUAGE sql STRICT;

COMMIT;