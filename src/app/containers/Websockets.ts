import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Contracts from "./Contracts";

function useWebsockets() {
  const { upsertByPath, removeByPath } = Contracts.useContainer();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const setup = () => {
    const ws = new WebSocket(`ws://${window.location.host}`);
    // Connection opened
    ws.addEventListener("open", function () {
      const data = JSON.stringify({ type: "CONNECTION_OPENED" });
      ws.send(data);
    });

    // Listen for messages
    ws.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_CONTRACT" || data.type === "CHANGE_CONTRACT") {
        // upsert the specified contract by path
        upsertByPath(data.artifact, data.name, data.path);
      }
      if (data.type === "DELETE_CONTRACT") {
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
