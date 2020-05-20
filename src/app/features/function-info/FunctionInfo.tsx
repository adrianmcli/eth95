import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FunctionDetails from "./FunctionDetails";
import FunctionForm from "./FunctionForm";
import FunctionList from "./FunctionList";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const FunctionInfo = ({ contract }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const fns = contract.abi.filter((x) => x.type === "function");
  const selectedFn = fns[selectedIdx];

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
      <FunctionForm />
    </Container>
  );
};

export default FunctionInfo;
