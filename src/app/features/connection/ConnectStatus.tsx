import React from "react";
import styled from "styled-components";
import { Button } from "react95";

import Connection from "../../containers/Connection";
import Address from "../../containers/Address";
import Network from "../../containers/Network";
import Signers from "../../containers/Signers";

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

const ConnectStatus = () => {
  const { provider } = Connection.useContainer();
  const { signer, customSigner, setCustomSigner } = Signers.useContainer();
  const { address } = Address.useContainer();
  const { network } = Network.useContainer();
  return (
    <div style={{ marginTop: "12px" }}>
      <DataRow>
        <DataLabel>Provider:</DataLabel>
        <DataPoint
          color={provider ? "green" : "red"}
          className="status-provider"
        >
          {provider ? " Connected" : " Not Connected"}
        </DataPoint>
      </DataRow>
      <DataRow>
        <DataLabel>Signer:</DataLabel>
        <DataPoint color={signer ? "green" : "red"} className="status-signer">
          {signer ? " Connected" : " Not Connected"}
        </DataPoint>
      </DataRow>
      <DataRow>
        <DataLabel>Network:</DataLabel>
        <DataPoint>
          {network?.name} {network && `(${network?.chainId})`}
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
          onClick={() => setCustomSigner(null)}
        >
          Reset Custom Signer
        </Button>
      )}
    </div>
  );
};

export default ConnectStatus;
