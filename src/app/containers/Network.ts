import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Connection from "./Connection";

export function useNetwork() {
  const { provider } = Connection.useContainer();
  const [network, setNetwork] = useState(null);

  const updateNetwork = async () => {
    if (provider === null) {
      return setNetwork(null);
    }

    const network = await provider.getNetwork();
    setNetwork(network);
  };

  useEffect(() => {
    updateNetwork();
  }, [provider]);

  return {
    network,
  };
}

export default createContainer(useNetwork);
