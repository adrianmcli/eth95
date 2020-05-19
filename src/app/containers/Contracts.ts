import { createContainer } from "unstated-next";
import { useState, useEffect, useReducer } from "react";

interface Contract {
  abi: any;
  name: string;
  artifact?: any;
  address?: string;
  path?: string;
}

function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const addContract = (contract: Contract) =>
    setContracts((prevState) => [...prevState, contract]);
  const removeContract = (idx) => {
    const newContracts = contracts.filter((x, i) => idx !== i);
    setContracts(newContracts);
  };

  const renameContract = (name, idx) => {
    contracts.map((c, i) => {
      if (i === idx) {
        c.name = name;
      }
      return c;
    });
  };

  const addByAbi = (abi, name) => {
    addContract({
      name,
      abi,
    });
  };

  const addByArtifact = (artifact: any, name: string, path?: string) => {
    addContract({
      name,
      abi: artifact.abi,
      artifact,
      path,
    });
  };

  return { contracts, addContract, removeContract, addByAbi, addByArtifact };
}

export default createContainer(useContracts);
