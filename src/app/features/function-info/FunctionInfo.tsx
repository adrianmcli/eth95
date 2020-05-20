import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fieldset, Cutout } from "react95";

import FunctionItem from "./FunctionItem";
import FunctionDetails from "./FunctionDetails";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const FunctionsCutout = styled(Cutout)`
  width: 300px;
  flex-grow: 1;
  text-align: left;
  background: white;
  overflow: hidden;
  font-family: monospace;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const FunctionsContainer = styled.div`
  overflow-y: auto;
  overflow-x: inherit;
  width: 100%;
  height: 100%;
`;

const FunctionForm = styled(Fieldset)`
  background: blue;
`;

const FunctionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FunctionListHeader = styled.div``;

const FunctionInfo = ({ contract }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const fns = contract.abi.filter((x) => x.type === "function");
  const selectedFn = fns[selectedIdx];

  useEffect(() => {
    setSelectedIdx(null);
  }, [contract]);

  return (
    <Container>
      <FunctionsList>
        <FunctionListHeader>Functions (arity):</FunctionListHeader>
        <FunctionsCutout shadow={false}>
          <FunctionsContainer>
            {fns.map((fn, i) => (
              <FunctionItem
                fn={fn}
                key={i + fn.name}
                isActive={selectedIdx === i}
                onClick={() => setSelectedIdx(i)}
              />
            ))}
          </FunctionsContainer>
        </FunctionsCutout>
      </FunctionsList>
      <FunctionDetails fn={selectedFn} />
      <FunctionForm label="Call function">
        <h1>Form here</h1>
      </FunctionForm>
    </Container>
  );
};

export default FunctionInfo;
