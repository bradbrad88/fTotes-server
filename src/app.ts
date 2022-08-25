import express from "express";
import logger from "morgan";
import router from "routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

export default app;
