import { createContainer } from "unstated-next";
import { useState, useEffect, useReducer } from "react";

interface Contract {
  abi: any[];
  name: string;
  artifact?: any;
  address?: string;
  path?: string;
}

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedContract = selectedIdx === null ? null : contracts[selectedIdx];

  const addContract = (contract: Contract) =>
    setContracts((prevContracts) => [...prevContracts, contract]);

  const removeContract = (idx: number) => {
    setContracts((prevContracts) => prevContracts.filter((x, i) => idx !== i));
  };

  const addByAbi = (abi: any[], name: string) => {
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

  return {
    contracts,
    addContract,
    removeContract,
    addByAbi,
    addByArtifact,
    selectedIdx,
    selectedContract,
    setSelectedIdx,
  };
}

export default createContainer(useContracts);
