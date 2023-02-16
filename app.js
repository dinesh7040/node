import express from "express";
import cors from "cors";
import chalk from "chalk";
import path from "path";
const __dirname = path.resolve();
import helmet from "helmet";
import * as config from "./config/config.js";
import { setup } from "./src/core/setup.js";
import require from "requirejs";
const { exec } = require("child_process");
//require routers
import { routes } from "./src/App/routes/index.js";
const app = express();

//Top level security
app.use(helmet());

//Enable cross origin policy
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT",
    preflightContinue: false,
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "./src/core/views/ui");
app.use(express.static("pages"));
app.use(express.static(path.join(__dirname, "./src/core/views/assets/")));
app.use(
  "/doctor",
  express.static(path.join(__dirname, "assets/images/doctor"))
);
app.use("/news", express.static(path.join(__dirname, "assets/images/news")));
app.use(
  "/resource",
  express.static(path.join(__dirname, "assets/images/resource"))
);

//Parsing incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.use(function (req, res, next) {
  res.status(403).json({ message: "Request not found" });
});

const AppConfig =
  config.mode === "production" ? config.production : config.development;

setup(AppConfig)
  .then((config) => {
    console.clear();
    app.listen(config.server.port, () => {
      console.log(" 🐶 Vestline API Working on port " + config.server.port);
    });
  })
  .catch((error) => {
    console.clear();

    console.log(error);
    // Logger.error(JSON.stringify(error));
    // process.abort();
  });
