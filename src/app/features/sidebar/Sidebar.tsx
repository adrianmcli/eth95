import React from "react";
import styled from "styled-components";
import { Cutout } from "react95";

import AddContractBtn from "../add-contract/AddContractBtn";
import Contracts from "../../containers/Contracts";
import ContractItem from "./ContractItem";
import ConnectOptions from "../connection/ConnectOptions";

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const ContractsSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
`;

const FilesCutout = styled(Cutout)`
  flex-grow: 1;
  background: white;
  overflow: hidden;
  padding-bottom: 35px;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const FilesContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Sidebar = () => {
  const { contracts } = Contracts.useContainer();
  return (
    <Container>
      <ConnectOptions />
      <ContractsSection>
        <div>Contracts:</div>
        <FilesCutout shadow={false}>
          <FilesContainer>
            {contracts.map((c, i) => (
              <ContractItem key={c.name} idx={i} name={c.name} />
            ))}
            <AddContractBtn />
          </FilesContainer>
        </FilesCutout>
      </ContractsSection>
    </Container>
  );
};

export default Sidebar;
