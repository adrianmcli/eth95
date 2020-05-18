#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

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

program
  .version("0.0.1")
  .description("A GUI for controlling your Ethereum dapp")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
