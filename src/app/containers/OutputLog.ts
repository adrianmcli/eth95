import { createContainer } from "unstated-next";
import { useState } from "react";

export function useOutputLog() {
  const [logItems, setLogItems] = useState<string[]>([]);

  const addLogItem = (x) => {
    const dateStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    const logStr = `[${dateStr}] ${x}`;
    setLogItems((prev) => [logStr, ...prev]);
  };

  return {
    logItems,
    addLogItem,
  };
}

export default createContainer(useOutputLog);
