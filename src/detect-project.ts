import path from "path";
import fs from "fs";

const detectProject = async () => {
  let paths: string[] = [];

  const truffleConfig = path.join(process.cwd(), "truffle-config.js");
  const buidlerConfig = path.join(process.cwd(), "buidler.config.js");

  // If the current folder is a Truffle project
  if (fs.existsSync(truffleConfig)) {
    console.log("Truffle project detected...");

    // determine artifact directory
    const defaultArtifactDir = path.join(process.cwd(), "./build/contracts");
    const config = require(truffleConfig);
    const artifactDir = path.resolve(
      config.contracts_build_directory || defaultArtifactDir,
    );
    console.log("Artifact directory detected:", artifactDir);

    const files = fs.readdirSync(artifactDir);
    const jsonFiles = files.filter(
      (filename) => filename.split(".").pop()?.toLowerCase() === "json",
    );
    paths.concat(jsonFiles);
  }

  // If the current folder is a Buidler project
  if (fs.existsSync(buidlerConfig)) {
    console.log("Buidler project detected...");

    // determine artifact directory
    const defaultArtifactDir = path.join(process.cwd(), "./artifacts");
    const config = require(buidlerConfig);
    const artifactDir = path.resolve(
      config.paths.artifacts || defaultArtifactDir,
    );
    console.log("Artifact directory detected:", artifactDir);

    const files = fs.readdirSync(artifactDir);
    const jsonFiles = files.filter(
      (filename) => filename.split(".").pop()?.toLowerCase() === "json",
    );
    paths.concat(jsonFiles);
  }

  return paths;
};

export default detectProject;
