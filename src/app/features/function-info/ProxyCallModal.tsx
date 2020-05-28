import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Panel } from "react95";

import { ModalContainer, ModalHeader, ModalContent } from "../common/Modal";
import { ethers } from "ethers";

const DataPanel = styled(Panel)`
  padding: 1rem;
  width: 100%;
  height: 160px;
  font-size: 14px;
  font-family: monospace;
  overflow-wrap: anywhere;
  overflow-y: auto;
`;

const ProxyCallModal = ({ closeModal, args, types, inputs, opts }) => {
  const [encoded, setEncoded] = useState("");
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
      </ModalContent>
    </ModalContainer>
  );
};

export default ProxyCallModal;
