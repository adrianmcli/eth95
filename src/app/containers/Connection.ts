import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

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
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [customSigner, setCustomSigner] = useState("");

  const reset = () => {
    setProvider(null);
    setSigner(null);
  };

  const testAndSetProvider = async (provider) => {
    try {
      await provider.getNetwork();
      setProvider(provider);
    } catch (error) {
      console.error(error);
      setProvider(null);
    }
  };

  const testAndSetSigner = async (signer) => {
    try {
      await signer.getAddress();
      setSigner(signer);
    } catch (error) {
      console.error(error);
      setSigner(null);
    }
  };

  const connectLocalhost = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      testAndSetProvider(provider);
      const signer = provider.getSigner();
      testAndSetSigner(signer);
    } catch (error) {
      console.error(error);
    }
  };

  const connectMetaMask = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      testAndSetProvider(provider);
      const signer = provider.getSigner();
      testAndSetSigner(signer);
    } catch (error) {
      console.error(error);
    }
  };

  const connectCustom = async (nodeUrl: string) => {
    if (nodeUrl.trim() === "") return;
    try {
      const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
      testAndSetProvider(provider);
      const signer = provider.getSigner();
      testAndSetSigner(signer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
    if (connection === Method.Localhost) {
      connectLocalhost();
    }
  }, [connection]);

  return {
    connection,
    setConnection,
    provider,
    signer,
    connectMetaMask,
    customSigner,
    setCustomSigner,
    connectCustom,
    reset,
  };
}

export default createContainer(useConnection);
