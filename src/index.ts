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

const COLOR_BG = "#037F7F";
const COLOR_FG = "#b8b8b8";

clear();
console.log("");
console.log(chalk.red(figlet.textSync("Eth95", { font: "ANSI Shadow" })));

commander
  .version(require("../package.json").version)
  .name("eth95")
  .description("A GUI for controlling your Ethereum dapp")
  .usage("[path-to-artifacts] [options]")
  .option("-p, --port <number>", "specify port to host the frontend")
  .option("-b, --buidler", "watches the default Buidler artifact folder")
  .option("-t, --truffle", "watches the default Truffle artifact folder")
  .parse(process.argv);

// print out help text
commander.outputHelp();

const main = async () => {
  let paths;
  // TODO - make sure the artifact path actually exists
  const artifactPath = commander.args[0]
  if (artifactPath) {
    paths = getArtifactPaths(artifactPath);
    console.log(`\nNo. of JSON files found: ${paths.length}`);
  }

  await startServer({
    port: commander.port || 3000,
    paths,
  });
};

main();
