import { createContainer } from "unstated-next";
import { useState } from "react";

export interface Contract {
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

  const shiftUp = () => {
    setSelectedIdx((prev) => (prev === null || prev === 0 ? prev : prev - 1));
  };

  const shiftDown = () => {
    setSelectedIdx((prev) =>
      prev === null || prev === contracts.length - 1 ? prev : prev + 1
    );
  };

  const addContract = (contract: Contract) => {
    var newContracts;
    setContracts((prevContracts) => {
      newContracts = [...prevContracts, contract].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return newContracts;
    });
    localStorage.setItem("contracts", JSON.stringify(newContracts));
  };

  const overwriteContract = (contracts: Contract[]) => {
    var newContracts;
    setContracts(() => {
      newContracts = [...contracts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return newContracts;
    });
  };
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

  const upsertByPath = (artifact: any, name: string, path: string) => {
    setContracts((prevContracts) => {
      const alreadyExist =
        prevContracts.filter((c) => c.path === path).length > 0;

      // if contract does not exist, just add it
      if (!alreadyExist) {
        const newContracts = [
          ...prevContracts,
          {
            name,
            abi: artifact.abi,
            artifact,
            path,
          },
        ];
        return newContracts.sort((a, b) => a.name.localeCompare(b.name));
      }

      // otherwise, update existing contract
      return prevContracts.map((c) => {
        if (c.path === path) {
          c.abi = artifact.abi;
          c.artifact = artifact;
          c.name = name;
        }
        return c;
      });
    });
  };

  const removeByPath = (path: string) => {
    setContracts((prevContracts) =>
      prevContracts.filter((c) => c.path !== path)
    );
  };

  return {
    contracts,
    addContract,
    removeContractByIdx,
    addByAbi,
    addByArtifact,
    overwriteContract,
    upsertByPath,
    removeByPath,
    selectedIdx,
    selectedContract,
    setSelectedIdx,
    shiftUp,
    shiftDown,
  };
}

export default createContainer(useContracts);
