import { GameRepository } from "@rumi/application/entities/GameRepository";
import { registerSocketEvents } from "@rumi/application/io";
import { registerRoutes } from "@rumi/application/routes";
import cors from "cors";
import express from "express";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
  }),
);

const gameRepository = new GameRepository();

registerSocketEvents(server, gameRepository);
registerRoutes(app, gameRepository);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
