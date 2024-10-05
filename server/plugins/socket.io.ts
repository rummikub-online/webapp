import { app } from "@/app/app";
import { defineEventHandler } from "h3";
import type { NitroApp } from "nitropack";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  nitroApp.router.use(
    "/socket.io",
    defineEventHandler({
      handler(event) {
        app.engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          app.engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          app.engine.onWebSocket(req, rawSocket, websocket);
        },
      },
    }),
  );
});
