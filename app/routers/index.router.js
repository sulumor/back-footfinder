import express from "express";
import authRouter from "./auth/index.router.js";
import playerRouter from "./player/index.router.js";
import scoutRouter from "./scout/index.router.js";

const router = express.Router();

router.use("/player", playerRouter);
router.use("/scout", scoutRouter);
router.use("/", authRouter);
// router.use("/api", apiRouter);

export default router;
