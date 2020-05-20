import path from "path";
import fs from "fs";

const getArtifactPaths = (artifactPath: string): string[] => {
  const artifactDir = path.resolve(artifactPath);
  console.log("\nWatching artifacts in:", artifactDir);

  const files = fs.readdirSync(artifactDir);
  const jsonFiles = files.filter(
    (filename) => filename.split(".").pop()?.toLowerCase() === "json",
  );

  const jsonPaths = jsonFiles.map((filename) =>
    path.join(artifactDir, filename),
  );

  return jsonPaths;
};

export default getArtifactPaths;
