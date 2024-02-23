import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";

// eslint-disable-next-line max-len
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGxheWVyX2lkIjoxLCJmaXJzdG5hbWUiOiJKZWFuIiwibGFzdG5hbWUiOiJEdWphcmRpbiIsImVtYWlsIjoiamVhbi5kdWphcmRpbkBtYWlsLmlvIiwiYmlydGhfZGF0ZSI6IjE5OTMtMDUtMjBUMjI6MDA6MDAuMDAwWiIsIm5hdGlvbmFsaXR5IjoiQnLDqXNpbGllbiIsImF2YXRhciI6IlNWRyIsImdlbnJlIjoiSG9tbWUiLCJoZWlnaHQiOjE4Mywid2VpZ2h0Ijo2Mywic3Ryb25nX2Zvb3QiOiJEcm9pdCIsInRlYW1faWQiOlsxLDZdLCJzY291dF9pZCI6WzEsMiwzLDVdLCJwb3NpdGlvbiI6IkF0dGFxdWFudCIsIm51bWJlcl9vZl9tYXRjaGVzX3BsYXllZCI6NTAsInJvbGUiOiJqb3VldXIiLCJpYXQiOjE3MDg2OTQ3NDcsImV4cCI6MTcwODY5ODM0N30.ebZ2_7wiq9ItJQtEu19EPJaMT5kZ21FDIxfxjqbCN-Y";

test("route GET /scout/2/player/1", async () => {
  await request(app)
    .get("/scout/2/player/1")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});
