import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGxheWVyX2lkIjoxLCJmaXJzdG5hbWUiOiJKZWFuIiwibGFzdG5hbWUiOiJEdWphcmRpbiIsImVtYWlsIjoiamVhbi5kdWphcmRpbkBtYWlsLmlvIiwiYmlydGhfZGF0ZSI6IjE5OTMtMDUtMjBUMjI6MDA6MDAuMDAwWiIsIm5hdGlvbmFsaXR5IjoiQnLDqXNpbGllbiIsImF2YXRhciI6IlNWRyIsImdlbnJlIjoiSG9tbWUiLCJoZWlnaHQiOjE4Mywid2VpZ2h0Ijo2Mywic3Ryb25nX2Zvb3QiOiJEcm9pdCIsInRlYW1faWQiOlsxLDZdLCJzY291dF9pZCI6WzEsMiwzLDVdLCJwb3NpdGlvbiI6IkF0dGFxdWFudCIsIm51bWJlcl9vZl9tYXRjaGVzX3BsYXllZCI6NTAsInJvbGUiOiJqb3VldXIiLCJpYXQiOjE3MDg2OTk5ODUsImV4cCI6MTcwODcwMzU4NX0.32JxKa8Vdurm-qkVU33CVRGyX_V3XH8_4c17hoclOZA";

test("route GET /player/1", async () => {
  const scout = await request(app)
    .get("/player/1")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);

  expect(typeof scout).toBe("object");
});

test("route GET /player/2", async () => {
  const res = await request(app)
    .get("/player/2")
    .expect(404);

  expect(typeof res.text).toBe("string");
  expect(res.text).toMatch("{\"error\":\"User not found\"}");
});

test("route GET /player/1/match", async () => {
  const scout = await request(app)
    .get("/player/1/match")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);

  expect(typeof scout).toBe("object");
});

test("route GET /player/1/stats", async () => {
  const scout = await request(app)
    .get("/player/1/match")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);

  expect(typeof scout).toBe("object");
});

test("route GET /player/1/match/1", async () => {
  const scout = await request(app)
    .get("/player/1/match/1")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);

  expect(typeof scout).toBe("object");
});

test("route POST /player/1/match", async () => {
  const res = await request(app)
    .post("/player/1/match")
    .send({
      homeTeam: 1,
      awayTeam: 4,
      date: "2024-02-22",
    });
  expect(res.statusCode).toEqual(201);
});

test("route POST /player/1/match/13/stats", async () => {
  const res = await request(app)
    .post("/player/1/match/13/stats")
    .send({
      assists: 2,
      goals_scored: 3,
      minutes_played: 70,
      red_card: 0,
      yellow_card: 1,
      stops: 0,
      goals_conceded: 0,
      fitness: "En forme",
    });
  expect(res.statusCode).toEqual(201);
});

test("route PATCH /player/1/match/3", async () => {
  const res = await request(app)
    .patch("/player/1/match/3")
    .send({
      score: "10-10",
    })
    .expect(201);
  expect(res.body).toHaveProperty("success", true);
});

test("route PATCH /player/1/match/3/stats", async () => {
  const res = await request(app)
    .patch("/player/1/match/3/stats")
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
  expect(res.body).toHaveProperty("success", true);
});
