import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { createAccessToken } from "../app/helpers/jwt.function.js";

const TOKEN = createAccessToken({
  id: 1, firstname: "romuald", lastname: "patfoort", role: "joueur",
});

test("route GET /player/1", async () => {
  const res = await request(app)
    .get("/player/1")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("id");
  expect(typeof res.body.id).toBe("number");
  expect(res.body.id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("player_id");
  expect(typeof res.body.player_id).toBe("number");
  expect(res.body.player_id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("firstname");
  expect(typeof res.body.firstname).toBe("string");

  expect(res.body).toHaveProperty("lastname");
  expect(typeof res.body.lastname).toBe("string");

  expect(res.body).toHaveProperty("email");
  expect(typeof res.body.email).toBe("string");
  expect(res.body.email).toMatch(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);

  expect(res.body).toHaveProperty("birth_date");
  expect(typeof res.body.birth_date).toBe("string");
  expect(res.body.birth_date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

  expect(res.body).toHaveProperty("nationality");
  expect(typeof res.body.nationality).toBe("string");

  expect(res.body).toHaveProperty("avatar");
  expect(typeof res.body.avatar).toBe("string");

  expect(res.body).toHaveProperty("genre");
  expect(typeof res.body.genre).toBe("string");
  expect(res.body.genre).toMatch(/^Homme|Femme$/);

  expect(res.body).toHaveProperty("height");
  expect(typeof res.body.height).toBe("number");
  expect(res.body.height).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("weight");
  expect(typeof res.body.weight).toBe("number");
  expect(res.body.weight).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("strong_foot");
  expect(typeof res.body.strong_foot).toBe("string");
  expect(res.body.strong_foot).toMatch(/^Droit|Gauche$/);

  expect(res.body).toHaveProperty("position");
  expect(typeof res.body.position).toBe("string");
  expect(res.body.position).toMatch(/^Gardien|Libéro|Défenseur gauche|Défenseur droit|Milieu défensif gauche|Milieu défensif droit|Milieu défensif central|Milieu gauche|Milieu droit|Milieu offensif|Ailier gauche|Ailier droit|Attaquant|Avant-centre|Remplaçant$/);

  expect(res.body).toHaveProperty("number_of_matches_played");
  expect(typeof res.body.number_of_matches_played).toBe("number");
  expect(res.body.number_of_matches_played).toBeGreaterThanOrEqual(0);

  expect(res.body).toHaveProperty("role");
  expect(typeof res.body.role).toBe("string");
  expect(res.body.role).toMatch("joueur");

  res.body.teams.forEach((team) => {
    expect(typeof team).toBe("object");

    expect(team).toHaveProperty("team_id");
    expect(typeof team.team_id).toBe("number");
    expect(team.team_id).toBeGreaterThanOrEqual(1);

    expect(team).toHaveProperty("player_id");
    expect(typeof team.player_id).toBe("number");
    expect(team.player_id).toBeGreaterThanOrEqual(1);

    expect(team).toHaveProperty("stadium_name");
    expect(typeof team.stadium_name).toBe("string");

    expect(team).toHaveProperty("logo");
    expect(typeof team.logo).toBe("string");

    expect(team).toHaveProperty("adress");
    expect(typeof team.adress).toBe("string");

    expect(team).toHaveProperty("zip_code");
    expect(typeof team.zip_code).toBe("string");
    expect(team.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

    expect(team).toHaveProperty("city");
    expect(typeof team.city).toBe("string");

    expect(team).toHaveProperty("latitude");
    expect(typeof team.latitude).toBe("string");
    expect(team.latitude).toMatch(/\d+\.\d{6}/);

    expect(team).toHaveProperty("longitude");
    expect(typeof team.longitude).toBe("string");
    expect(team.longitude).toMatch(/\d+\.\d{6}/);

    expect(team).toHaveProperty("season");
    expect(typeof team.season).toBe("string");
    expect(team.season).toMatch(/\d{4}-\d{4}/);
  });

  res.body.scouts.forEach((scout) => {
    expect(typeof scout).toBe("object");

    expect(scout).toHaveProperty("id");
    expect(typeof scout.id).toBe("number");
    expect(scout.id).toBeGreaterThanOrEqual(1);

    expect(scout).toHaveProperty("scout_id");
    expect(typeof scout.scout_id).toBe("number");
    expect(scout.scout_id).toBeGreaterThanOrEqual(1);

    expect(scout).toHaveProperty("firstname");
    expect(typeof scout.firstname).toBe("string");

    expect(scout).toHaveProperty("lastname");
    expect(typeof scout.lastname).toBe("string");

    expect(scout).toHaveProperty("email");
    expect(typeof scout.email).toBe("string");
    expect(scout.email).toMatch(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);

    expect(scout).toHaveProperty("avatar");
    expect(typeof scout.avatar).toBe("string");

    expect(scout).toHaveProperty("club");
    expect(typeof scout.club).toBe("string");

    expect(scout).toHaveProperty("city");
    expect(typeof scout.city).toBe("string");

    expect(scout).toHaveProperty("role");
    expect(typeof scout.role).toBe("string");
    expect(scout.role).toMatch("recruteur");

    scout.player_id.forEach((player) => {
      expect(typeof player).toBe("number");
      expect(player).toBeGreaterThanOrEqual(1);
    });
  });
});

test("route GET /player/2", async () => {
  const res = await request(app)
    .get("/player/2")
    .auth(TOKEN, { type: "bearer" })
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"User not found\"}");
});

test("route GET /player/1 sans Token", async () => {
  const res = await request(app)
    .get("/player/1")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(401);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"Token non disponible\"}");
});

test("route GET /player/1 Token expiré", async () => {
  const res = await request(app)
    .get("/player/1")
    .set("Accept", "application/json")
    .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiam91ZXVyIiwiaWQiOjEsImZpcnN0bmFtZSI6IkplYW4iLCJpYXQiOjE3MTE2NjE0MDMsImV4cCI6MTcxMTY2MTQyM30.fRIjw_TSyouBYO_NohP3mDAUyKCKIPbKQHQWTAWJFQ4", { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(403);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"jwt expired\"}");
});

test("route GET /player/1/match", async () => {
  const res = await request(app)
    .get("/player/1/match")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((match) => {
    expect(typeof match).toBe("object");

    expect(match).toHaveProperty("id");
    expect(typeof match.id).toBe("number");
    expect(match.id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("match_id");
    expect(typeof match.match_id).toBe("number");
    expect(match.match_id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("score");
    expect(typeof match.score).toBe("string");
    expect(match.score).toMatch(/^\d*-\d*$/);

    expect(match).toHaveProperty("date");
    expect(typeof match.date).toBe("string");
    expect(match.date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

    expect(match).toHaveProperty("home");
    expect(typeof match.home).toBe("object");

    expect(match.home).toHaveProperty("id");
    expect(typeof match.home.id).toBe("number");
    expect(match.home.id).toBeGreaterThanOrEqual(1);

    expect(match.home).toHaveProperty("club_name");
    expect(typeof match.home.club_name).toBe("string");

    expect(match.home).toHaveProperty("stadium_name");
    expect(typeof match.home.stadium_name).toBe("string");

    expect(match.home).toHaveProperty("logo");
    expect(typeof match.home.logo).toBe("string");

    expect(match.home).toHaveProperty("adress");
    expect(typeof match.home.adress).toBe("string");

    expect(match.home).toHaveProperty("zip_code");
    expect(typeof match.home.zip_code).toBe("string");
    expect(match.home.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

    expect(match.home).toHaveProperty("city");
    expect(typeof match.home.city).toBe("string");

    expect(match.home).toHaveProperty("latitude");
    expect(typeof match.home.latitude).toBe("string");
    expect(match.home.latitude).toMatch(/\d+\.\d{6}/);

    expect(match.home).toHaveProperty("longitude");
    expect(typeof match.home.longitude).toBe("string");
    expect(match.home.longitude).toMatch(/\d+\.\d{6}/);

    expect(match).toHaveProperty("away");
    expect(typeof match.away).toBe("object");

    expect(match.away).toHaveProperty("id");
    expect(typeof match.away.id).toBe("number");
    expect(match.away.id).toBeGreaterThanOrEqual(1);

    expect(match.away).toHaveProperty("club_name");
    expect(typeof match.away.club_name).toBe("string");

    expect(match.away).toHaveProperty("stadium_name");
    expect(typeof match.away.stadium_name).toBe("string");

    expect(match.away).toHaveProperty("logo");
    expect(typeof match.away.logo).toBe("string");

    expect(match.away).toHaveProperty("adress");
    expect(typeof match.away.adress).toBe("string");

    expect(match.away).toHaveProperty("zip_code");
    expect(typeof match.away.zip_code).toBe("string");
    expect(match.away.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

    expect(match.away).toHaveProperty("city");
    expect(typeof match.away.city).toBe("string");

    expect(match.away).toHaveProperty("latitude");
    expect(typeof match.away.latitude).toBe("string");
    expect(match.away.latitude).toMatch(/\d+\.\d{6}/);

    expect(match.away).toHaveProperty("longitude");
    expect(typeof match.away.longitude).toBe("string");
    expect(match.away.longitude).toMatch(/\d+\.\d{6}/);
  });
});

test("route GET /player/1/stats", async () => {
  const res = await request(app)
    .get("/player/1/stats")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("assists");
  expect(typeof res.body.assists).toBe("string");
  expect(res.body.assists).toMatch(/\d\.\d{16}/);

  expect(res.body).toHaveProperty("goals_scored");
  expect(typeof res.body.goals_scored).toBe("string");
  expect(res.body.goals_scored).toMatch(/\d\.\d{16}/);

  expect(res.body).toHaveProperty("red_card");
  expect(typeof res.body.red_card).toBe("string");
  expect(res.body.red_card).toMatch(/\d\.\d{16}/);

  expect(res.body).toHaveProperty("yellow_card");
  expect(typeof res.body.yellow_card).toBe("string");
  expect(res.body.yellow_card).toMatch(/\d\.\d{16}/);

  expect(res.body).toHaveProperty("stops");
  expect(typeof res.body.stops).toBe("string");
  expect(res.body.stops).toMatch(/\d\.\d{16}/);

  expect(res.body).toHaveProperty("goals_conceded");
  expect(typeof res.body.goals_conceded).toBe("string");
  expect(res.body.goals_conceded).toMatch(/\d\.\d{16}/);
});

test("route GET /player/1/match/1", async () => {
  const res = await request(app)
    .get("/player/1/match/1")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("id");
  expect(typeof res.body.id).toBe("number");
  expect(res.body.id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("match_id");
  expect(typeof res.body.match_id).toBe("number");
  expect(res.body.match_id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("score");
  expect(typeof res.body.score).toBe("string");
  expect(res.body.score).toMatch(/^\d*-\d*$/);

  expect(res.body).toHaveProperty("date");
  expect(typeof res.body.date).toBe("string");
  expect(res.body.date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

  expect(res.body).toHaveProperty("home");
  expect(typeof res.body.home).toBe("object");

  expect(res.body.home).toHaveProperty("id");
  expect(typeof res.body.home.id).toBe("number");
  expect(res.body.home.id).toBeGreaterThanOrEqual(1);

  expect(res.body.home).toHaveProperty("club_name");
  expect(typeof res.body.home.club_name).toBe("string");

  expect(res.body.home).toHaveProperty("stadium_name");
  expect(typeof res.body.home.stadium_name).toBe("string");

  expect(res.body.home).toHaveProperty("logo");
  expect(typeof res.body.home.logo).toBe("string");

  expect(res.body.home).toHaveProperty("adress");
  expect(typeof res.body.home.adress).toBe("string");

  expect(res.body.home).toHaveProperty("zip_code");
  expect(typeof res.body.home.zip_code).toBe("string");
  expect(res.body.home.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body.home).toHaveProperty("city");
  expect(typeof res.body.home.city).toBe("string");

  expect(res.body.home).toHaveProperty("latitude");
  expect(typeof res.body.home.latitude).toBe("string");
  expect(res.body.home.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body.home).toHaveProperty("longitude");
  expect(typeof res.body.home.longitude).toBe("string");
  expect(res.body.home.longitude).toMatch(/\d+\.\d{6}/);

  expect(res.body).toHaveProperty("away");
  expect(typeof res.body.away).toBe("object");

  expect(res.body.away).toHaveProperty("id");
  expect(typeof res.body.away.id).toBe("number");
  expect(res.body.away.id).toBeGreaterThanOrEqual(1);

  expect(res.body.away).toHaveProperty("club_name");
  expect(typeof res.body.away.club_name).toBe("string");

  expect(res.body.away).toHaveProperty("stadium_name");
  expect(typeof res.body.away.stadium_name).toBe("string");

  expect(res.body.away).toHaveProperty("logo");
  expect(typeof res.body.away.logo).toBe("string");

  expect(res.body.away).toHaveProperty("adress");
  expect(typeof res.body.away.adress).toBe("string");

  expect(res.body.away).toHaveProperty("zip_code");
  expect(typeof res.body.away.zip_code).toBe("string");
  expect(res.body.away.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body.away).toHaveProperty("city");
  expect(typeof res.body.away.city).toBe("string");

  expect(res.body.away).toHaveProperty("latitude");
  expect(typeof res.body.away.latitude).toBe("string");
  expect(res.body.away.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body.away).toHaveProperty("longitude");
  expect(typeof res.body.away.longitude).toBe("string");
  expect(res.body.away.longitude).toMatch(/\d+\.\d{6}/);
});

test("route POST /player/1/match", async () => {
  const res = await request(app)
    .post("/player/1/match")
    .auth(TOKEN, { type: "bearer" })
    .send({
      homeTeam: 1,
      awayTeam: 4,
      date: "2024-02-22",
    });
  expect(res.statusCode).toEqual(201);

  expect(typeof res.body).toBe("object");
  expect(res.body).toHaveProperty("id");
  expect(typeof res.body.id).toBe("number");
  expect(res.body.id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("match_id");
  expect(typeof res.body.match_id).toBe("number");
  expect(res.body.match_id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("score");
  expect(typeof res.body.score).toBe("string");
  expect(res.body.score).toMatch("");

  expect(res.body).toHaveProperty("date");
  expect(typeof res.body.date).toBe("string");
  expect(res.body.date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

  expect(res.body).toHaveProperty("team_id_as_home");
  expect(typeof res.body.team_id_as_home).toBe("object");

  expect(res.body.team_id_as_home).toHaveProperty("id");
  expect(typeof res.body.team_id_as_home.id).toBe("number");
  expect(res.body.team_id_as_home.id).toBe(1);

  expect(res.body.team_id_as_home).toHaveProperty("club_name");
  expect(typeof res.body.team_id_as_home.club_name).toBe("string");

  expect(res.body.team_id_as_home).toHaveProperty("stadium_name");
  expect(typeof res.body.team_id_as_home.stadium_name).toBe("string");

  expect(res.body.team_id_as_home).toHaveProperty("logo");
  expect(typeof res.body.team_id_as_home.logo).toBe("string");

  expect(res.body.team_id_as_home).toHaveProperty("adress");
  expect(typeof res.body.team_id_as_home.adress).toBe("string");

  expect(res.body.team_id_as_home).toHaveProperty("zip_code");
  expect(typeof res.body.team_id_as_home.zip_code).toBe("string");
  expect(res.body.team_id_as_home.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body.team_id_as_home).toHaveProperty("city");
  expect(typeof res.body.team_id_as_home.city).toBe("string");

  expect(res.body.team_id_as_home).toHaveProperty("latitude");
  expect(typeof res.body.team_id_as_home.latitude).toBe("string");
  expect(res.body.team_id_as_home.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body.team_id_as_home).toHaveProperty("longitude");
  expect(typeof res.body.team_id_as_home.longitude).toBe("string");
  expect(res.body.team_id_as_home.longitude).toMatch(/\d+\.\d{6}/);

  expect(res.body).toHaveProperty("team_id_as_outside");
  expect(typeof res.body.team_id_as_outside).toBe("object");

  expect(res.body.team_id_as_outside).toHaveProperty("id");
  expect(typeof res.body.team_id_as_outside.id).toBe("number");
  expect(res.body.team_id_as_outside.id).toBe(4);

  expect(res.body.team_id_as_outside).toHaveProperty("club_name");
  expect(typeof res.body.team_id_as_outside.club_name).toBe("string");

  expect(res.body.team_id_as_outside).toHaveProperty("stadium_name");
  expect(typeof res.body.team_id_as_outside.stadium_name).toBe("string");

  expect(res.body.team_id_as_outside).toHaveProperty("logo");
  expect(typeof res.body.team_id_as_outside.logo).toBe("string");

  expect(res.body.team_id_as_outside).toHaveProperty("adress");
  expect(typeof res.body.team_id_as_outside.adress).toBe("string");

  expect(res.body.team_id_as_outside).toHaveProperty("zip_code");
  expect(typeof res.body.team_id_as_outside.zip_code).toBe("string");
  expect(res.body.team_id_as_outside.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body.team_id_as_outside).toHaveProperty("city");
  expect(typeof res.body.team_id_as_outside.city).toBe("string");

  expect(res.body.team_id_as_outside).toHaveProperty("latitude");
  expect(typeof res.body.team_id_as_outside.latitude).toBe("string");
  expect(res.body.team_id_as_outside.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body.team_id_as_outside).toHaveProperty("longitude");
  expect(typeof res.body.team_id_as_outside.longitude).toBe("string");
  expect(res.body.team_id_as_outside.longitude).toMatch(/\d+\.\d{6}/);

  expect(res.body).toHaveProperty("assists");
  expect(res.body.assists).toBeNull();

  expect(res.body).toHaveProperty("goals_scored");
  expect(res.body.goals_scored).toBeNull();

  expect(res.body).toHaveProperty("red_card");
  expect(res.body.red_card).toBeNull();

  expect(res.body).toHaveProperty("yellow_card");
  expect(res.body.yellow_card).toBeNull();

  expect(res.body).toHaveProperty("stops");
  expect(res.body.stops).toBeNull();

  expect(res.body).toHaveProperty("goals_conceded");
  expect(res.body.goals_conceded).toBeNull();

  expect(res.body).toHaveProperty("fitness");
  expect(res.body.fitness).toBeNull();
});

test("route PATCH /player/1/match/3/stats", async () => {
  const res = await request(app)
    .patch("/player/1/match/3/stats")
    .auth(TOKEN, { type: "bearer" })
    .send({
      assists: 3,
      goals_scored: 2,
      minutes_played: 70,
      red_card: 0,
      yellow_card: 0,
      stops: 0,
      goals_conceded: 0,
      fitness: "En forme",
    })
    .expect(201);
  expect(res.statusCode).toEqual(201);
  expect(typeof res.body[0]).toBe("object");
  expect(res.body[0]).toHaveProperty("id");
  expect(typeof res.body[0].id).toBe("number");
  expect(res.body[0].id).toBeGreaterThanOrEqual(1);

  expect(res.body[0]).toHaveProperty("match_id");
  expect(typeof res.body[0].match_id).toBe("number");
  expect(res.body[0].match_id).toBeGreaterThanOrEqual(1);

  expect(res.body[0]).toHaveProperty("score");
  expect(typeof res.body[0].score).toBe("string");
  expect(res.body[0].score).toMatch(/^\d*-\d*$/);

  expect(res.body[0]).toHaveProperty("date");
  expect(typeof res.body[0].date).toBe("string");
  expect(res.body[0].date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

  expect(res.body[0]).toHaveProperty("home");
  expect(typeof res.body[0].home).toBe("object");

  expect(res.body[0].home).toHaveProperty("id");
  expect(typeof res.body[0].home.id).toBe("number");
  expect(res.body[0].home.id).toBeGreaterThanOrEqual(1);

  expect(res.body[0].home).toHaveProperty("club_name");
  expect(typeof res.body[0].home.club_name).toBe("string");

  expect(res.body[0].home).toHaveProperty("stadium_name");
  expect(typeof res.body[0].home.stadium_name).toBe("string");

  expect(res.body[0].home).toHaveProperty("logo");
  expect(typeof res.body[0].home.logo).toBe("string");

  expect(res.body[0].home).toHaveProperty("adress");
  expect(typeof res.body[0].home.adress).toBe("string");

  expect(res.body[0].home).toHaveProperty("zip_code");
  expect(typeof res.body[0].home.zip_code).toBe("string");
  expect(res.body[0].home.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body[0].home).toHaveProperty("city");
  expect(typeof res.body[0].home.city).toBe("string");

  expect(res.body[0].home).toHaveProperty("latitude");
  expect(typeof res.body[0].home.latitude).toBe("string");
  expect(res.body[0].home.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body[0].home).toHaveProperty("longitude");
  expect(typeof res.body[0].home.longitude).toBe("string");
  expect(res.body[0].home.longitude).toMatch(/\d+\.\d{6}/);

  expect(res.body[0]).toHaveProperty("away");
  expect(typeof res.body[0].away).toBe("object");

  expect(res.body[0].away).toHaveProperty("id");
  expect(typeof res.body[0].away.id).toBe("number");
  expect(res.body[0].away.id).toBeGreaterThanOrEqual(1);

  expect(res.body[0].away).toHaveProperty("club_name");
  expect(typeof res.body[0].away.club_name).toBe("string");

  expect(res.body[0].away).toHaveProperty("stadium_name");
  expect(typeof res.body[0].away.stadium_name).toBe("string");

  expect(res.body[0].away).toHaveProperty("logo");
  expect(typeof res.body[0].away.logo).toBe("string");

  expect(res.body[0].away).toHaveProperty("adress");
  expect(typeof res.body[0].away.adress).toBe("string");

  expect(res.body[0].away).toHaveProperty("zip_code");
  expect(typeof res.body[0].away.zip_code).toBe("string");
  expect(res.body[0].away.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(res.body[0].away).toHaveProperty("city");
  expect(typeof res.body[0].away.city).toBe("string");

  expect(res.body[0].away).toHaveProperty("latitude");
  expect(typeof res.body[0].away.latitude).toBe("string");
  expect(res.body[0].away.latitude).toMatch(/\d+\.\d{6}/);

  expect(res.body[0].away).toHaveProperty("longitude");
  expect(typeof res.body[0].away.longitude).toBe("string");
  expect(res.body[0].away.longitude).toMatch(/\d+\.\d{6}/);

  expect(res.body[0]).toHaveProperty("assists");
  expect(typeof res.body[0].assists).toBe("number");
  expect(res.body[0].assists).toBe(3);

  expect(res.body[0]).toHaveProperty("goals_scored");
  expect(typeof res.body[0].goals_scored).toBe("number");
  expect(res.body[0].goals_scored).toBe(2);

  expect(res.body[0]).toHaveProperty("red_card");
  expect(typeof res.body[0].red_card).toBe("number");
  expect(res.body[0].red_card).toBe(0);

  expect(res.body[0]).toHaveProperty("yellow_card");
  expect(typeof res.body[0].yellow_card).toBe("number");
  expect(res.body[0].yellow_card).toBe(0);

  expect(res.body[0]).toHaveProperty("stops");
  expect(typeof res.body[0].stops).toBe("number");
  expect(res.body[0].stops).toBe(0);

  expect(res.body[0]).toHaveProperty("goals_conceded");
  expect(typeof res.body[0].goals_conceded).toBe("number");
  expect(res.body[0].goals_conceded).toBe(0);

  expect(res.body[0]).toHaveProperty("minutes_played");
  expect(typeof res.body[0].minutes_played).toBe("number");
  expect(res.body[0].minutes_played).toBe(70);

  expect(res.body[0]).toHaveProperty("fitness");
  expect(typeof res.body[0].fitness).toBe("string");
  expect(res.body[0].fitness).toMatch("En forme");
});
