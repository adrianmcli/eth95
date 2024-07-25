import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export enum Network {
  Mainnet = "Mainnet",
  Rinkeby = "Rinkeby",
  Ropsten = "Ropsten",
  Kovan = "Kovan",
  Goerli = "Goerli",
  Sepolia = "Sepolia",
}

export const networkOptions = [
  { value: Network.Mainnet, label: Network.Mainnet },
  { value: Network.Rinkeby, label: Network.Rinkeby },
  { value: Network.Ropsten, label: Network.Ropsten },
  { value: Network.Kovan, label: Network.Kovan },
  { value: Network.Goerli, label: Network.Goerli },
  { value: Network.Sepolia, label: Network.Sepolia },
];

const networkIdToName = {
  1: Network.Mainnet,
  3: Network.Ropsten,
  4: Network.Rinkeby,
  5: Network.Goerli,
  42: Network.Kovan,
  11155111: Network.Sepolia,
};

const networkNameToId = {
  [Network.Mainnet]: 1,
  [Network.Ropsten]: 3,
  [Network.Rinkeby]: 4,
  [Network.Goerli]: 5,
  [Network.Kovan]: 42,
  [Network.Sepolia]: 11155111,
};

export function getChainId(network: Network): number {
  return networkNameToId[network] || 1337;
}

export function getNetworkName(chainId: number): Network {
  return networkIdToName[chainId];
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

  const clear = () => {
    setNetwork(Network.Mainnet);
    setAddress("");
    setABI("");
    setName("");
    setRetrievingABI(false);
    setSuccessRetrieveABI(false);
  };

  const getAndSetABI = async () => {
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

  useEffect(() => {
    getAndSetABI();
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
    getAndSetABI,
    getChainId,
    clear,
  };
}

export default createContainer(useEtherscanABI);
