import fs from "fs";
import path from "path";
import http from "http";
import express from "express";
import WebSocket from "ws";
import chalk from "chalk";
import chokidar from "chokidar";

import devClientMiddleware from "./dev-client";
import validateRawArtifact from "./common/validateRawArtifact";
import log from "./logger";
import { getJsonFilePaths } from "./artifact-paths";

interface IServer {
  port: number;
  paths?: string[];
  artifactPath?: string;
}

const startServer = async ({ port, paths = [], artifactPath }: IServer) => {
  const app: express.Application = express();

  // use middleware if in development, otherwise serve prod build
  if (process.env.ETH95_DEV) {
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

  const removeExtension = (str: string) =>
    str.split(".").slice(0, -1).join(".");

  // start listening for changes with chokidar
  let sender: WebSocket;
  if (artifactPath) {
    chokidar
      .watch(`${artifactPath}/*.json`)
      .on("add", (filePath) => {
        const rawJson = fs.readFileSync(filePath);
        if (validateRawArtifact(rawJson)) {
          log.info(`New contract: ${path.basename(filePath)}`);
          const artifact = JSON.parse(rawJson.toString());
          const payload = {
            type: "NEW_CONTRACT",
            artifact,
            path: filePath,
            name: removeExtension(path.basename(filePath)),
          };
          if (sender) {
            sender.send(JSON.stringify(payload));
          }
        }
      })
      .on("change", (filePath) => {
        const rawJson = fs.readFileSync(filePath);
        if (validateRawArtifact(rawJson)) {
          log.info(`Contract changed: ${path.basename(filePath)}`);
          const artifact = JSON.parse(rawJson.toString());
          const payload = {
            type: "CHANGE_CONTRACT",
            artifact,
            path: filePath,
            name: removeExtension(path.basename(filePath)),
          };
          if (sender) {
            sender.send(JSON.stringify(payload));
          }
        }
      })
      .on("unlink", (filePath) => {
        log.info(`Contract deleted: ${path.basename(filePath)}`);
        const payload = {
          type: "DELETE_CONTRACT",
          path: filePath,
        };
        if (sender) {
          sender.send(JSON.stringify(payload));
        }
      });
  }

  wss.on("connection", function (ws) {
    sender = ws;
    ws.on("message", function (message) {
      const msg = JSON.parse(message as string);
      if (msg.type === "CONNECTION_OPENED" && artifactPath) {
        // load initial state (i.e. send all valid files over)
        const jsonFilePaths = getJsonFilePaths(artifactPath);

        let count = 0;
        jsonFilePaths.forEach((filePath) => {
          const rawJson = fs.readFileSync(filePath);
          if (validateRawArtifact(rawJson)) {
            const artifact = JSON.parse(rawJson.toString());
            const payload = {
              type: "NEW_CONTRACT",
              artifact,
              path,
              name: removeExtension(path.basename(filePath)),
            };
            ws.send(JSON.stringify(payload));
            count++;
          }
        });
        log.info(`Sent ${count} contract(s) to client`);
      }
    });

    ws.on("close", function () {
      // console.log("Websocket connection closed.");
    });
  });

  server.listen(port, function () {
    log.success(
      `Your dashboard is ready at: ${chalk.yellow(`http://localhost:${port}`)}`,
    );
  });
};

export default startServer;
