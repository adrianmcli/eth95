#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import commander from "commander";
import startServer from "./server";

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

startServer();
