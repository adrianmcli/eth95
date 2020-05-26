import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Tab, Fieldset } from "react95";

import AddressInfo from "./AddressInfo";
import Proxy from "./Proxy";

const containerWidth = 475;
const Container = styled(Fieldset)`
  display: flex;
  width: ${containerWidth}px;
  min-width: ${containerWidth}px;
`;

const Options = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, value: number) => setActiveTab(value);
  return (
    <Container label="Options">
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab value={0}>Contract Address</Tab>
        <Tab value={1}>Proxy</Tab>
      </Tabs>
      <div style={{ flexGrow: 1 }}>
        <AddressInfo show={activeTab === 0} />
        <Proxy show={activeTab === 1} />
      </div>
    </Container>
  );
};

export default Options;
