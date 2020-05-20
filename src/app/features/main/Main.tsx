import React from "react";
import styled from "styled-components";
import { Fieldset, Cutout, Divider } from "react95";

import Contracts from "../../containers/Contracts";
import AddressInfo from "../address-info/AddressInfo";
import FunctionInfo from "../function-info/FunctionInfo";

const Container = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const ContentFrame = styled(Fieldset)`
  height: calc(100% - 8px);
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-gap: 16px;
  padding-bottom: 16px;
`;

const TopContainer = styled.div`
  display: flex;
`;

const Main = () => {
  const { selectedContract: contract } = Contracts.useContainer();
  if (!contract) {
    return (
      <Container>
        <ContentFrame label={contract && contract.name}>
          <div>Please select a contract.</div>
        </ContentFrame>
      </Container>
    );
  }
  return (
    <Container>
      <ContentFrame label={contract && contract.name}>
        <Content>
          <TopContainer>
            <AddressInfo contract={contract} />
            <div style={{ margin: "24px" }}>
              Exciting stuff will come here soon.
            </div>
          </TopContainer>
          <FunctionInfo contract={contract} />
        </Content>
      </ContentFrame>
    </Container>
  );
};

export default Main;
