import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { createAccessToken, createRefreshToken } from "../app/helpers/jwt.function.js";

const TOKEN = createAccessToken({
  id: 1, firstname: "romuald", lastname: "patfoort", role: true,
});

const REFRESHTOKEN = createRefreshToken({
  id: 1, firstname: "romuald", lastname: "patfoort", role: true,
});

test("route GET /user", async () => {
  const res = await request(app)
    .get("/user")
    .set("Accept", "application/json")
    .auth(TOKEN, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("role");
  expect(res.body.role).toBeTruthy();

  expect(res.body).toHaveProperty("id");
  expect(typeof res.body.id).toBe("number");
  expect(res.body.id).toBe(1);

  expect(res.body).toHaveProperty("firstname");
  expect(typeof res.body.firstname).toBe("string");
  expect(res.body.firstname).toMatch("romuald");
});

test("route POST /login", async () => {
  const res = await request(app)
    .post("/login")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .send({
      email: "jean.dujardin@mail.io",
      password: "yjjk8E676a9JQZ!",
    })
    .expect(200);

  expect(typeof res.body).toBe("object");
  expect(res.body).toHaveProperty("accessToken");
  expect(typeof res.body.accessToken).toBe("string");
  expect(res.body.accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./);

  expect(typeof res.headers).toBe("object");
  expect(res.headers).toHaveProperty("set-cookie");
});

test("route POST /login mauvais email", async () => {
  const res = await request(app)
    .post("/login")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .send({
      email: "jean.dujard@mail.io",
      password: "yjjk8E676a9JQZ!",
    })
    .expect(401);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toMatch("Authentification failed");
});

test("route POST /login mauvais mot de passe", async () => {
  const res = await request(app)
    .post("/login")
    .set("Accept", "application/json")
    .send({
      email: "jean.dujardin@mail.io",
      password: "yjjk8E676a9JQZ",
    })
    .expect("Content-Type", /json/)
    .expect(401);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toMatch("Authentification failed");
});

test("route POST /register", async () => {
  const res = await request(app)
    .post("/register")
    .set("Accept", "application/json")
    .send({
      lastname: "Doe",
      firstname: "John",
      email: "john.doe@example.io",
      password: "Test1234!",
      confirmedPassword: "Test1234!",
      role: false,
      gender: "Homme",
    })
    .expect("Content-Type", /json/)
    .expect(201);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("accessToken");
  expect(typeof res.body.accessToken).toBe("string");
  expect(res.body.accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./);

  expect(typeof res.headers).toBe("object");
  expect(res.headers).toHaveProperty("set-cookie");
});

test("route POST /register utilisateur existe déjà", async () => {
  const res = await request(app)
    .post("/register")
    .set("Accept", "application/json")
    .send({
      lastname: "Doe",
      firstname: "John",
      email: "john.doe@example.io",
      password: "Test1234!",
      confirmedPassword: "Test1234!",
      role: false,
      gender: "Homme",
    })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("error");
  expect(typeof res.body.error).toBe("string");
  expect(res.body.error).toMatch("User already exists");
});

test("route GET /refresh_token", async () => {
  const res = await request(app)
    .get("/refresh_token")
    .set("Cookie", [`refresh_token=${REFRESHTOKEN}`])
    .expect("Content-Type", /json/)
    .expect(200);

  expect(typeof res.body).toBe("object");

  expect(res.body).toHaveProperty("accessToken");
  expect(typeof res.body.accessToken).toBe("string");
  expect(res.body.accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./);
});
