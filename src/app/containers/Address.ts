import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Signers from "./Signers";

export function useAddress() {
  const { customSigner, internalSigner } = Signers.useContainer();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const signer = customSigner || internalSigner;
    if (signer === null) {
      return setAddress(null);
    }

    signer.getAddress().then((address) => setAddress(address));
  }, [internalSigner, customSigner]);

  return {
    address,
  };
}

export default createContainer(useAddress);
