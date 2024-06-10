import jwt from "jsonwebtoken";

export function createAccessToken({ role, id, firstname }) {
  return (jwt.sign({ role, id, firstname }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20 }));
}

export function createRefreshToken({ role, id, firstname }) {
  return (jwt.sign({ role, id, firstname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" }));
}
