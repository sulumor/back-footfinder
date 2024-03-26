import jwt from "jsonwebtoken";

export default function createJWT({ role, id, firstname }) {
  const data = { role, id, firstname };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20 });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  return ({ accessToken, refreshToken });
}
