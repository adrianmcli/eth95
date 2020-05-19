import React from "react";
import styled from "styled-components";
import { Fieldset, Cutout } from "react95";

import Contracts from "../../containers/Contracts";

const Container = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const Content = styled(Fieldset)`
  height: calc(100% - 8px);
`;

const FunctionsCutout = styled(Cutout)`
  flex-grow: 1;
  background: white;
  overflow: hidden;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const FunctionsContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Main = () => {
  const { selectedContract: contract } = Contracts.useContainer();
  // console.log(contract);
  if (!contract) {
    return (
      <Container>
        <Content label={contract && contract.name}>
          <div>Please select a contract.</div>
        </Content>
      </Container>
    );
  }
  contract.abi;
  return (
    <Container>
      <Content label={contract && contract.name}>
        <div style={{ fontSize: "12px" }}>
          <strong>Path:</strong> {contract.path || "N/A"}
        </div>
        <FunctionsCutout>
          <FunctionsContainer>
            {contract.abi.map((fn, i) => (
              <div key={i}>{fn.name}</div>
            ))}
          </FunctionsContainer>
        </FunctionsCutout>
      </Content>
    </Container>
  );
};

export default Main;
