import { createContainer } from "unstated-next";
import { useState } from "react";

export function useProxyAddress() {
  const [proxyAddress, setProxyAddress] = useState<string>("");

  const isValid = proxyAddress.length === 42;

  return {
    proxyAddress: isValid ? proxyAddress : null,
    setProxyAddress,
    isValid,
  };
}

export default createContainer(useProxyAddress);
