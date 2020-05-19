import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import Contracts from "./Contracts";

function useWebsockets() {
  const { addByArtifact } = Contracts.useContainer();
  const [socket, setSocket] = useState(null);

  const setup = () => {
    const ws = new WebSocket(`ws://${window.location.host}`);
    // Connection opened
    ws.addEventListener("open", function (event) {
      ws.send("Connection opened!");
    });

    // Listen for messages
    ws.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });

    setSocket(ws);
  };

  useEffect(() => {
    setup();
  }, []);
  return { socket };
}

export default createContainer(useWebsockets);
