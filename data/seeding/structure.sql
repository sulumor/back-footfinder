
BEGIN;

DROP FUNCTION IF EXISTS "update_player", "update_scout", "add_match";
DROP VIEW IF EXISTS "player_view","scout_view","statistics_view","team_view","match_view";
DROP TABLE IF EXISTS "role","user", "position", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow";

CREATE TABLE "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role_id" INT NOT NULL REFERENCES role(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "position" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "player" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "birth_date" TIMESTAMP NOT NULL,
  "nationality" TEXT NOT NULL,
  "avatar" TEXT NOT NULL,
  "genre" TEXT NOT NULL,
  "strong_foot" TEXT NOT NULL,
  "number_of_matches_played" INT NOT NULL DEFAULT 0,
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "position_id" INT REFERENCES position(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "scout" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club" TEXT DEFAULT NULL,
  "city" TEXT NOT NULL,
  "user_id" INT REFERENCES "user"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "team" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club_name" TEXT NOT NULL,
  "logo" TEXT NOT NULL,
  "adress" TEXT NOT NULL,
  "zip_code" TEXT NOT NULL CHECK(
    "zip_code" ~ '^\d{5}$'),
  "city" TEXT NOT NULL,
  "latitude" NUMERIC(8,6) NOT NULL,
  "longitude" NUMERIC(8,6) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "meet" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  "team_id_as_home" INT REFERENCES team(id),
  "team_id_as_outside" INT REFERENCES team(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "match" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "score" TEXT NOT NULL,
  "meet_id" INT REFERENCES meet(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "play" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "player_id" INT REFERENCES player(id),
  "match_id" INT REFERENCES match(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "statistics" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "assists" INT NULL,
  "goals_scored" INT NULL,
  "minutes_played" INT NULL,
  "red_card" INT NULL,
  "yellow_card" INT NULL,
  "stops" INT NULL,
  "goals_conceded" INT NOT NULL,
  "fitness" TEXT NOT NULL,
  "match_id" INT REFERENCES match(id) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "link" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "player_id" INT REFERENCES player(id),
  "team_id" INT REFERENCES team(id),
  "season" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "follow" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
  "player_id" INT REFERENCES player(id),
  "scout_id" INT REFERENCES scout(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;