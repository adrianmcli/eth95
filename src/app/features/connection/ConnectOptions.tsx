import React, { useState } from "react";
import styled from "styled-components";
import { Select, Fieldset, Button, TextField } from "react95";
import Connection, { options, Method } from "../../containers/Connection";
import Input from "../common/Input";
import CustomSigner from "./CustomSigner";

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

const AddressContainer = styled.span`
  float: right;
  text-align: left;
  font-size: 12px;
  max-width: 172px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
`;

const ConnectOptions = () => {
  const {
    connection,
    setConnection,
    provider,
    signer,
    customSigner,
    connectMetaMask,
    connectCustom,
    reset,
    resetCustomSigner,
    address,
  } = Connection.useContainer();

  const [nodeUrl, setNodeUrl] = useState("");

  const onChange = (e) => {
    setConnection(e.target.value);
  };

  return (
    <>
      <Fieldset label="Connection" style={{ marginBottom: "12px" }}>
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
          <span>Provider:</span>
          <span
            style={{
              float: "right",
              textAlign: "left",
              color: provider ? "green" : "red",
            }}
          >
            {provider ? " Connected" : " Not Connected"}
          </span>
        </div>
        <div>
          Signer:
          <span
            style={{
              float: "right",
              textAlign: "left",
              color: signer ? "green" : "red",
            }}
          >
            {signer ? " Connected" : " Not Connected"}
          </span>
        </div>

        {address !== null && (
          <div>
            Address:
            <AddressContainer title={address}>{address}</AddressContainer>
          </div>
        )}

        {customSigner && (
          <Button
            style={{ marginTop: "12px" }}
            fullWidth
            onClick={() => {
              resetCustomSigner();
            }}
          >
            Reset Custom Signer
          </Button>
        )}

        {connection === Method.MetaMask && (
          <>
            {!provider && (
              <>
                <Button
                  style={{ marginTop: "12px" }}
                  fullWidth
                  onClick={connectMetaMask}
                >
                  Connect
                </Button>
              </>
            )}
          </>
        )}

        {connection === Method.Custom && (
          <>
            <p style={{ marginTop: "12px" }}>Node URL:</p>
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
      <CustomSigner />
    </>
  );
};

export default ConnectOptions;
