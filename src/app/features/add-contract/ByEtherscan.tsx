import React, { useState } from "react";
import styled from "styled-components";
import { Button, TabBody as rTabBody, TextField, Fieldset } from "react95";

import Select from "../common/Select";

import Contracts from "../../containers/Contracts";
import Etherscan, {
  getChainId,
  networkOptions,
} from "../../containers/Etherscan";

const TabBody = styled(rTabBody)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ByEtherscan = ({ closeModal }) => {
  const { addContract } = Contracts.useContainer();
  const {
    abi,
    name,
    setName,
    address,
    setAddress,
    network,
    setNetwork,
    retrievingABI,
    successRetrieveABI,
  } = Etherscan.useContainer();

  return (
    <>
      <TabBody>
        <div style={{ height: "452px" }}>
          <p>
            Select the network and paste in the address to grab any publicly
            available ABIs from Etherscan.
          </p>

          <br />

          <Fieldset
            label="Network"
            style={{ marginBottom: "12px", minWidth: "auto" }}
          >
            <Select
              native
              value={network}
              options={networkOptions}
              onChange={(e) => setNetwork(e.target.value)}
              width="100%"
              className="connect-options"
            />
          </Fieldset>

          <br />

          <Fieldset
            label="Address"
            style={{ marginBottom: "12px", minWidth: "auto" }}
          >
            <p>The address of the verified address on etherscan.</p>
            <br />
            <TextField
              placeholder="0x6b175474e89094c44da98b954eedeac495271d0f"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Fieldset>

          <br />

          <Fieldset label="Name (required):">
            <p>
              This can be anything you want and can be changed later. We will
              automatically populate this from etherscan when you enter the
              address if left empty.
            </p>
            <br />
            <TextField
              placeholder="MyDapp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Fieldset>
        </div>
        <ButtonContainer>
          <Button
            fullWidth
            size="lg"
            style={{ marginTop: "1rem" }}
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            fullWidth
            size="lg"
            style={{ marginTop: "1rem" }}
            onClick={() =>
              addContract({
                name,
                abi,
                artifact: {
                  networks: {
                    [getChainId(network)]: { address },
                  },
                },
              })
            }
            disabled={retrievingABI || !successRetrieveABI || name.length === 0}
          >
            {retrievingABI
              ? "Retrieving ABI..."
              : successRetrieveABI
              ? "Add Contract via Etherscan"
              : "Unable to retrieve via Etherscan"}
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByEtherscan;
