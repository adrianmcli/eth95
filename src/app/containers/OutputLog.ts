import { createContainer } from "unstated-next";
import { useState } from "react";

type LogItem = {
  type: "normal" | "JSON";
  message: string;
};

export function useOutputLog() {
  const [logItems, setLogItems] = useState<LogItem[]>([]);

  const addLogItem = (x) => {
    const dateStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    const logStr = `[${dateStr}] ${x}`;
    setLogItems((prev) => [{ type: "normal", message: logStr }, ...prev]);
  };

  const addJSONLogItem = (x) => {
    const dateStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    const logStr = `[${dateStr}] ${x}\n`;
    setLogItems((prev) => [{ type: "JSON", message: logStr }, ...prev]);
  };

  const clear = () => setLogItems([]);

  return {
    logItems,
    addLogItem,
    addJSONLogItem,
    clear,
  };
}

export default createContainer(useOutputLog);
