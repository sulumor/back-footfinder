BEGIN;

DROP FUNCTION IF EXISTS "delete_match", "delete_follow", "add_scout", "add_player", "update_player", "update_scout", "add_match", "update_match", "add_statistics", "update_statistics", "add_user", "add_follow";
DROP VIEW IF EXISTS "team_season_view", "scouts", "players","player_view","scout_view","statistics_view","team_view","match_view", "auth_view", "gender_view", "nationality_view", "position_view";
DROP TABLE IF EXISTS "gender","nationality", "user", "position", "player", "scout", "team","meet", "play", "match", "link", "statistics", "follow";

CREATE TABLE "gender" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "nationality" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "avatar" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" BOOLEAN NOT NULL DEFAULT true,
  "gender_id" INT NOT NULL REFERENCES "gender"(id),
  "nationality_id" INT REFERENCES "nationality"(id) DEFAULT 1,
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
  "birth_date" DATE,
  "height" INT NOT NULL DEFAULT 0,
  "weight" INT NOT NULL DEFAULT 0,
  "strong_foot" BOOLEAN NOT NULL DEFAULT true,
  "number_of_matches_played" INT NOT NULL DEFAULT 0,
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "position_id" INT REFERENCES "position"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ,
  UNIQUE("user_id")
);

CREATE TABLE "scout" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club" TEXT NOT NULL DEFAULT '',
  "city" TEXT NOT NULL DEFAULT '',
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ,
  UNIQUE("user_id")
);

CREATE TABLE "team" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club_name" TEXT NOT NULL,
  "stadium_name" TEXT NOT NULL,
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
  "date" DATE NOT NULL,
  "meet_id" INT REFERENCES meet(id) ON DELETE SET NULL,
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
  "assists" INT DEFAULT NULL,
  "goals_scored" INT DEFAULT NULL,
  "minutes_played" INT DEFAULT NULL,
  "red_card" INT DEFAULT NULL,
  "yellow_card" INT DEFAULT NULL,
  "stops" INT DEFAULT NULL,
  "goals_conceded" INT DEFAULT NULL,
  "fitness" TEXT DEFAULT NULL,
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
  "player_id" INT NOT NULL REFERENCES player("user_id"),
  "scout_id" INT NOT NULL REFERENCES scout("user_id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ,
  UNIQUE("player_id", "scout_id")

);

COMMIT;