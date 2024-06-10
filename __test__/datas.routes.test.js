import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";
import { genderRegex, nationalityRegex, positionRegex } from "../app/schemas/utils/regex.schema.js";

test("route GET /datas/teams", async () => {
  const res = await request(app)
    .get("/datas/teams")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((team) => {
    expect(typeof team).toBe("object");

    expect(team).toHaveProperty("team_id");
    expect(typeof team.team_id).toBe("number");
    expect(team.team_id).toBeGreaterThanOrEqual(1);

    expect(team).toHaveProperty("club_name");
    expect(typeof team.club_name).toBe("string");

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

    expect(team).toHaveProperty("longitude");
    expect(typeof team.longitude).toBe("string");
  });
});

test("route GET /datas/positions", async () => {
  const res = await request(app)
    .get("/datas/positions")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((position) => {
    expect(typeof position).toBe("object");

    expect(position).toHaveProperty("id");
    expect(typeof position.id).toBe("number");
    expect(position.id).toBeGreaterThanOrEqual(1);

    expect(position).toHaveProperty("label");
    expect(typeof position.label).toBe("string");
    expect(position.label).toMatch(positionRegex);
  });
});

test("route GET /datas/nationalities", async () => {
  const res = await request(app)
    .get("/datas/nationalities")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((nationalitiy) => {
    expect(typeof nationalitiy).toBe("object");

    expect(nationalitiy).toHaveProperty("id");
    expect(typeof nationalitiy.id).toBe("number");
    expect(nationalitiy.id).toBeGreaterThanOrEqual(1);

    expect(nationalitiy).toHaveProperty("label");
    expect(typeof nationalitiy.label).toBe("string");
    expect(nationalitiy.label).toMatch(nationalityRegex);
  });
});

test("route GET /datas/genders", async () => {
  const res = await request(app)
    .get("/datas/genders")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  res.body.forEach((gender) => {
    expect(typeof gender).toBe("object");

    expect(gender).toHaveProperty("id");
    expect(typeof gender.id).toBe("number");
    expect(gender.id).toBeGreaterThanOrEqual(1);

    expect(gender).toHaveProperty("label");
    expect(typeof gender.label).toBe("string");
    expect(gender.label).toMatch(genderRegex);
  });
});
