import React, { useState } from "react";
import styled from "styled-components";
import { TabBody, Panel } from "react95";
import Input from "../common/Input";
import ContractAddress from "../../containers/ContractAddress";
import ProxyAddress from "../../containers/ProxyAddress";

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
`;

const Proxy = ({ show }) => {
  const {
    proxyAddress,
    setProxyAddress,
    isValid,
  } = ProxyAddress.useContainer();
  const [inputText, setInputText] = useState("");

  return (
    <Container
      label="Contract address"
      style={{ display: show ? "flex" : "none" }}
    >
      <div>Custom:</div>
      <Input
        placeholder="Paste proxy address here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setProxyAddress(e.target.value);
        }}
      />

      <div style={{ marginTop: `1rem` }}>
        <div>
          <strong>Proxy address:</strong>
        </div>
        <AddressPanel variant="well">
          {proxyAddress ||
            "No proxy address, function call will fail"}
        </AddressPanel>
      </div>
    </Container>
  );
};

export default Proxy;
