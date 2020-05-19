import React from "react";
import styled from "styled-components";
import { Cutout, Button } from "react95";

import AddContractBtn from "../add-contract/AddContractBtn";
import Contracts from "../../containers/Contracts";
import ContractItem from "./ContractItem";

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FilesCutout = styled(Cutout)`
  flex-grow: 1;
  overflow: auto;
  background: white;

  &:before {
    z-index: unset;
  }
`;

const FilesContainer = styled.div`
  overflow: auto;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
`;

const Sidebar = () => {
  const { contracts } = Contracts.useContainer();
  return (
    <Container>
      <AddContractBtn />
      <FilesCutout shadow={false}>
        <FilesContainer>
          {contracts.map((c, i) => (
            <ContractItem key={c.name} idx={i} name={c.name} />
          ))}
        </FilesContainer>
      </FilesCutout>
    </Container>
  );
};

export default Sidebar;
