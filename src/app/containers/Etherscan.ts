import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export enum Network {
  Mainnet = "Mainnet",
  Rinkeby = "Rinkeby",
  Ropsten = "Ropsten",
  Kovan = "Kovan",
  Goerli = "Goerli",
}

export const networkOptions = [
  { value: Network.Mainnet, label: Network.Mainnet },
  { value: Network.Rinkeby, label: Network.Rinkeby },
  { value: Network.Ropsten, label: Network.Ropsten },
  { value: Network.Kovan, label: Network.Kovan },
  { value: Network.Goerli, label: Network.Goerli },
];

export function getChainId(network: Network): number {
  if (network === Network.Mainnet) {
    return 1;
  }

  if (network === Network.Ropsten) {
    return 3;
  }

  if (network === Network.Rinkeby) {
    return 4;
  }

  if (network === Network.Goerli) {
    return 5;
  }

  if (network === Network.Kovan) {
    return 42;
  }

  // Localhost
  return 1337;
}

function getSourceCodeEnpoint(network: Network, address: string): string {
  // Ethers JS default API key
  const apiKey = "8FG3JMZ9USS4NTA6YKEKHINU56SEPPVBJR";

  const fqdn =
    network === Network.Mainnet ? "api" : `api-${network.toLowerCase()}`;

  return `https://${fqdn}.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;
}

export function useEtherscanABI() {
  const [network, setNetwork] = useState<Network>(Network.Mainnet);
  const [address, setAddress] = useState<string>("");
  const [abi, setABI] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [retrievingABI, setRetrievingABI] = useState<boolean>(false);
  const [successRetrieveABI, setSuccessRetrieveABI] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      if (address.length !== 42) {
        setSuccessRetrieveABI(false);
        setRetrievingABI(false);
        return;
      }

      setRetrievingABI(true);

      try {
        const resp = await fetch(getSourceCodeEnpoint(network, address));
        const data = await resp.json();
        const respResult = data.result[0];
        const respABI = JSON.parse(respResult.ABI);

        setABI(respABI);

        // Only override name if not null
        if (name === "") {
          const respName = respResult.ContractName;
          setName(respName);
        }

        setSuccessRetrieveABI(true);
      } catch (e) {
        console.log("error", e);
        setSuccessRetrieveABI(false);
      }

      setRetrievingABI(false);
    };

    f();
  }, [address]);

  return {
    name,
    setName,
    address,
    setAddress,
    network,
    setNetwork,
    abi,
    retrievingABI,
    successRetrieveABI,
  };
}

export default createContainer(useEtherscanABI);
