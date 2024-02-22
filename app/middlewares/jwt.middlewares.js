import jwt from "jsonwebtoken";

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;// Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Null token" });
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

// eslint-disable-next-line import/prefer-default-export
export { authenticateToken };
