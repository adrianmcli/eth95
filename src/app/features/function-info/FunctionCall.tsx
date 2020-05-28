import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Fieldset, Button } from "react95";
import abiDecoder from "abi-decoder";

import ContractAddress from "../../containers/ContractAddress";
import Contracts from "../../containers/Contracts";
import Signers from "../../containers/Signers";
import OutputLog from "../../containers/OutputLog";

import Input from "../common/Input";
import EncodeButton from "./EncodeButton";

const Container = styled(Fieldset)`
  flex-grow: 1;
  margin-left: 16px;
  margin-top: 20px;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
`;

const FunctionForm = ({ fn }) => {
  const { addLogItem } = OutputLog.useContainer();
  const { selectedContract } = Contracts.useContainer();
  const { address } = ContractAddress.useContainer();
  const { signer } = Signers.useContainer();
  const [formState, setFormState] = useState({});

  const isPayable = fn?.stateMutability === "payable";
  const [ethToSend, setEthToSend] = useState("");
  const [gasLimit, setGasLimit] = useState("");

  useEffect(() => {
    setFormState({});
  }, [fn]);

  if (!fn) {
    return (
      <Container label="Call function">
        <p>Please select a function.</p>
      </Container>
    );
  }

  const handleInputChange = (idx, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [idx]: value,
    }));
  };

  const opts: any = {};
  if (ethToSend !== "") opts.value = ethers.utils.parseEther(ethToSend);
  if (gasLimit !== "") opts.gasLimit = parseInt(gasLimit);

  const callFunction = async () => {
    let args = [];
    for (let i = 0; i < fn.inputs.length; i++) {
      args.push(formState[i]);
    }

    // handle array types
    const processedArgs = args.map((arg, idx) => {
      const type = types[idx];
      if (type.substring(0, 4) === "uint") return parseInt(arg);
      if (type.slice(-2) === "[]") return JSON.parse(arg);
      return arg;
    });

    const instance = new ethers.Contract(address, selectedContract.abi, signer);

    if (fn.stateMutability !== "view") {
      // mutating fn; just return hash
      console.log(args);
      console.log(processedArgs);
      const tx = await instance[fn.name](...processedArgs, opts);
      addLogItem(`tx.hash: ${tx.hash}`);
      await tx.wait();
      addLogItem(`tx mined: ${tx.hash}`);

      // log out any events from tx
      const receipt = await signer.provider.getTransactionReceipt(tx.hash);
      abiDecoder.addABI(selectedContract.abi);
      const decoded = abiDecoder.decodeLogs(receipt.logs);
      decoded.forEach((evt) => {
        const values = evt.events.map((x) => {
          if (x.type === "bytes32") {
            return ethers.utils.parseBytes32String(x.value);
          }
          return x.value;
        });
        addLogItem(`Event: ${evt.name}(${values})`);
      });
    } else {
      // view fn; return value (and call toString on it)
      const result = await instance[fn.name](...processedArgs);
      addLogItem(result.toString());
    }
  };

  const handleSubmit = async () => {
    try {
      await callFunction();
    } catch (error) {
      console.error(error);
      addLogItem(`Error: ${error.message}`);
    }
  };

  // grab args and types for proxy call and encode
  let args = [];
  for (let i = 0; i < fn.inputs.length; i++) {
    args.push(formState[i]);
  }
  const types = fn.inputs.map((x) => x.type);

  return (
    <Container label="Call function">
      <Content>
        {fn.inputs?.map((input, idx) => (
          <div key={input.name} style={{ marginBottom: `1rem` }}>
            <div>{input.name}:</div>
            <Input
              placeholder={input.type}
              value={formState[idx] || ""}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              className="function-form-item"
            />
          </div>
        ))}
        {isPayable && (
          <>
            <div>ETH to send:</div>
            <Input
              type="number"
              placeholder="in units of Ethers, not Wei"
              value={ethToSend}
              onChange={(e) => setEthToSend(e.target.value)}
              style={{ marginBottom: `1rem` }}
            />
          </>
        )}

        <div>Gas limit:</div>
        <Input
          type="number"
          placeholder="leave blank to use default"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
          style={{ marginBottom: `1rem` }}
        />

        <Button onClick={handleSubmit} className="function-submit-btn">
          Submit
        </Button>
        <EncodeButton
          args={args}
          types={types}
          inputs={fn.inputs}
          opts={opts}
        />
      </Content>
    </Container>
  );
};

export default FunctionForm;
