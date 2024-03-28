import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import createJWT from "../app/helpers/jwt.function.js";

const TOKEN = createJWT({
  id: 1, firstname: "romuald", lastname: "patfoort", role: "recruteur",
});

test("route GET /scout/2/player/1", async () => {
  await request(app)
    .get("/scout/2/player/1")
    .set("Accept", "application/json")
    .auth(TOKEN.accessToken, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/2", async () => {
  const scout = await request(app)
    .get("/scout/2")
    .set("Accept", "application/json")
    .auth(TOKEN.accessToken, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);

  expect(typeof scout).toBe("object");
});

test("route GET /scout/1", async () => {
  const res = await request(app)
    .get("/scout/1")
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"No scout found\"}");
});

test("route GET /scout/2/player/1/match/2/stats", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2/stats")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/2/player/1/match/12/stats", async () => {
  const res = await request(app)
    .get("/scout/2/player/1/match/12/stats")
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"No match Found\"}");
});

test("route GET /scout/2/player/1/match/2", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2")
    .set("Accept", "application/json")
    .auth(TOKEN.accessToken, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/search/?strong_foot=Gauche&position=Gardien", async () => {
  const res = await request(app)
    .get("/scout/search/?strong_foot=Gauche&position=Gardien")
    .auth(TOKEN.accessToken, { type: "bearer" });

  expect(res.statusCode).toEqual(404);
  expect(res.body).toEqual({ error: "Player with this search not found" });
});

test("route GET /scout/search/?strong_foot=Droit&position=Défenseur gauche", async () => {
  await request(app)
    .get("/scout/search/?strong_foot=Droit&position=Défenseur gauche")
    .set("Accept", "application/json")
    .auth(TOKEN.accessToken, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/4/player/1/stats", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2/stats")
    .set("Accept", "application/json")
    .auth(TOKEN.accessToken, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});
