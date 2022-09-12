import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Connection from "./Connection";
import { Network } from "@ethersproject/networks";

export function useNetwork() {
  const { provider } = Connection.useContainer();
  const [network, setNetwork] = useState<Network | null>(null);

  const updateNetwork = async () => {
    if (provider === null) {
      return setNetwork(null);
    }

    const network = await provider.getNetwork();
    setNetwork(network);
  };

  // update the network whenever the provider changes
  useEffect(() => {
    updateNetwork();
  }, [provider]);

  return {
    network,
  };
}

export default createContainer(useNetwork);
