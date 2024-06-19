import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { createAccessToken } from "../app/helpers/jwt.function.js";
import {
  fitnessRegex, genderRegex, nationalityRegex, positionRegex, scoreRegex,
} from "../app/schemas/utils/regex.schema.js";

const TOKEN = createAccessToken({
  id: 2, firstname: "Nicolas", lastname: "Dupont", role: false,
});
const MAUVAISTOKEN = createAccessToken({
  id: 2, firstname: "romuald", lastname: "patfoort", role: true,
});

test("route GET /scout", async () => {
  const res = await request(app)
    .get("/scout")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  const [body] = res.body;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("id");
  expect(typeof body.id).toBe("number");
  expect(body.id).toBe(2);

  expect(body).toHaveProperty("scout_id");
  expect(typeof body.scout_id).toBe("number");
  expect(body.scout_id).toBe(1);

  expect(body).toHaveProperty("firstname");
  expect(typeof body.firstname).toBe("string");
  expect(body.firstname).toBe("Nicolas");

  expect(body).toHaveProperty("lastname");
  expect(typeof body.lastname).toBe("string");
  expect(body.lastname).toBe("Dupont");

  expect(body).toHaveProperty("email");
  expect(typeof body.email).toBe("string");
  expect(body.email).toBe("nicolas.dupon@mail.io");

  expect(body).toHaveProperty("nationality");
  expect(typeof body.nationality).toBe("string");
  expect(body.nationality).toMatch("Portugaise");

  expect(body).toHaveProperty("avatar");
  expect(typeof body.avatar).toBe("string");

  expect(body).toHaveProperty("gender");
  expect(typeof body.gender).toBe("string");
  expect(body.gender).toMatch("Homme");

  expect(body).toHaveProperty("team");
  expect(typeof body.team).toBe("object");

  expect(body.team).toHaveProperty("team_id");
  expect(typeof body.team.team_id).toBe("number");
  expect(body.team.team_id).toBeGreaterThanOrEqual(1);

  expect(body.team).toHaveProperty("stadium_name");
  expect(typeof body.team.stadium_name).toBe("string");

  expect(body.team).toHaveProperty("logo");
  expect(typeof body.team.logo).toBe("string");

  expect(body.team).toHaveProperty("adress");
  expect(typeof body.team.adress).toBe("string");

  expect(body.team).toHaveProperty("zip_code");
  expect(typeof body.team.zip_code).toBe("string");
  expect(body.team.zip_code).toMatch(/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/);

  expect(body.team).toHaveProperty("city");
  expect(typeof body.team.city).toBe("string");

  expect(body.team).toHaveProperty("latitude");
  expect(typeof body.team.latitude).toBe("number");

  expect(body.team).toHaveProperty("longitude");
  expect(typeof body.team.longitude).toBe("number");

  expect(body).toHaveProperty("role");
  expect(body.role).toBeFalsy();

  body.players.forEach((player) => {
    expect(typeof player).toBe("object");

    expect(player).toHaveProperty("id");
    expect(typeof player.id).toBe("number");

    expect(player).toHaveProperty("player_id");
    expect(typeof player.player_id).toBe("number");

    expect(player).toHaveProperty("firstname");
    expect(typeof player.firstname).toBe("string");

    expect(player).toHaveProperty("lastname");
    expect(typeof player.lastname).toBe("string");

    expect(player).toHaveProperty("email");
    expect(typeof player.email).toBe("string");

    expect(player).toHaveProperty("birth_date");
    expect(typeof player.birth_date).toBe("string");

    expect(player).toHaveProperty("nationality");
    expect(typeof player.nationality).toBe("string");
    expect(player.nationality).toMatch(nationalityRegex);

    expect(player).toHaveProperty("avatar");
    expect(typeof player.avatar).toBe("string");

    expect(player).toHaveProperty("gender");
    expect(typeof player.gender).toBe("string");
    expect(player.gender).toMatch(genderRegex);

    expect(player).toHaveProperty("height");
    expect(typeof player.height).toBe("number");

    expect(player).toHaveProperty("weight");
    expect(typeof player.weight).toBe("number");

    expect(player).toHaveProperty("strong_foot");

    expect(player).toHaveProperty("position");
    expect(typeof player.position).toBe("string");
    expect(player.position).toMatch(positionRegex);

    expect(player).toHaveProperty("number_of_matches_played");
    expect(typeof player.number_of_matches_played).toBe("number");

    expect(player).toHaveProperty("role");
    expect(player.role).toBeTruthy();

    player.teams.forEach((team) => {
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
  });
});

test("route GET /scout mauvais Token", async () => {
  const res = await request(app)
    .get("/scout")
    .auth(MAUVAISTOKEN, { type: "bearer" })
    .expect(403);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"Accès interdit\"}");
});

test("route GET /scout sans Token", async () => {
  const res = await request(app)
    .get("/scout")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(401);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"Token non disponible\"}");
});

