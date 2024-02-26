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
    .auth(TOKEN.jwt, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /json/);
});
