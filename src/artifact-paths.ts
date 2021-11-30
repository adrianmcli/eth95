import path from "path";
import fs from "fs";

export const getJsonFilePaths = (artifactPath: string): string[] => {
  let result: string[] = []
  const files = fs.readdirSync(artifactPath)
  files.forEach(file => {
    const childPath = path.join(artifactPath, file)
    if (fs.statSync(childPath).isDirectory()) {
      result.push(...getJsonFilePaths(childPath))
    } else if (path.extname(childPath) === ".json") {
      result.push(childPath)
    }
  })
  return result.sort()
};
