import { useEffect } from "react";
import queryString from "query-string";

import Contracts from "../../containers/Contracts";
import Etherscan, { Network, getNetworkName } from "../../containers/Etherscan";

const useQueryStringContract = () => {
  const { addContract } = Contracts.useContainer();
  const {
    setAddress,
    successRetrieveABI,
    getChainId,
    setNetwork,
    network,
    name,
    address,
    abi,
  } = Etherscan.useContainer();
  // get query string
  const queryObj = queryString.parse(window.location.search);
  useEffect(() => {
    if (queryObj.address) {
      if (queryObj.network) {
        const network = getNetworkName(parseInt(queryObj.network) as number);
        setNetwork(network || Network.Mainnet);
      }
      setAddress(queryObj.address as string);
    }
  }, []);

  useEffect(() => {
    if (address && abi && name && successRetrieveABI) {
      addContract({
        name,
        abi,
        artifact: {
          networks: {
            [getChainId(network)]: { address },
          },
        },
      });
    }
  }, [abi, name, address, successRetrieveABI, network]);
  return {};
};

export default useQueryStringContract;
