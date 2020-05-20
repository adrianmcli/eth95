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
  console.log(contract.abi);
  return (
    <Container>
      <Content label={contract && contract.name}>
        <div style={{ fontSize: "12px" }}>
          <strong>Path:</strong> {contract.path || "N/A"}
        </div>
        <FunctionsCutout>
          <FunctionsContainer>
            {contract.abi
              .filter((x) => x.type === "function")
              .map((fn, i) => {
                const { name, inputs } = fn;
                if (inputs.length === 0) {
                  return <div key={i}>{`${name}()`}</div>;
                }
                const titleTxt = inputs
                  .map((x) => `${x.type} ${x.name}`)
                  .join(", ");
                return (
                  <div
                    key={i}
                    title={titleTxt}
                  >{`${name}(${inputs.length})`}</div>
                );
              })}
          </FunctionsContainer>
        </FunctionsCutout>
      </Content>
    </Container>
  );
};

export default Main;
