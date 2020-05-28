const useFormData = (fn, formState) => {
  if (!fn) {
    return { args: [], types: [] };
  }

  // grab args, and types
  const inputs = fn.inputs || [];
  const args = inputs.map((_, idx) => formState[idx]);
  const types = inputs.map((x) => x.type);

  return { args, types };
};

export default useFormData;
