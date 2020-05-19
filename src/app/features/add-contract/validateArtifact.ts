const validateArtifact = (rawArtifact) => {
  let artifact: any;
  try {
    artifact = JSON.parse(rawArtifact);
  } catch (error) {
    return false;
  }

  if (artifact.abi && artifact.contractName) {
    return true;
  }
  return false;
};

export default validateArtifact;
