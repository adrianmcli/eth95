import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fieldset, Button } from "react95";
import ContractAddress from "../../containers/ContractAddress";
import Contracts from "../../containers/Contracts";
import Input from "../common/Input";
import { ethers } from "ethers";
import Signers from "../../containers/Signers";

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
  if (!fn) {
    return (
      <Container label="Call function">
        <p>Please select a function.</p>
      </Container>
    );
  }

  const { selectedContract } = Contracts.useContainer();
  const { addressFromArtifact } = ContractAddress.useContainer();
  const { signer } = Signers.useContainer();
  const [formState, setFormState] = useState({});

  const handleInputChange = (idx, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [idx]: value,
    }));
  };

  const callFunction = async () => {
    let args = [];
    for (let i = 0; i < fn.inputs.length; i++) {
      args.push(formState[i]);
    }
    const instance = new ethers.Contract(
      addressFromArtifact,
      selectedContract.abi,
      signer,
    );

    if (fn.stateMutability !== "view") {
      // mutating fn; just return hash
      const tx = await instance[fn.name](...args);
      console.log("tx", tx.hash);
    } else {
      // view fn; return value (and call toString on it)
      const result = await instance[fn.name](...args);
      console.log("result", result.toString());
      console.log("typeof", typeof result);
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
            />
          </div>
        ))}
        <Button onClick={callFunction}>Submit</Button>
      </Content>
    </Container>
  );
};

export default FunctionForm;
