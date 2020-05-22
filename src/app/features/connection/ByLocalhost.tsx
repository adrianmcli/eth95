import React from "react";
import { Button } from "react95";
import Connection from "../../containers/Connection";

const ByMetaMask = () => {
  const { provider, connectLocalhost } = Connection.useContainer();

  return (
    <>
      {!provider && (
        <>
          <Button
            style={{ marginTop: "12px" }}
            fullWidth
            onClick={connectLocalhost}
          >
            Connect
          </Button>
        </>
      )}
    </>
  );
};

export default ByMetaMask;
