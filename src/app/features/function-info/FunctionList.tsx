import React from "react";
import styled from "styled-components";
import { Cutout } from "react95";

import FunctionItem from "./FunctionItem";

const FunctionsCutout = styled(Cutout)`
  width: 300px;
  flex-grow: 1;
  text-align: left;
  background: white;
  overflow: hidden;
  font-family: monospace;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  overflow-x: inherit;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div``;

const FunctionList = ({ fns, selectedIdx, setSelectedIdx }) => {
  return (
    <Container>
      <Header>Functions (arity):</Header>
      <FunctionsCutout shadow={false}>
        <Content>
          {fns.map((fn, i) => (
            <FunctionItem
              fn={fn}
              key={i + fn.name}
              isActive={selectedIdx === i}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </Content>
      </FunctionsCutout>
    </Container>
  );
};

export default FunctionList;
