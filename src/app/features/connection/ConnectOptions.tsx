import React, { useState } from "react";
import styled from "styled-components";
import { Select, Fieldset, Button } from "react95";
import Connection, { options, Method } from "../../containers/Connection";
import Input from "../common/Input";

import ConnectStatus from "./ConnectStatus";
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

const ConnectOptions = () => {
  const {
    connection,
    setConnection,
    provider,
    connectMetaMask,
    connectCustom,
    setProvider,
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

        <ConnectStatus />

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
                setProvider(null);
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
