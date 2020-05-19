#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import commander from "commander";
import detectProject from "./detect-project";
import startServer from "./server";

// determine if we are in development mode
// @ts-ignore
if (process[Symbol.for("ts-node.register.instance")]) {
  process.env.ETHPILOT_DEV = "true";
}

clear();
console.log(chalk.red(figlet.textSync("EthPilot", { font: "ANSI Shadow" })));

commander
  .version(require("../package.json").version)
  .description("A GUI for controlling your Ethereum dapp")
  .option("-p, --port <number>", "specify port to host the frontend")
  .option("-a, --artifactPath <path>", "specify path to directory with artifacts")
  .parse(process.argv);

// print out help text
if (!process.argv.slice(2).length) {
  commander.outputHelp();
  console.log("");
}

const main = async () => {
  const paths = await detectProject();

  console.log(paths);

  await startServer({
    port: commander.port || 3000,
  });
};

main();
