import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import Connection from "./Connection";

const useSigners = () => {
  const { provider } = Connection.useContainer();
  const [internalSigner, setInternalSigner] = useState<Signer | null>(null);
  const [customSigner, setCustomSigner] = useState<Signer | null>(null);

  const attemptSetCustomSigner = (customSignerString: string) => {
    let mySigner;
    try {
      if (customSignerString.trim() !== "") {
        if (customSignerString.substring(0, 2) === "0x") {
          // private key
          mySigner = new ethers.Wallet(customSignerString.trim());
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

  const testAndSetSigner = async (signer: Signer) => {
    try {
      await signer.getAddress();
      setInternalSigner(signer);
    } catch (error) {
      console.error(error);
      setInternalSigner(null);
    }
  };

  useEffect(() => {
    setInternalSigner(null);
    if (provider) {
      const signer = provider.getSigner();
      testAndSetSigner(signer);
    }
  }, [provider]);

  return {
    internalSigner,
    setInternalSigner,
    customSigner,
    setCustomSigner,
    attemptSetCustomSigner,
    testAndSetSigner,
    signer: customSigner || internalSigner,
  };
};

export default createContainer(useSigners);
