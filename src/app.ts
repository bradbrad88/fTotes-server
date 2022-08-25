import express from "express";
import logger from "morgan";
import router from "routes";
import errorhandler from "src/error";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

app.use(errorhandler);

export default app;
