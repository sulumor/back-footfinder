import "../app/helpers/env.load.js";
import request from "supertest";
import app from "../app/index.app.js";

test("route GET /datas/teams", async () => {
  const res = await request(app)
    .get("/datas/teams")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/);

  res.body.forEach((team) => {
    expect(typeof team).toBe("object");

    expect(team).toHaveProperty("id");
    expect(typeof team.id).toBe("number");
    expect(team.id).toBeGreaterThanOrEqual(1);

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
