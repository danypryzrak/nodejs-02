const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/auth");
const contactsRouter = require("./routes/api/contacts");
const { errorHandlingMiddleware } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use(errorHandlingMiddleware);

module.exports = app;
