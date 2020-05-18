#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import path from "path";
import commander from "commander";
import express from "express";
import http from "http";
import WebSocket from "ws";

clear();
console.log(
  chalk.red(
    figlet.textSync("EthPilot", {
      font: "ANSI Shadow",
      // font: "Banner3-D",
      // font: "Speed"
    }),
  ),
);

commander
  .version("0.0.1")
  .description("A GUI for controlling your Ethereum dapp")
  .parse(process.argv);

// if (!process.argv.slice(2).length) {
//   program.outputHelp();
// }

const main = async () => {
  const Bundler = require("parcel-bundler");

  const parcelOptions = {
    entryFiles: [path.join(__dirname, "./app/index.html")],
    logLevel: 1,
  };
  const app: express.Application = express();

  app.use("/api", function (req, res, next) {
    console.log("wooooo weeeeeee");
    res.json({ ping: "pong" });
  });

  const bundler = new Bundler(parcelOptions.entryFiles, parcelOptions);
  app.use("/", bundler.middleware());

  const port = 3000;

  // Do Websocket stuff
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

main();
