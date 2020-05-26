import React from "react";
import styled from "styled-components";
import { Fieldset, Panel } from "react95";

import Contracts from "../../containers/Contracts";
import FunctionInfo from "../function-info/FunctionInfo";
import OutputLog from "../output-log/OutputLog";
import Options from "../options/Options";

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
  grid-template-rows: 1fr 1fr 28px;
  grid-gap: 16px;
`;

const TopContainer = styled.div`
  display: flex;
`;

const FooterPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
`;

const Main = () => {
  const { selectedContract: contract } = Contracts.useContainer();
  return (
    <Container>
      <ContentFrame label={contract && contract.name}>
        <Content>
          <TopContainer>
            <Options />
            <OutputLog />
          </TopContainer>
          <FunctionInfo contract={contract} />
          <FooterPanel variant="well">
            {`Path: ${contract?.path}` || "No path specified for this contract"}
          </FooterPanel>
        </Content>
      </ContentFrame>
    </Container>
  );
};

export default Main;
