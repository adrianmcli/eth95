import React, { useState } from "react";
import styled from "styled-components";
import { Select, Fieldset, Button, TextField } from "react95";
import Connection, { options, Method } from "../../containers/Connection";

const ConnectionSelector = styled(Select)`
  font-size: 14px;

  &:before {
    width: 100%;
    height: 100%;
    z-index: unset;
  }
  & > div > div {
    z-index: unset;
  }
`;

const Input = styled(TextField)`
  &:before {
    width: 100%;
    height: 100%;
    z-index: unset;
  }
  & > input {
    font-size: 14px;
  }
`;

const ConnectOptions = () => {
  const {
    connection,
    setConnection,
    customSigner,
    setCustomSigner,
    provider,
    signer,
    connectMetaMask,
    connectCustom,
    reset,
  } = Connection.useContainer();

  const [nodeUrl, setNodeUrl] = useState("");

  const onChange = (e) => {
    setConnection(e.target.value);
  };

  return (
    <>
      <Fieldset label="Connection">
        <ConnectionSelector
          native
          value={connection}
          options={options}
          onChange={onChange}
          width="100%"
        />
        <br />
        <br />
        <div>
          Provider:
          <span
            style={{ textAlign: "left", color: provider ? "green" : "red" }}
          >
            {provider ? " Connected" : " Not Connected"}
          </span>
        </div>
        <div>
          Signer:
          <span style={{ textAlign: "left", color: signer ? "green" : "red" }}>
            {signer ? " Connected" : " Not Connected"}
          </span>
        </div>

        {connection === Method.MetaMask && (
          <>
            {!provider && (
              <>
                <br />
                <Button fullWidth onClick={connectMetaMask}>
                  Connect
                </Button>
              </>
            )}
          </>
        )}

        {connection === Method.Custom && (
          <>
            <br />
            <p>Node URL:</p>
            <Input
              value={nodeUrl}
              onChange={(e) => setNodeUrl(e.target.value)}
              placeholder="https://mainnet.infura.io/v3/API_KEY"
            />
            <br />

            <Button fullWidth onClick={() => connectCustom(nodeUrl)}>
              Connect
            </Button>

            <br />
            <Button
              fullWidth
              onClick={() => {
                reset();
                setNodeUrl("");
              }}
            >
              Reset
            </Button>
          </>
        )}
      </Fieldset>
      <br />
      <Fieldset label="Custom Signer (optional)">
        <p>Private Key / Mnemonic:</p>
        <Input
          style={{ fontSize: `12px` }}
          value={customSigner}
          placeholder="turkey snow danger yearly kale..."
          onChange={(e) => setCustomSigner(e.target.value)}
        />
      </Fieldset>
    </>
  );
};

export default ConnectOptions;
