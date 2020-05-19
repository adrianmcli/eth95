import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Contracts from "./Contracts";

function useWebsockets() {
  const {
    addByArtifact,
    updateByPath,
    removeByPath,
  } = Contracts.useContainer();
  const [socket, setSocket] = useState(null);

  const setup = () => {
    const ws = new WebSocket(`ws://${window.location.host}`);
    // Connection opened
    ws.addEventListener("open", function (event) {
      ws.send("CONNECTION_OPENED");
    });

    // Listen for messages
    ws.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_CONTRACT") {
        addByArtifact(
          data.artifact,
          `${data.artifact.contractName}.sol`,
          data.path,
        );
      }
      if (data.type === "CONTRACT_CHANGED") {
        // change the specified contract by path
        updateByPath(
          data.artifact,
          `${data.artifact.contractName}.sol`,
          data.path,
        );
      }
      if (data.type === "CONTRACT_DELETED") {
        // remove the specified contract by path
        removeByPath(data.path);
      }
    });

    setSocket(ws);
  };

  useEffect(() => {
    setup();
  }, []);
  return { socket };
}

export default createContainer(useWebsockets);
