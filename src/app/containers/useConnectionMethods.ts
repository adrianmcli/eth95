import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export enum Method {
  Localhost = "Localhost",
  MetaMask = "MetaMask",
  Custom = "Custom",
}

export const options = [
  { value: Method.Localhost, label: "💻 localhost:8545" },
  { value: Method.MetaMask, label: "🦊 MetaMask" },
  { value: Method.Custom, label: "🔧 Custom" },
];

const useConnectionMethods = () => {
  const [connection, setConnection] = useState(Method.Localhost);

  return { connection, setConnection };
};

export default useConnectionMethods;
