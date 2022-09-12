import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

  // grab only functions from ABI and sort alphabetically
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
  const keyHandler = e => {
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
  }

  // add event listener on initial render, and remove on cleanup
  useEffect(() => {
    window.addEventListener('keydown', keyHandler)
    return () => {
      window.removeEventListener('keydown', keyHandler)
    }
  }, [])

  // unselect functions if the contract changes
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
