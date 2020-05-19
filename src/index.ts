#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import commander from "commander";
import getArtifactPaths from "./artifact-paths";
import startServer from "./server";

// determine if we are in development mode
// @ts-ignore
if (process[Symbol.for("ts-node.register.instance")]) {
  process.env.ETHPILOT_DEV = "true";
}

clear();
console.log("");
console.log(chalk.red(figlet.textSync("EthPilot", { font: "ANSI Shadow" })));

commander
  .version(require("../package.json").version)
  .description("A GUI for controlling your Ethereum dapp")
  .option("-p, --port <number>", "specify port to host the frontend")
  .option(
    "-a, --artifactPath <path>",
    "specify path to directory with artifacts",
  )
  .parse(process.argv);

// print out help text
commander.outputHelp();
console.log("");

const main = async () => {
  let paths;
  if (commander.artifactPath) {
    paths = getArtifactPaths(commander.artifactPath);
    console.log(`No. of JSON files found: ${paths.length}\n`);
  }

  await startServer({
    port: commander.port || 3000,
    paths,
  });
};

main();
