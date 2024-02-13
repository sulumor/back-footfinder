import express from "express";
import cors from "cors";
import router from "./routers/index.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import createDoc from "./helpers/swagger.doc.js";

const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();

createDoc(app);

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
