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
  const [internalSigner, setInternalSigner] = useState(null);
  const [customSigner, setCustomSigner] = useState("");
  const [network, setNetwork] = useState(null);

  const updateNetwork = async () => {
    if (provider) {
      const network = await provider.getNetwork();
      setNetwork(network);
    }
  };

  const attemptSetCustomSigner = (customSignerString) => {
    let mySigner;
    try {
      if (customSignerString.trim() !== "") {
        if (customSignerString.substring(0, 2) === "0x") {
          // private key
          mySigner = new ethers.Wallet(customSignerString.trim(), provider);
        } else {
          // mnemonic
          mySigner = ethers.Wallet.fromMnemonic(customSignerString.trim());
        }
        setCustomSigner(mySigner);
      }
    } catch (error) {
      console.error(error);
      alert("Improper mnemonic or private key.");
    }
  };

  const reset = () => {
    setProvider(null);
    setInternalSigner(null);
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
      setInternalSigner(signer);
    } catch (error) {
      console.error(error);
      setInternalSigner(null);
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
      // https://github.com/MetaMask/metamask-extension/issues/8226
      window.ethereum.on("chainIdChanged", (chainId) => {
        console.log("CHAIN CHANGED")
        updateNetwork();
      });
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

  useEffect(() => {
    updateNetwork();
  }, [provider]);

  return {
    connection,
    setConnection,
    provider,
    signer: customSigner || internalSigner,
    connectMetaMask,
    connectCustom,
    customSigner,
    resetCustomSigner: () => setCustomSigner(null),
    reset,
    attemptSetCustomSigner,
    network,
    internalSigner
  };
}

export default createContainer(useConnection);
