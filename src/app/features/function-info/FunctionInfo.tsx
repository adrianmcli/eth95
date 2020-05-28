import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useEvent } from "react-use";

import FunctionDetails from "./FunctionDetails";
import FunctionList from "./FunctionList";
import FunctionCall from "../function-call/FunctionCall";
import Contracts from "../../containers/Contracts";

const Container = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const FunctionInfo = ({ contract }) => {
  const { shiftUp, shiftDown } = Contracts.useContainer();
  const [selectedIdx, setSelectedIdx] = useState(null);

  let fns, selectedFn;
  if (contract) {
    fns = contract.abi
      .filter((x) => x.type === "function")
      .sort((a, b) => a.name.localeCompare(b.name));
    selectedFn = fns[selectedIdx];
  } else {
    fns = [];
    selectedFn = null;
  }

  // keyboard press behaviour (should really be somewhere else)
  useEvent("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedIdx !== null) {
        setSelectedIdx((prev) => (prev === 0 ? 0 : prev - 1));
      } else {
        // move contracts up
        shiftUp();
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (selectedIdx !== null) {
        setSelectedIdx((prev) => (prev === fns.length - 1 ? prev : prev + 1));
      } else {
        // move contracts down
        shiftDown();
      }
    }
  });

  useEffect(() => {
    setSelectedIdx(null);
  }, [contract]);

  return (
    <Container>
      <FunctionList
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        fns={fns}
      />
      <FunctionDetails fn={selectedFn} />
      <FunctionCall fn={selectedFn} />
    </Container>
  );
};

export default FunctionInfo;
