import express from "express";
import morgan from "morgan";
import cors from "cors";
import connect from "./config/database";
import logger from "./utils/logger";

import dotenv from "dotenv";

dotenv.config();

import urlShortenRoute from "./routes"

require("./config/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));

app.use('/api', urlShortenRoute);

app.get("/", async (request, response) => {
  return response.status(200).json({
    status: true,
    message: "Welcome to url shortening app",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logger.info(`Server running at: http://localhost:${PORT}`);

  await connect();
});
