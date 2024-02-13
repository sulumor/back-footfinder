import express from "express";
import router from "./routers/index.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import createDoc from "./helpers/swagger.doc.js";

const app = express();

createDoc(app);

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
