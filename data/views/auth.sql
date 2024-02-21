BEGIN;

CREATE VIEW auth_view AS

  SELECT 
    "id", 
    "avatar", 
    "firstname", 
    "lastname",
    "email",
    "role"."label" AS "role" 
  FROM "user" 
    JOIN "role" ON "user"."role_id" = "role"."id";

COMMIT;