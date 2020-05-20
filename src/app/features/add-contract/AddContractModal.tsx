import React, { useState } from "react";
import { Tabs, Tab } from "react95";

import { ModalContainer, ModalHeader, ModalContent } from "../common/Modal";

import ByAbi from "./ByAbi";
import ByArtifact from "./ByArtifact";
import ByEtherscan from "./ByEtherscan";
import ByPremade from "./ByPremade";

const AddContractBtn = ({ closeModal }: { closeModal: () => {} }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, value: number) => setActiveTab(value);

  return (
    <ModalContainer>
      <ModalHeader onCloseClick={closeModal} label="Add Contract" />
      <ModalContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={0}>Vendors</Tab>
          <Tab value={1}>ABI</Tab>
          <Tab value={2}>JSON Artifact</Tab>
          <Tab value={3}>Etherscan</Tab>
        </Tabs>
        <div style={{ flexGrow: 1 }}>
          {activeTab === 0 && <ByPremade closeModal={closeModal} />}
          {activeTab === 1 && <ByAbi closeModal={closeModal} />}
          {activeTab === 2 && <ByArtifact closeModal={closeModal} />}
          {activeTab === 3 && <ByEtherscan closeModal={closeModal} />}
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddContractBtn;
