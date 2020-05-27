import React, { useState } from "react";
import styled from "styled-components";
import { TabBody, Panel, Divider } from "react95";
import Input from "../common/Input";
import Network from "../../containers/Network";
import ContractAddress from "../../containers/ContractAddress";

const Container = styled(TabBody)`
  display: flex;
  flex-direction: column;
`;

const AddressPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
  // margin-top: 1rem;
`;

const AddressInfo = ({ show }) => {
  const [inputText, setInputText] = useState("");
  const { network } = Network.useContainer();
  const {
    addressFromArtifact,
    setCustomAddress,
    address,
  } = ContractAddress.useContainer();

  return (
    <Container
      style={{ display: show ? "flex" : "none" }}
    >
      <div>Custom:</div>
      <Input
        placeholder="Paste the deployed contract address here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setCustomAddress(e.target.value);
        }}
      />

      <div>
        <div style={{ marginTop: `1rem` }}>
          From artifact @ network {network?.name}{" "}
          {network && `(${network?.chainId})`}:
        </div>
        <AddressPanel variant="well">
          {addressFromArtifact || "No address found in artifact"}
        </AddressPanel>
        <Divider style={{ marginTop: `1rem` }} />
        <div style={{ marginTop: `1rem` }}>
          <strong>Selected contract address:</strong>
        </div>
        <AddressPanel variant="well">
          {address || "No valid address, function call will fail"}
        </AddressPanel>
      </div>
    </Container>
  );
};

export default AddressInfo;
