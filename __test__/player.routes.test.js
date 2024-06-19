import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { createAccessToken } from "../app/helpers/jwt.function.js";
import {
  fitnessRegex, genderRegex, nationalityRegex, scoreRegex,
} from "../app/schemas/utils/regex.schema.js";

const TOKEN = createAccessToken({
  id: 1, firstname: "Jean", lastname: "Dujardin", role: true,
});
const MAUVAISTOKEN = createAccessToken({
  id: 2, firstname: "romuald", lastname: "patfoort", role: true,
});

test("route GET /player", async () => {
  const res = await request(app)
    .get("/player")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  const [body] = res.body;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("id");
  expect(typeof body.id).toBe("number");
  expect(body.id).toBe(1);

  expect(body).toHaveProperty("player_id");
  expect(typeof body.player_id).toBe("number");
  expect(body.player_id).toBe(1);

  expect(body).toHaveProperty("firstname");
  expect(typeof body.firstname).toBe("string");
  expect(body.firstname).toBe("Jean");

  expect(body).toHaveProperty("lastname");
  expect(typeof body.lastname).toBe("string");
  expect(body.lastname).toBe("Dujardin");

  expect(body).toHaveProperty("email");
  expect(typeof body.email).toBe("string");
  expect(body.email).toBe("jean.dujardin@mail.io");

  expect(body).toHaveProperty("birth_date");
  expect(typeof body.birth_date).toBe("string");
  expect(body.birth_date).toBe("1993-05-20T22:00:00.000Z");

  expect(body).toHaveProperty("nationality");
  expect(typeof body.nationality).toBe("string");
  expect(body.nationality).toMatch("Française");

  expect(body).toHaveProperty("avatar");
  expect(typeof body.avatar).toBe("string");

  expect(body).toHaveProperty("gender");
  expect(typeof body.gender).toBe("string");
  expect(body.gender).toMatch("Homme");

  expect(body).toHaveProperty("height");
  expect(typeof body.height).toBe("number");
  expect(body.height).toBe(183);

  expect(body).toHaveProperty("weight");
  expect(typeof body.weight).toBe("number");
  expect(body.weight).toBe(63);

  expect(body).toHaveProperty("strong_foot");
  expect(body.strong_foot).toBeTruthy();

  expect(body).toHaveProperty("position");
  expect(typeof body.position).toBe("string");
  expect(body.position).toMatch("Attaquant");

  expect(body).toHaveProperty("number_of_matches_played");
  expect(typeof body.number_of_matches_played).toBe("number");
  expect(body.number_of_matches_played).toBe(50);

  expect(body).toHaveProperty("role");
  expect(body.role).toBeTruthy();

  body.teams.forEach((team) => {
    expect(typeof team).toBe("object");

    expect(team).toHaveProperty("team_id");
    expect(typeof team.team_id).toBe("number");
    expect(team.team_id).toBeGreaterThanOrEqual(1);

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
    expect(typeof team.latitude).toBe("number");

    expect(team).toHaveProperty("longitude");
    expect(typeof team.longitude).toBe("number");
  });

  body.scouts.forEach((scout) => {
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

    expect(scout).toHaveProperty("team");
    expect(scout.team).toHaveProperty("team_id");
    expect(typeof scout.team.team_id).toBe("number");
    expect(scout.team.team_id).toBeGreaterThanOrEqual(1);

    expect(scout.team).toHaveProperty("club_name");
    expect(typeof scout.team.club_name).toBe("string");

    expect(scout.team).toHaveProperty("stadium_name");
    expect(typeof scout.team.stadium_name).toBe("string");

    expect(scout.team).toHaveProperty("logo");
    expect(typeof scout.team.logo).toBe("string");

    expect(scout.team).toHaveProperty("adress");
    expect(typeof scout.team.adress).toBe("string");

    expect(scout.team).toHaveProperty("zip_code");
    expect(typeof scout.team.zip_code).toBe("string");
    expect(scout.team.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

    expect(scout.team).toHaveProperty("city");
    expect(typeof scout.team.city).toBe("string");

    expect(scout.team).toHaveProperty("latitude");
    expect(typeof scout.team.latitude).toBe("number");

    expect(scout.team).toHaveProperty("longitude");
    expect(typeof scout.team.longitude).toBe("number");

    expect(scout).toHaveProperty("role");
    expect(scout.role).toBeFalsy();

    expect(scout).toHaveProperty("gender");
    expect(typeof scout.gender).toBe("string");
    expect(scout.gender).toMatch(genderRegex);

    expect(scout).toHaveProperty("nationality");
    expect(typeof scout.nationality).toBe("string");
    expect(scout.nationality).toMatch(nationalityRegex);
  });
});

test("route GET /player mauvais Token", async () => {
  const res = await request(app)
    .get("/player")
    .auth(MAUVAISTOKEN, { type: "bearer" })
    .expect(403);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"Accès interdit\"}");
});

