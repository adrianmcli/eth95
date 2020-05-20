import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Connection from "./Connection";

export function useConnection() {
  const { customSigner, internalSigner } = Connection.useContainer();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const mySigner = customSigner || internalSigner;
    if (mySigner) {
      mySigner.getAddress().then((address) => setAddress(address));
    }
  }, [internalSigner, customSigner]);

  return {
    address,
  };
}

export default createContainer(useConnection);
