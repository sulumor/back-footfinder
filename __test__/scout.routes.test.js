import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { createAccessToken } from "../app/helpers/jwt.function.js";

const TOKEN = createAccessToken({
  id: 1, firstname: "romuald", lastname: "patfoort", role: false,
});

test("route GET /scout/2/player/1", async () => {
  const res = await request(app)
    .get("/scout/2/player/1")
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

  expect(res.body).toHaveProperty("gender");
  expect(typeof res.body.gender).toBe("string");
  expect(res.body.gender).toMatch(/^Homme|Femme|Non-binaire$/);

  expect(res.body).toHaveProperty("height");
  expect(typeof res.body.height).toBe("number");
  expect(res.body.height).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("weight");
  expect(typeof res.body.weight).toBe("number");
  expect(res.body.weight).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("strong_foot");
  expect(typeof res.body.strong_foot).toBe("boolean");

  expect(res.body).toHaveProperty("position");
  expect(typeof res.body.position).toBe("string");
  expect(res.body.position).toMatch(/^Gardien|Libéro|Défenseur gauche|Défenseur droit|Milieu défensif gauche|Milieu défensif droit|Milieu défensif central|Milieu gauche|Milieu droit|Milieu offensif|Ailier gauche|Ailier droit|Attaquant|Avant-centre|Remplaçant$/);

  expect(res.body).toHaveProperty("number_of_matches_played");
  expect(typeof res.body.number_of_matches_played).toBe("number");
  expect(res.body.number_of_matches_played).toBeGreaterThanOrEqual(0);

  expect(res.body).toHaveProperty("role");
  expect(res.body.role).toBeTruthy();

  res.body.teams.forEach((team) => {
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
    expect(typeof team.latitude).toBe("string");
    expect(team.latitude).toMatch(/\d+\.\d{6}/);

    expect(team).toHaveProperty("longitude");
    expect(typeof team.longitude).toBe("string");
    expect(team.longitude).toMatch(/\d+\.\d{6}/);
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
    expect(scout.role).toBeFalsy();

    scout.player_id.forEach((player) => {
      expect(typeof player).toBe("number");
      expect(player).toBeGreaterThanOrEqual(1);
    });
  });
});

test("route GET /scout/2", async () => {
  const res = await request(app)
    .get("/scout/2")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res).toBe("object");

  expect(res.body).toHaveProperty("id");
  expect(typeof res.body.id).toBe("number");
  expect(res.body.id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("scout_id");
  expect(typeof res.body.scout_id).toBe("number");
  expect(res.body.scout_id).toBeGreaterThanOrEqual(1);

  expect(res.body).toHaveProperty("firstname");
  expect(typeof res.body.firstname).toBe("string");

  expect(res.body).toHaveProperty("lastname");
  expect(typeof res.body.lastname).toBe("string");

  expect(res.body).toHaveProperty("email");
  expect(typeof res.body.email).toBe("string");
  expect(res.body.email).toMatch(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);

  expect(res.body).toHaveProperty("avatar");
  expect(typeof res.body.avatar).toBe("string");

  expect(res.body).toHaveProperty("club");
  expect(typeof res.body.club).toBe("string");

  expect(res.body).toHaveProperty("city");
  expect(typeof res.body.city).toBe("string");

  expect(res.body).toHaveProperty("role");
  expect(res.body.role).toBeFalsy();

  res.body.players.forEach((player) => {
    expect(typeof player).toBe("object");

    expect(player).toHaveProperty("id");
    expect(typeof player.id).toBe("number");
    expect(player.id).toBeGreaterThanOrEqual(1);

    expect(player).toHaveProperty("player_id");
    expect(typeof player.player_id).toBe("number");
    expect(player.player_id).toBeGreaterThanOrEqual(1);

    expect(player).toHaveProperty("firstname");
    expect(typeof player.firstname).toBe("string");

    expect(player).toHaveProperty("lastname");
    expect(typeof player.lastname).toBe("string");

    expect(player).toHaveProperty("email");
    expect(typeof player.email).toBe("string");
    expect(player.email).toMatch(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);

    expect(player).toHaveProperty("birth_date");
    expect(typeof player.birth_date).toBe("string");
    expect(player.birth_date).toMatch(/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/);

    expect(player).toHaveProperty("nationality");
    expect(typeof player.nationality).toBe("string");

    expect(player).toHaveProperty("avatar");
    expect(typeof player.avatar).toBe("string");

    expect(player).toHaveProperty("gender");
    expect(typeof player.gender).toBe("string");
    expect(player.gender).toMatch(/^Homme|Femme|Non-binaire$/);

    expect(player).toHaveProperty("height");
    expect(typeof player.height).toBe("number");
    expect(player.height).toBeGreaterThanOrEqual(1);

    expect(player).toHaveProperty("weight");
    expect(typeof player.weight).toBe("number");
    expect(player.weight).toBeGreaterThanOrEqual(1);

    expect(player).toHaveProperty("strong_foot");
    expect(typeof player.strong_foot).toBe("boolean");

    expect(player).toHaveProperty("position");
    expect(typeof player.position).toBe("string");
    expect(player.position).toMatch(/^Gardien|Libéro|Défenseur gauche|Défenseur droit|Milieu défensif gauche|Milieu défensif droit|Milieu défensif central|Milieu gauche|Milieu droit|Milieu offensif|Ailier gauche|Ailier droit|Attaquant|Avant-centre|Remplaçant$/);

    expect(player).toHaveProperty("number_of_matches_played");
    expect(typeof player.number_of_matches_played).toBe("number");
    expect(player.number_of_matches_played).toBeGreaterThanOrEqual(0);

    expect(player).toHaveProperty("role");
    expect(player.role).toBeTruthy();
  });
});

test("route GET /scout/1", async () => {
  const res = await request(app)
    .get("/scout/1")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"No scout found\"}");
});

test("route GET /scout/2/player/1/match/2/stats", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2/stats")
    .auth(TOKEN, { type: "bearer" })
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/2/player/1/match/54/stats", async () => {
  const res = await request(app)
    .get("/scout/2/player/1/match/54/stats")
    .auth(TOKEN, { type: "bearer" })
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"No stats found\"}");
});

test("route GET /scout/2/player/1/match/2", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/search/?strong_foot=Gauche&position=Gardien", async () => {
  const res = await request(app)
    .get("/scout/search/?strong_foot=Gauche&position=Gardien")
    .auth(TOKEN, { type: "bearer" });

  expect(res.statusCode).toEqual(500);
});

test("route GET /scout/search/?strong_foot=Droit&position=Défenseur gauche", async () => {
  await request(app)
    .get("/scout/search/?strong_foot=Droit&position=Défenseur gauche")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(500)
    .expect("Content-Type", /json/);
});

test("route GET /scout/4/player/1/stats", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2/stats")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});