test("route GET /player sans Token", async () => {
  const res = await request(app)
    .get("/player")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(401);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"Token non disponible\"}");
});

test("route GET /player Token expiré", async () => {
  const res = await request(app)
    .get("/player")
    .set("Accept", "application/json")
    .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiam91ZXVyIiwiaWQiOjEsImZpcnN0bmFtZSI6IkplYW4iLCJpYXQiOjE3MTE2NjE0MDMsImV4cCI6MTcxMTY2MTQyM30.fRIjw_TSyouBYO_NohP3mDAUyKCKIPbKQHQWTAWJFQ4", { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(403);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"jwt expired\"}");
});

test("route POST /player/match", async () => {
  const res = await request(app)
    .post("/player/match")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .send({
      homeTeam: 1,
      awayTeam: 2,
      date: "2024-12-31",
    })
    .expect("Content-Type", /json/)
    .expect(201);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("message");
  expect(typeof body.message).toBe("string");
  expect(body.message).toBe("Datas saved");
});

test("route POST /player/match mauvais token", async () => {
  const res = await request(app)
    .post("/player/match")
    .set("Accept", "application/json")
    .auth(MAUVAISTOKEN, { type: "bearer" })
    .send({
      homeTeam: 1,
      awayTeam: 2,
      date: "2024-12-31",
    })
    .expect("Content-Type", /json/)
    .expect(403);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("error");
  expect(typeof body.error).toBe("string");
  expect(body.error).toBe("Accès interdit");
});

test("route GET /player/stats", async () => {
  const res = await request(app)
    .get("/player/stats")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("assists");
  expect(typeof body.assists).toBe("string");
  expect(body.assists).toBe("1.3000000000000000");

  expect(body).toHaveProperty("goals_conceded");
  expect(typeof body.goals_conceded).toBe("string");
  expect(body.goals_conceded).toBe("0.00000000000000000000");

  expect(body).toHaveProperty("goals_scored");
  expect(typeof body.goals_scored).toBe("string");
  expect(body.goals_scored).toBe("1.0500000000000000");

  expect(body).toHaveProperty("red_card");
  expect(typeof body.red_card).toBe("string");
  expect(body.red_card).toBe("0.00000000000000000000");

  expect(body).toHaveProperty("stops");
  expect(typeof body.stops).toBe("string");
  expect(body.stops).toBe("0.00000000000000000000");

  expect(body).toHaveProperty("yellow_card");
  expect(typeof body.yellow_card).toBe("string");
  expect(body.yellow_card).toBe("0.40000000000000000000");
});

test("route PATCH /player/match/21", async () => {
  const res = await request(app)
    .patch("/player/match/21")
    .set("Accept", "application/json")
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
    .expect("Content-Type", /json/)
    .expect(200);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("message");
  expect(typeof body.message).toBe("string");
  expect(body.message).toBe("Datas updated");
});

test("route PATCH /player/match/22 mauvais id", async () => {
  const res = await request(app)
    .patch("/player/match/22")
    .set("Accept", "application/json")
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
    .expect("Content-Type", /json/)
    .expect(404);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toBe("Ressource not found");
});

test("route DELETE /player/match/21", async () => {
  await request(app)
    .delete("/player/match/21")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(204);
});

