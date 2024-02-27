import express from "express";
import authRouter from "./auth/index.router.js";
import playerRouter from "./player/index.router.js";
import scoutRouter from "./scout/index.router.js";
import ApiError from "../errors/api.error.js";
import datasRouter from "./datas/index.router.js";

const router = express.Router();

router.use("/player", playerRouter);
router.use("/scout", scoutRouter);
router.use("/datas", datasRouter);
router.use("/", authRouter);

router.get("/", (_, res) => {
  res.redirect("/api-docs");
});

router.use((_, __, next) => {
  next(new ApiError("Ressource not found", { httpStatus: 404 }));
});

export default router;
