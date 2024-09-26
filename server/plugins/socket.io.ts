import { App } from "@/app/app";
import { WebSocketServer } from "@/app/WebSocket/types";
import { Server as Engine } from "engine.io";
import { defineEventHandler } from "h3";
import type { NitroApp } from "nitropack";
import { Server } from "socket.io";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const server: WebSocketServer = new Server();

  server.bind(engine);

  new App(server);

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          engine.onWebSocket(req, rawSocket, websocket);
        },
      },
    })
  );
});
