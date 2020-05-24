import React, { useState } from "react";
import styled from "styled-components";
import { Fieldset, Panel } from "react95";
import Input from "../common/Input";
import Network from "../../containers/Network";
import ContractAddress from "../../containers/ContractAddress";

const containerWidth = 450
const Container = styled(Fieldset)`
  display: flex;
  height: 100%;
  width: ${containerWidth}px;
  min-width: ${containerWidth}px;
`;

const AddressPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
`;

const AddressInfo = ({ contract }) => {
  const [inputText, setInputText] = useState("");
  const { network } = Network.useContainer();
  const { addressFromArtifact } = ContractAddress.useContainer();
  console.log(addressFromArtifact);

  return (
    <Container label="Contract address">
      <Input
        placeholder="Paste the deployed address here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div style={{ marginTop: `1rem` }}>
        <div>
          From artifact @ network {network?.name}{" "}
          {network && `(${network?.chainId})`}:
        </div>
        <AddressPanel variant="well">
          {addressFromArtifact || "No address found in artifact"}
        </AddressPanel>
      </div>
    </Container>
  );
};

export default AddressInfo;
