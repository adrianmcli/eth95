import React, { useState } from "react";
import styled from "styled-components";
import { Fieldset } from "react95";
import OutputLogContainer from "../../containers/OutputLog";

// const containerWidth = 450;
const Container = styled(Fieldset)`
  display: flex;
  height: 100%;
  flex-grow: 1;
  position: relative;
  margin-left: 16px;
`;

const Content = styled.div`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;

  font-family: monospace;
  font-size: 12px;
`;

const OutputLog = () => {
  const { logItems } = OutputLogContainer.useContainer();
  return (
    <Container label="Log">
      <Content>
        {logItems.map((logItem, i) => (
          <div key={i}>{logItem}</div>
        ))}
      </Content>
    </Container>
  );
};

export default OutputLog;
