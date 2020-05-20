const validateRawArtifact = (rawArtifact: any) => {
  let artifact: any;
  try {
    artifact = JSON.parse(rawArtifact);
  } catch (error) {
    return false;
  }

  const hasFunctions = (abi: any[]) =>
    abi.filter((x) => x.type === "function").length > 0;

  if (artifact.contractName && artifact.abi && hasFunctions(artifact.abi)) {
    return true;
  }
  return false;
};

export default validateRawArtifact;
