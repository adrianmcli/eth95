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
  const { selectedContract: contract } = Contracts.useContainer();

  return (
    <Container>
      <Content label={contract && contract.name}></Content>
    </Container>
  );
};

export default Main;