test("route GET /scout Token expiré", async () => {
  const res = await request(app)
    .get("/scout")
    .set("Accept", "application/json")
    .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpmYWxzZSwiaWQiOjIsImZpcnN0bmFtZSI6Ik5pY29sYXMiLCJpYXQiOjE3MTc2ODcwODAsImV4cCI6MTcxNzY4NzEwMH0.ru0eKSIhrFN-VUzN20lgQU4htycf4O8uv-lWdgN8dho", { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(403);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"jwt expired\"}");
});

test("route POST /scout/player/22", async () => {
  const res = await request(app)
    .post("/scout/player/22")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(201);

  const { body } = res;

  expect(typeof body).toBe("object");

  expect(body).toHaveProperty("message");
  expect(typeof body.message).toBe("string");
  expect(body.message).toBe("Datas saved");
});

test("route DELETE /scout/player/22", async () => {
  await request(app)
    .delete("/scout/player/22")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(204);
});

test("route DELETE /scout/player/22 mauvais id", async () => {
  const res = await request(app)
    .delete("/scout/player/22")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(404);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toBe("Ressource not Found");
});

test("route GET /scout/player/1/match", async () => {
  const res = await request(app)
    .get("/scout/player/1/match")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  const { body } = res;

  body.forEach((match) => {
    expect(match).toHaveProperty("id");
    expect(typeof match.id).toBe("number");
    expect(match.id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("match_id");
    expect(typeof match.match_id).toBe("number");
    expect(match.match_id).toBeGreaterThanOrEqual(1);

    expect(match).toHaveProperty("assists");
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

test("route GET /scout/player/2/match mauvais id", async () => {
  const res = await request(app)
    .get("/scout/player/2/match")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(404);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toBe("Ressource not Found");
});

test("route GET /scout/search/?nationality=Marocaine", async () => {
  const res = await request(app)
    .get("/scout/search/?nationality=Marocaine")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((player) => {
    expect(typeof player).toBe("object");

    expect(player).toHaveProperty("id");
    expect(typeof player.id).toBe("number");

    expect(player).toHaveProperty("player_id");
    expect(typeof player.player_id).toBe("number");

    expect(player).toHaveProperty("firstname");
    expect(typeof player.firstname).toBe("string");

    expect(player).toHaveProperty("lastname");
    expect(typeof player.lastname).toBe("string");

    expect(player).toHaveProperty("email");
    expect(typeof player.email).toBe("string");

    expect(player).toHaveProperty("birth_date");
    expect(typeof player.birth_date).toBe("string");

    expect(player).toHaveProperty("nationality");
    expect(typeof player.nationality).toBe("string");
    expect(player.nationality).toMatch(nationalityRegex);

    expect(player).toHaveProperty("avatar");
    expect(typeof player.avatar).toBe("string");

    expect(player).toHaveProperty("gender");
    expect(typeof player.gender).toBe("string");
    expect(player.gender).toMatch(genderRegex);

    expect(player).toHaveProperty("height");
    expect(typeof player.height).toBe("number");

    expect(player).toHaveProperty("weight");
    expect(typeof player.weight).toBe("number");

    expect(player).toHaveProperty("strong_foot");

    expect(player).toHaveProperty("position");
    expect(typeof player.position).toBe("string");
    expect(player.position).toMatch(positionRegex);

    expect(player).toHaveProperty("number_of_matches_played");
    expect(typeof player.number_of_matches_played).toBe("number");

    expect(player).toHaveProperty("role");
    expect(player.role).toBeTruthy();

    player.teams.forEach((team) => {
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
  });
});

test("route PATCH /scout", async () => {
  const res = await request(app)
    .patch("/scout")
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

test("route PATCH /scout retour aux données de base", async () => {
  const NEWTOKEN = createAccessToken({
    id: 2, firstname: "Pierre", lastname: "Dupont", role: false,
  });
  await request(app)
    .patch("/scout")
    .set("Accept", "application/json")
    .auth(NEWTOKEN, { type: "bearer" })
    .send({
      firstname: "Nicolas",
      nationality: "Portugaise",
      gender: "Homme",
    })
    .expect("Content-Type", /json/)
    .expect(200);
});
