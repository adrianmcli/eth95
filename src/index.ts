#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import commander from "commander";
import startServer from "./server";

clear();
console.log(chalk.red(figlet.textSync("EthPilot", { font: "ANSI Shadow" })));

commander
  .version(require("../package.json").version)
  .description("A GUI for controlling your Ethereum dapp")
  .option("-p, --port <number>", "specify port to host the frontend")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
  console.log("");
}

startServer({
  port: commander.port || 3000,
});
