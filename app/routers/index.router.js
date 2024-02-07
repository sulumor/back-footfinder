import express from "express";
// import apiRouter from "./api/index.router.js";


const router = express.Router();

router.use("/", (_, res) => {
  res.json({texte : 'Hello world!'})
})
// router.use("/api", apiRouter);

export default router;