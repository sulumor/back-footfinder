import jwt from "jsonwebtoken";
import ApiError from "../errors/api.error.js";

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;// Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Null token" });
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

function authorizationRoute({ originalUrl, user }, _, next) {
  const baseRoute = originalUrl.split("/")[1];
  // eslint-disable-next-line no-nested-ternary
  const role = user.role === "joueur" ? "player" : user.role === "recruteur" ? "scout" : null;
  if (baseRoute !== role) return next(new ApiError("Access Unauthorized", { httpStatus: 401 }));
  return next();
}

export { authenticateToken, authorizationRoute };
