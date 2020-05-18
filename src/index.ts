#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import path from "path";
import commander from "commander";
import express from "express";

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

  app.listen(3000, function () {
    console.log("Server listening on port 3000.");
  });
};

main();
