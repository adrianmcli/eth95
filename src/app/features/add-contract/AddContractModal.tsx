import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Window,
  WindowHeader,
  WindowContent,
  Tabs,
  Tab,
} from "react95";

import ByAbi from "./ByAbi";
import ByArtifact from "./ByArtifact";
import ByEtherscan from "./ByEtherscan";

const Container = styled(Window)`
  width: 720px;
  display: flex;
  flex-direction: column;
`;

const Content = styled(WindowContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;]
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Ex = styled.span`
  font-weight: bold;
  transform: translate(-0.25px, -1px);
`;

const AddContractBtn = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_, value) => setActiveTab(value);

  return (
    <Container>
      <Header>
        <span>Add Contract</span>
        <Button
          style={{ width: "24px", height: "24px" }}
          size={"sm"}
          square
          onClick={closeModal}
        >
          <Ex>x</Ex>
        </Button>
      </Header>
      <Content>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={0}>ABI</Tab>
          <Tab value={1}>JSON Artifact</Tab>
          <Tab value={2}>Etherscan</Tab>
        </Tabs>
        <div style={{ flexGrow: 1 }}>
          {activeTab === 0 && <ByAbi closeModal={closeModal} />}
          {activeTab === 1 && <ByArtifact closeModal={closeModal} />}
          {activeTab === 2 && <ByEtherscan closeModal={closeModal} />}
        </div>
      </Content>
    </Container>
  );
};

export default AddContractBtn;
