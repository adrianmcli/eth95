import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Contracts from "./Contracts";
import Network from "./Network";

export function useContractAddress() {
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [addressFromArtifact, setAddressFromArtifact] = useState<string | null>(
    null,
  );

  const { selectedContract } = Contracts.useContainer();
  const { network } = Network.useContainer();

  useEffect(() => {
    if (
      network &&
      selectedContract?.artifact?.networks &&
      selectedContract.artifact.networks[network.chainId]
    ) {
      const { networks } = selectedContract.artifact;
      const { address } = networks[network.chainId];
      setAddressFromArtifact(address);
    } else {
      setAddressFromArtifact(null);
    }
  }, [selectedContract, selectedContract?.artifact, network]);

  return {
    addressFromArtifact,
    customAddress,
    setCustomAddress,
  };
}

export default createContainer(useContractAddress);
