import React from "react";
import styled from "styled-components";
import { Cutout, Fieldset } from "react95";

import Contracts from "../../containers/Contracts";

const Container = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const Content = styled(Fieldset)`
  height: calc(100% - 10px);
`;

const Main = () => {
  const { contracts } = Contracts.useContainer();
  return (
    <Container>
      <Content label="MyDapp.sol"></Content>
    </Container>
  );
};

export default Main;
