const validateAbi = (rawAbi) => {
  let abi: any;
  try {
    abi = JSON.parse(rawAbi);
  } catch (error) {
    return false;
  }

  if (Array.isArray(abi) && abi.length > 0 && abi.every((x) => x.type)) {
    return true;
  }
  return false;
};

export default validateAbi;
