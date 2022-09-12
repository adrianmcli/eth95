#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";

import log from "./logger";
import startServer from "./server";

// determine if we are in development mode
// https://github.com/TypeStrong/ts-node/issues/846#issuecomment-631828160
// @ts-ignore
if (process[Symbol.for("ts-node.register.instance")]) {
  process.env.ETH95_DEV = "true";
}

clear();
console.log("");
console.log(chalk.red(figlet.textSync("Eth95", { font: "ANSI Shadow" })));

program
  .version(require("../package.json").version)
  .name("eth95")
  .description("A GUI for controlling Ethereum dapps")
  .usage("[path-to-artifacts-dir] [options]")
  .option("-b, --buidler", "watches the default Buidler artifact directory")
  .option("-t, --truffle", "watches the default Truffle artifact directory")
  .option("-p, --port <number>", "specify port to host the frontend")
  .parse(process.argv);

program.outputHelp();
const options = program.opts();
console.log("");

// determine what path (if any) to try
let targetPath;
if (program.args[0]) {
  targetPath = program.args[0];
} else if (options.truffle) {
  targetPath = "./build/contracts";
} else if (options.buidler) {
  targetPath = "./artifacts";
}

if (targetPath) {
  const artifactPath = path.resolve(targetPath);
  const validPath =
    fs.existsSync(artifactPath) && fs.lstatSync(artifactPath).isDirectory();

  if (!validPath) {
    log.error(`Invalid directory: ${chalk.white(artifactPath)}\n`);
    process.exit(1);
  }

  log.info(`Artifact directory: ${chalk.yellow(artifactPath)}`);
  startServer({
    port: options.port || 3000,
    artifactPath,
  });
} else {
  startServer({
    port: options.port || 3000,
  });
}
