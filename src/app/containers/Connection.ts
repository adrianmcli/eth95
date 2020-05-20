import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Provider, JsonRpcProvider, Web3Provider } from "ethers/providers";

export enum Method {
  Localhost = "Localhost",
  MetaMask = "MetaMask",
  Custom = "Custom",
}

export const options = [
  { value: Method.Localhost, label: "💻 localhost:8545" },
  { value: Method.MetaMask, label: "🦊 MetaMask" },
  { value: Method.Custom, label: "🔧 Custom" },
];

export function useConnection() {
  const [connection, setConnection] = useState(Method.Localhost);
  const [provider, setProvider] = useState<
    JsonRpcProvider | Web3Provider | null
  >(null);

  const testAndSetProvider = async (
    provider: JsonRpcProvider | Web3Provider,
  ) => {
    try {
      await provider.getNetwork();
      setProvider(provider);
    } catch (error) {
      console.error(error);
      setProvider(null);
    }
  };

  const connectLocalhost = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      testAndSetProvider(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const connectMetaMask = async () => {
    try {
      window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      testAndSetProvider(provider);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to MetaMask, are you sure it has been installed?");
    }
  };

  const connectCustom = async (nodeUrl: string) => {
    if (nodeUrl.trim() === "") return;
    try {
      const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
      testAndSetProvider(provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProvider(null);
    if (connection === Method.Localhost) {
      connectLocalhost();
    }
  }, [connection]);

  // re-register MetaMask provider whenever network changes
  useEffect(() => {
    window.ethereum?.on("chainIdChanged", () => {
      connectMetaMask();
    });
  }, [provider]);

  return {
    connection,
    setConnection,
    provider,
    setProvider,
    connectMetaMask,
    connectCustom,
  };
}

export default createContainer(useConnection);
