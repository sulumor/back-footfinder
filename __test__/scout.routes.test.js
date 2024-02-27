/* eslint-disable jest/no-identical-title */
import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";

// eslint-disable-next-line max-len

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGxheWVyX2lkIjoxLCJmaXJzdG5hbWUiOiJKZWFuIiwibGFzdG5hbWUiOiJEdWphcmRpbiIsImVtYWlsIjoiamVhbi5kdWphcmRpbkBtYWlsLmlvIiwiYmlydGhfZGF0ZSI6IjE5OTMtMDUtMjBUMjI6MDA6MDAuMDAwWiIsIm5hdGlvbmFsaXR5IjoiQnLDqXNpbGllbiIsImF2YXRhciI6IlNWRyIsImdlbnJlIjoiSG9tbWUiLCJoZWlnaHQiOjE4Mywid2VpZ2h0Ijo2Mywic3Ryb25nX2Zvb3QiOiJEcm9pdCIsInRlYW1faWQiOlsxLDZdLCJzY291dF9pZCI6WzEsMiwzLDVdLCJwb3NpdGlvbiI6IkF0dGFxdWFudCIsIm51bWJlcl9vZl9tYXRjaGVzX3BsYXllZCI6NTAsInJvbGUiOiJqb3VldXIiLCJpYXQiOjE3MDg2OTU4MDQsImV4cCI6MTcwODY5OTQwNH0.tkuTK-QKIOldppC0XuUz5WKalp8bO2Y0ZTYfv3peFDE";

test("route GET /scout/2/player/1", async () => {
  await request(app)
    .get("/scout/2/player/1")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/2", async () => {
  const scout = await request(app)
    .get("/scout/2")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
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
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/search/?strong_foot=Gauche&position=Gardien", async () => {
  const res = await request(app)
    .get("/scout/search/?strong_foot=Gauche&position=Gardien")
    .auth(TOKEN, { type: "bearer" });

  expect(res.statusCode).toEqual(404);
  expect(res.body).toEqual({ error: "Player with this search not found" });
});

test("route GET /scout/search/?strong_foot=Droit&position=Défenseur gauche", async () => {
  await request(app)
    .get("/scout/search/?strong_foot=Droit&position=Défenseur gauche")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});

test("route GET /scout/4/player/1/stats", async () => {
  await request(app)
    .get("/scout/2/player/1/match/2/stats")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);
});
