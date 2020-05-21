import { createContainer } from "unstated-next";
import { useState } from "react";

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
    setContracts((prevContracts) => {
      const newContracts = [...prevContracts, contract];
      return newContracts.sort((a, b) => a.name.localeCompare(b.name));
    });

  const removeContractByIdx = (idx: number) => {
    setSelectedIdx(null);
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

  const updateByPath = (artifact: any, path: string) => {
    console.log(path)
    setContracts((prevContracts) => {
      const alreadyExist =
        prevContracts.filter((c) => c.path === path).length > 0;

      if (!alreadyExist) {
        addByArtifact(artifact, artifact.contractName, path);
        return prevContracts;
      }

      return prevContracts.map((c) => {
        if (c.path === path) {
          (c.abi = artifact.abi), (c.artifact = artifact);
        }
        return c;
      });
    });
  };

  const removeByPath = (path: string) => {
    setContracts((prevContracts) =>
      prevContracts.filter((c) => c.path !== path),
    );
  };

  return {
    contracts,
    addContract,
    removeContractByIdx,
    addByAbi,
    addByArtifact,
    updateByPath,
    removeByPath,
    selectedIdx,
    selectedContract,
    setSelectedIdx,
  };
}

export default createContainer(useContracts);
