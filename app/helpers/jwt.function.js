import jwt from "jsonwebtoken";

export default function createJWT(data) {
  const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 3600;
  const expiresAt = Math.round((new Date().getTime() / 1000) + expiresIn);
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn });

  return { jwt: token, expiresAt };
}
