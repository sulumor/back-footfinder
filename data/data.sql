
BEGIN


DROP TABLE IF EXISTS 'role','utilisateur', 'joueur', 'recruteur', 'poste', 'equipe', 'match', 'statistique', 'rattacher', 'suivre', 'rencontrer';


CREATE TABLE "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "libellé" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "utilisateur" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "prénom" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "mot_de_passe" TEXT NOT NULL,
  "role_id" int REFERENCES role(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "joueur" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "date_de_naissance" TIMESTAMP NOT NULL,
  "nationalité" TEXT NOT NULL,
  "avatar" TEXT NOT NULL,
  "genre" TEXT NOT NULL,
  "pied_fort" TEXT NOT NULL,
  "nombre_de_match_joué" INT NOT NULL DEFAULT 0,
  "utilisateur_id" INT REFERENCES utilisateur(id) NOT NULL,
  "poste_id" INT REFERENCES poste(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "recruteur" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "club" TEXT DEFAULT NULL,
  "ville" TEXT NOT NULL,
  "utilisateur_id" INT REFERENCES utilisateur(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "poste" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "libellé" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "equipe" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom_club" TEXT NOT NULL,
  "logo" TEXT NOT NULL,
  "adresse" TEXT NOT NULL,
  "code_postal" TEXT NOT NULL CHECK(
    "code_postal" ~ '/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/'),
  "ville" TEXT NOT NULL,
  "latitude" NUMERIC 4 NOT NULL,
  "longitude" NUMERIC 4 NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "match" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "score" INT TEXT NOT NULL,
  "rencontre_id" INT REFERENCES rencontrer(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "statistique" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "passes_decisives" INT NULL,
  "buts_marqués" INT NULL,
  "minutes_jouées" INT NULL,
  "carton_rouge" INT NULL,
  "carton_jaune" INT NULL,
  "arrêts" INT NULL,
  "buts_encaissés" INT NOT NULL,
  "forme_physique" TEXT NOT NULL,
  "match_id" INT REFERENCES match(id) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "rattacher" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "joueur_id" INT REFERENCES joueur(id),
  "equipe_id" INT REFERENCES equipe(id),
  "saison" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "suivre" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "joueur_id" INT REFERENCES joueur(id),
  "recruteur" INT REFERENCES recruteur(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "rencontrer" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "equipe_id_comme_domicile" INT REFERENCES equipe(id),
  "equipe_id_comme_extérieur" INT REFERENCES equipe(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


COMMIT