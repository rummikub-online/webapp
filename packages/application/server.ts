import { Game } from "@rumi/application/entities/Game";
import { createIo } from "@rumi/application/io";
import cors from "cors";
import { randomUUID } from "crypto";
import express from "express";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
  }),
);

const game = new Game({ id: randomUUID() });
createIo(server, game);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