test("route DELETE /player/match/21 mauvais id", async () => {
  const res = await request(app)
    .delete("/player/match/21")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(404);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toBe("Ressource not Found");
});

test("route GET /player/match/stats", async () => {
  const res = await request(app)
    .get("/player/match/stats")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((match) => {
    expect(match).toHaveProperty("id");
    expect(typeof match.id).toBe("number");
    expect(match.id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("match_id");
    expect(typeof match.match_id).toBe("number");
    expect(match.match_id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("assists");
    expect(typeof match.assists).toBe("number");
    expect(match.assists).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("goals_conceded");
    expect(typeof match.goals_conceded).toBe("number");
    expect(match.goals_conceded).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("goals_scored");
    expect(typeof match.goals_scored).toBe("number");
    expect(match.goals_scored).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("red_card");
    expect(typeof match.red_card).toBe("number");
    expect(match.red_card).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("stops");
    expect(typeof match.stops).toBe("number");
    expect(match.stops).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("yellow_card");
    expect(typeof match.yellow_card).toBe("number");
    expect(match.yellow_card).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("minutes_played");
    expect(typeof match.minutes_played).toBe("number");
    expect(match.minutes_played).toBeGreaterThanOrEqual(0);

    expect(match).toHaveProperty("fitness");
    expect(typeof match.fitness).toBe("string");
    expect(match.fitness).toMatch(fitnessRegex);

    expect(match).toHaveProperty("score");
    expect(typeof match.score).toBe("string");
    expect(match.score).toMatch(scoreRegex);

    expect(match).toHaveProperty("date");
    expect(typeof match.date).toBe("string");

    expect(typeof match.away).toBe("object");

    expect(match.away).toHaveProperty("team_id");
    expect(typeof match.away.team_id).toBe("number");
    expect(match.away.team_id).toBeGreaterThanOrEqual(1);

    expect(match.away).toHaveProperty("club_name");
    expect(typeof match.away.club_name).toBe("string");

    expect(match.away).toHaveProperty("stadium_name");
    expect(typeof match.away.stadium_name).toBe("string");

    expect(match.away).toHaveProperty("logo");
    expect(typeof match.away.logo).toBe("string");

    expect(match.away).toHaveProperty("adress");
    expect(typeof match.away.adress).toBe("string");

    expect(match.away).toHaveProperty("zip_code");
    expect(typeof match.home.zip_code).toBe("string");
    expect(match.home.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

    expect(match.home).toHaveProperty("city");
    expect(typeof match.home.city).toBe("string");

    expect(match.home).toHaveProperty("latitude");
    expect(typeof match.home.latitude).toBe("number");

    expect(match.home).toHaveProperty("longitude");
    expect(typeof match.home.longitude).toBe("number");

    expect(typeof match.away).toBe("object");

    expect(match.away).toHaveProperty("team_id");
    expect(typeof match.away.team_id).toBe("number");
    expect(match.away.team_id).toBeGreaterThanOrEqual(1);

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
    expect(typeof match.away.latitude).toBe("number");

    expect(match.away).toHaveProperty("longitude");
    expect(typeof match.away.longitude).toBe("number");
  });
});

test("route PATCH /player", async () => {
  const res = await request(app)
    .patch("/player")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .send({
      firstname: "Pierre",
      nationality: "Italienne",
      gender: "Femme",
    })
    .expect("Content-Type", /json/)
    .expect(200);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("message");
  expect(typeof body.message).toBe("string");
  expect(body.message).toBe("Datas updated");
});

test("route PATCH /player retour aux données de base", async () => {
  const NEWTOKEN = createAccessToken({
    id: 1, firstname: "Pierre", lastname: "Dujardin", role: true,
  });
  await request(app)
    .patch("/player")
    .set("Accept", "application/json")
    .auth(NEWTOKEN, { type: "bearer" })
    .send({
      firstname: "Jean",
      nationality: "Française",
      gender: "Homme",
    })
    .expect("Content-Type", /json/)
    .expect(200);
});
