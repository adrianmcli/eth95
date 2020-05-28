import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Fieldset, Button, Checkbox } from "react95";

import OutputLog from "../../containers/OutputLog";
import Input from "../common/Input";
import EncodeButton from "./EncodeButton";
import useFormData from "./useFormData";
import useCallFunction from "./useCallFunction";

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

const GasLimitCheckbox = styled(Checkbox)`
  margin-left: 12px;

  & > div::before {
    width: 100%;
    height: 100%;
  }

  & > div > span::after {
    width: 4px;
    height: 9px;
    border-width: 0 2px 2px 0;
  }
`;

const FunctionForm = ({ fn }) => {
  const { addLogItem } = OutputLog.useContainer();
  const [formState, setFormState] = useState({});
  const [ethToSend, setEthToSend] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [showGasLimit, setShowGasLimit] = useState(false);

  // gather form data and its respective types
  const { args, types } = useFormData(fn, formState);

  // set options for transaction
  const opts: any = {};
  if (ethToSend !== "") opts.value = ethers.utils.parseEther(ethToSend);
  if (gasLimit !== "" && showGasLimit) opts.gasLimit = parseInt(gasLimit);

  // get the function to call when user hits submit
  const { callFunction } = useCallFunction(args, types, fn, opts);

  // clear formState when function changes
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
    setFormState((prev) => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = async () => {
    try {
      await callFunction();
    } catch (error) {
      console.error(error);
      addLogItem(`Error: ${error.message}`);
    }
  };

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
        {fn.stateMutability === "payable" && (
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

        <div style={{ display: "flex" }}>
          <Button onClick={handleSubmit} className="function-submit-btn">
            Submit
          </Button>
          <EncodeButton
            args={args}
            types={types}
            inputs={fn.inputs}
            opts={opts}
          />
          <GasLimitCheckbox
            label="custom gas limit"
            checked={showGasLimit}
            onChange={() => setShowGasLimit((p) => !p)}
          />
        </div>

        {showGasLimit && (
          <>
            <div style={{ marginTop: `1rem` }}>Gas limit:</div>
            <Input
              type="number"
              placeholder="leave blank to use default"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              style={{ marginBottom: `1rem` }}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default FunctionForm;
