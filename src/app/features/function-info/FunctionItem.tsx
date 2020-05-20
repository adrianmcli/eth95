import React from "react";
import styled from "styled-components";

const Item = styled.div`
  height: 24px;
  color: ${(p) => (p.isActive ? "white" : "unset")};
  background: ${(p) => (p.isActive ? "#050289" : "unset")};
  border: ${(p) => (p.isActive ? "1px dotted" : "unset")};
  cursor: default;
  padding: 2px 4px;
`;

const FunctionItem = ({ fn, isActive, onClick }) => {
  return (
    <Item isActive={isActive} onClick={onClick}>
      {fn.name}({fn.inputs.length})
    </Item>
  );
};

export default FunctionItem;
