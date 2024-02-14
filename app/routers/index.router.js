import express from "express";
import authRouter from "./auth/index.router.js";
import playerRouter from "./player/index.router.js";
import scoutRouter from "./scout/index.router.js";
import ApiError from "../errors/api.error.js";

const router = express.Router();

router.use("/player", playerRouter);
router.use("/scout", scoutRouter);
router.use("/", authRouter);
// router.use("/api", apiRouter);

router.use((_, __, next) => {
  next(new ApiError("Ressource not found", { htppStatus: 404 }));
});

export default router;
