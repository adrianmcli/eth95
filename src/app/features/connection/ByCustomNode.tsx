import React, { useState } from "react";
import { Button } from "react95";

import Connection from "../../containers/Connection";
import Input from "../common/Input";

const ByCustomNode = () => {
  const { provider, connectCustom, setProvider } = Connection.useContainer();
  const [nodeUrl, setNodeUrl] = useState("");
  return (
    <>
      {provider ? (
        <Button
          fullWidth
          style={{ marginTop: "12px" }}
          onClick={() => {
            setProvider(null);
            setNodeUrl("");
          }}
        >
          Reset Custom Provider
        </Button>
      ) : (
        <>
          <p style={{ marginTop: "12px" }}>Node URL:</p>
          <Input
            value={nodeUrl}
            onChange={(e) => setNodeUrl(e.target.value)}
            placeholder="https://mainnet.infura.io/v3/API_KEY"
          />
          <Button
            fullWidth
            onClick={() => connectCustom(nodeUrl)}
            disabled={nodeUrl.trim() === ""}
            style={{ marginTop: "12px" }}
          >
            Connect
          </Button>
        </>
      )}
    </>
  );
};

export default ByCustomNode;
