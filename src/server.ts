import express from "express";
import http from "http";
import fs from "fs";
import WebSocket from "ws";

import devClientMiddleware from "./dev-client";
import validateRawArtifact from "./common/validateRawArtifact";

interface Input {
  port: number;
  paths?: string[];
}

const startServer = async ({ port, paths = [] }: Input) => {
  const app: express.Application = express();

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
      // console.log(`Received message from client: ${message}`);
      if (message === "CONNECTION_OPENED" && paths.length > 0) {
        // loop through files and send its contents
        paths.forEach((path) => {
          const rawJson = fs.readFileSync(path);
          if (validateRawArtifact(rawJson)) {
            const artifact = JSON.parse(rawJson.toString());
            const payload = {
              type: "NEW_CONTRACT",
              artifact,
              path,
            };
            ws.send(JSON.stringify(payload));
          }
        });
      }
    });

    ws.on("close", function () {
      // console.log("Websocket connection closed.");
    });
  });

  server.listen(port, function () {
    console.log(
      `Captain, you cockpit is ready for you at: http://localhost:${port}`,
    );
  });
};

export default startServer;
