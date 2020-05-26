import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Panel } from "react95";
import dappsys from "@studydefi/money-legos/dappsys";

import { ModalContainer, ModalHeader, ModalContent } from "../common/Modal";
import ProxyAddress from "../../containers/ProxyAddress";
import { ethers } from "ethers";
import Input from "../common/Input";
import Signers from "../../containers/Signers";
import OutputLog from "../../containers/OutputLog";

const DataPanel = styled(Panel)`
  padding: 1rem;
  width: 100%;
  height: 160px;
  font-size: 14px;
  font-family: monospace;
  overflow-wrap: anywhere;
  overflow-y: auto;
`;

const FooterPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
  margin-bottom: 1rem;
`;

const ProxyCallModal = ({ closeModal, args, types, inputs }) => {
  const { signer } = Signers.useContainer();
  const { proxyAddress } = ProxyAddress.useContainer();
  const { addLogItem } = OutputLog.useContainer();
  const [encoded, setEncoded] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (inputs.length > 0) {
      try {
        const processedArgs = args.map((arg, idx) => {
          const type = types[idx];
          return type.slice(-2) === "[]" ? JSON.parse(arg) : arg;
        });
        const callData = ethers.utils.defaultAbiCoder.encode(
          types,
          processedArgs,
        );
        setEncoded(callData);
      } catch (error) {
        console.error(error);
        setEncoded(error.message);
        setHasError(true);
      }
    } else {
      setEncoded("No inputs");
    }
  }, [args, types, inputs]);

  const callFunction = async () => {
    const instance = new ethers.Contract(
      proxyAddress,
      dappsys.dsProxy.abi,
      signer,
    );

    const tx = await instance.execute(targetAddress, encoded);
    addLogItem(`tx.hash: ${tx.hash}`);
    await tx.wait();
    addLogItem(`tx mined: ${tx.hash}`);
  };

  const handleSubmit = async () => {
    try {
      await callFunction();
    } catch (error) {
      console.error(error);
      addLogItem(`Error: ${error.message}`);
    }
  };

  return (
    <ModalContainer>
      <ModalHeader onCloseClick={closeModal} label="Submit via Proxy" />
      <ModalContent>
        <div style={{ marginTop: "1rem" }}>Inputs:</div>
        <DataPanel variant="well">
          {types.map((type, idx) => {
            const arg = args[idx];
            const label = inputs[idx].name;
            return (
              <div key={label}>
                <div>
                  <strong>{label}</strong> (<i>{type}</i>)
                </div>
                <div>{arg}</div>
                <br />
              </div>
            );
          })}
        </DataPanel>
        <div style={{ marginTop: "1rem" }}>Encoded:</div>
        <DataPanel variant="well">{encoded}</DataPanel>
        <div style={{ marginTop: "1rem" }}>Target address:</div>
        <Input
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
        />
        <div style={{ marginTop: "1rem" }}>Proxy address:</div>
        <FooterPanel variant="well">
          {proxyAddress || "No proxy specified, cannot execute transaction"}
        </FooterPanel>
        <Button
          disabled={!proxyAddress || !targetAddress || hasError}
          onClick={handleSubmit}
        >
          Submit via Proxy
        </Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProxyCallModal;
