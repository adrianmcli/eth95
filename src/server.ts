import express from "express";
import http from "http";
import WebSocket from "ws";

import devClientMiddleware from "./dev-client";

const startServer = async ({ port }: { port: number }) => {
  const app: express.Application = express();

  // regular route
  app.use("/api", function (req, res, next) {
    console.log("/api route requested");
    res.json({ ping: "pong" });
  });

  // use middleware if in development, otherwise serve prod build
  if (process.env.ETHPILOT_DEV) {
    app.use("/", devClientMiddleware());
  } else {
    app.use("/", express.static(__dirname + "/app"));
  }

  // setup websocket stuff
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

  server.on("upgrade", function (request, socket, head) {
    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", function (ws, request) {
    ws.on("message", function (message) {
      console.log(`Received message from client: ${message}`);
      ws.send("gotcha");
    });
    ws.on("close", function () {
      console.log("Websocket connection closed.");
    });
  });

  server.listen(port, function () {
    console.log(
      `Captain, you cockpit is ready for you at: http://localhost:${port}`,
    );
  });
};

export default startServer;
