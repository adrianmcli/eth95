import path from "path";
import fs from "fs";

export const getJsonFilePaths = (artifactPath: string): string[] => {
  const files = fs.readdirSync(artifactPath);
  const jsonFiles = files.filter(
    (filename) => filename.split(".").pop()?.toLowerCase() === "json",
  );
  const jsonPaths = jsonFiles.map((filename) =>
    path.join(artifactPath, filename),
  );
  return jsonPaths;
};
