import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Cutout, Button } from "react95";

import AddContractBtn from "../add-contract/AddContractBtn";
import Contracts from "../../containers/Contracts";

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FilesContainer = styled(Cutout)`
  flex-grow: 1;
  background: white;

  &:before {
    z-index: unset;
  }
`;

const App = () => {
  const { contracts } = Contracts.useContainer();
  return (
    <Container>
      <AddContractBtn />
      <FilesContainer>
        {contracts.map((c) => (
          <div key={c.name}>{c.name}</div>
        ))}
      </FilesContainer>
    </Container>
  );
};

export default App;
