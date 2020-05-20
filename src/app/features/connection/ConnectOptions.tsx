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

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const DataLabel = styled.div`
  font-weight: bold;
`;

const DataPoint = styled.div`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => (p.color ? p.color : "unset")};
  margin-left: 12px;
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
    network,
  } = Connection.useContainer();

  const [nodeUrl, setNodeUrl] = useState("");

  // console.log(network);

  const onChange = (e) => {
    setConnection(e.target.value);
  };

  return (
    <>
      <Fieldset
        label="Connection"
        style={{ marginBottom: "12px", minWidth: "auto" }}
      >
        <ConnectionSelector
          native
          value={connection}
          options={options}
          onChange={onChange}
          width="100%"
        />
        <br />
        <br />

        <DataRow>
          <DataLabel>Provider:</DataLabel>
          <DataPoint color={provider ? "green" : "red"}>
            {provider ? " Connected" : " Not Connected"}
          </DataPoint>
        </DataRow>
        <DataRow>
          <DataLabel>Signer:</DataLabel>
          <DataPoint color={signer ? "green" : "red"}>
            {signer ? " Connected" : " Not Connected"}
          </DataPoint>
        </DataRow>
        <DataRow>
          <DataLabel>Network:</DataLabel>
          <DataPoint>
            {network?.name} ({network?.chainId})
          </DataPoint>
        </DataRow>
        <DataRow>
          <DataLabel>Address:</DataLabel>
          <DataPoint title={address}>{address}</DataPoint>
        </DataRow>

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
