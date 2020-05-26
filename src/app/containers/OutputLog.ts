import { createContainer } from "unstated-next";
import { useState } from "react";

export function useOutputLog() {
  const [logItems, setLogItems] = useState<string[]>([]);

  const addLogItem = (x) => {
    const dateStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    const logStr = `[${dateStr}] ${x}`;
    setLogItems((prev) => [logStr, ...prev]);
  };

  const clear = () => setLogItems([]);

  return {
    logItems,
    addLogItem,
    clear,
  };
}

export default createContainer(useOutputLog);
